package ru.vsu.cs.sportbox.data.mapper;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import ru.vsu.cs.sportbox.data.dto.BookingCreateDto;
import ru.vsu.cs.sportbox.data.dto.EventFilterDto;
import ru.vsu.cs.sportbox.data.model.*;
import ru.vsu.cs.sportbox.data.repository.*;
import ru.vsu.cs.sportbox.specification.EventSpecification;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Component
@AllArgsConstructor
public class BookingMapper {
    private EventRepository eventRepository;
    private PersonRepository personRepository;
    private InventoryTypeRepository inventoryTypeRepository;
    private InventoryRepository inventoryRepository;
    private BookingRepository bookingRepository;

    @Transactional
    public Booking bookingCreateDtoToBooking (BookingCreateDto bookingCreateDto){
        Booking booking = new Booking();

        Person person = personRepository.findById(bookingCreateDto.getPersonId());
        if (person == null){
            return null;
        }

        Date sDate;
        Date eDate;
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        try {
            sDate = format.parse(bookingCreateDto.getStartDate());
            eDate = format.parse(bookingCreateDto.getEndDate());
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        booking.setStartDate(sDate);
        booking.setEndDate(eDate);
        booking.setDebt(0.);
        booking.setPerson(person);

        InventoryType inventoryType = inventoryTypeRepository.findById(bookingCreateDto.getInventoryTypeId());
        double priceForDay = inventoryType.getPrice();
        Instant sDateInstant = sDate.toInstant();
        Instant eDateInstant = eDate.toInstant();
        long days = ChronoUnit.DAYS.between(sDateInstant,eDateInstant);
        double price = priceForDay * days;
        for (Booking currBooking : Set.copyOf(person.getBookings())) {
            price += currBooking.getDebt();
            currBooking.setDebt(0.);
            bookingRepository.save(currBooking);
        }

        booking.setPrice(price);

        List<Inventory> inventories;
        if (inventoryType.getIsSizable() && bookingCreateDto.getSize() != 0) {
            inventories = inventoryRepository.findByInventoryTypeAndSize(inventoryType, bookingCreateDto.getSize());
        } else {
            inventories = inventoryRepository.findByInventoryType(inventoryType);
        }

        boolean notFree;
        for (Inventory inventory : inventories) {
            notFree = false;
            for (Booking currentBooking : inventory.getBookings()) {
                if (sDate.equals(currentBooking.getStartDate()) || eDate.equals(currentBooking.getEndDate())
                        || sDate.before(currentBooking.getStartDate()) && eDate.after(currentBooking.getEndDate())
                        || sDate.after(currentBooking.getStartDate()) && eDate.before(currentBooking.getEndDate())) {
                    notFree = true;
                }
            }
            if (!notFree){
                booking.setInventory(inventory);
                Set<Event> events = new HashSet<>(eventRepository.findAll(EventSpecification.getEventByInventoryAndDate(new EventFilterDto(
                        inventoryType.getType(), bookingCreateDto.getStartDate(), bookingCreateDto.getEndDate()))));
                booking.setEvents(events);
                return booking;
            }
        }


        return null;
    }
}
