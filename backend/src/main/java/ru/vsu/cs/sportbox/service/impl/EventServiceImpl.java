package ru.vsu.cs.sportbox.service.impl;


import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.vsu.cs.sportbox.data.dto.EventChangeDto;
import ru.vsu.cs.sportbox.data.dto.EventCreateDto;
import ru.vsu.cs.sportbox.data.dto.EventFilterDto;
import ru.vsu.cs.sportbox.data.mapper.EventMapper;
import ru.vsu.cs.sportbox.data.model.Event;
import ru.vsu.cs.sportbox.data.model.InventoryType;
import ru.vsu.cs.sportbox.data.repository.BookingRepository;
import ru.vsu.cs.sportbox.data.repository.EventRepository;
import ru.vsu.cs.sportbox.data.repository.InventoryTypeRepository;
import ru.vsu.cs.sportbox.responses.*;
import ru.vsu.cs.sportbox.service.EventService;
import ru.vsu.cs.sportbox.specification.EventSpecification;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class EventServiceImpl implements EventService {
    private EventRepository eventRepository;
    private BookingRepository bookingRepository;
    private EventMapper eventMapper;
    private InventoryTypeRepository inventoryTypeRepository;

    @Override
    @Transactional
    public List<Event> filterEvent(EventFilterDto eventFilterDto) {
        return eventRepository.findAll(EventSpecification.getEventByInventoryAndDate(eventFilterDto));
    }

    @Override
    @Transactional
    public Set<Event> getRecommendations(int bookingId) {
        return bookingRepository.findById(bookingId).getEvents();
    }

    @Override
    @Transactional
    public EventResponse addNewEvent(EventCreateDto eventCreateDto) {
        Event event = eventMapper.eventCreateDtoToEvent(eventCreateDto);
        if (event == null) {
            return new EventResponse("При добавлении мероприятия возникла ошибка.", false, null);
        }
        Event savedEvent = eventRepository.save(event);
        return new EventResponse("Мероприятие было успешно добавлено.", true, savedEvent);
    }

    @Override
    @Transactional
    public EventResponse getEventById(int id) {
        Event event = eventRepository.findById(id);
        if (event == null) {
            return new EventResponse("Мероприятие с указанным идентификатором не существует.", false, null);
        }
        return new EventResponse("Мероприятие было успешно найдено.", true, event);
    }

    @Override
    @Transactional
    public EventResponse changeEvent(int id, EventChangeDto eventChangeDto) {
        Event event = eventRepository.findById(id);
        if (event != null) {
            if (StringUtils.isNotBlank(eventChangeDto.getName())){
                event.setName(eventChangeDto.getName());
            }

            InventoryType inventoryType;
            if (StringUtils.isNotBlank(eventChangeDto.getInventoryType())) {
                inventoryType = inventoryTypeRepository.findByType(eventChangeDto.getInventoryType());
            } else {
                inventoryType = event.getInventoryType();
            }

            if (inventoryType == null) {
                return new EventResponse("Указанного типа инвентаря не существует.", false, null);
            }
            event.setInventoryType(inventoryType);

            if (Double.compare(eventChangeDto.getPrice(), 0) != 0){
                event.setPrice(eventChangeDto.getPrice());
            }

            if (StringUtils.isNotBlank(eventChangeDto.getDescription())){
                event.setDescription(eventChangeDto.getDescription());
            }

            Date sDate;
            Date eDate;
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            try {
                if (StringUtils.isNotBlank(eventChangeDto.getStartDate())) {
                    sDate = format.parse(eventChangeDto.getStartDate());
                    event.setStartDate(sDate);
                }
                if (StringUtils.isNotBlank(eventChangeDto.getEndDate())) {
                    eDate = format.parse(eventChangeDto.getEndDate());
                    event.setEndDate(eDate);
                }
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }


            eventRepository.save(event);
            return new EventResponse("Изменение мероприятия прошло успешно.", true, event);
        } else {
            return new EventResponse("Мероприятие с указанным идентификатором не существует.", false, null);
        }
    }

    @Override
    @Transactional
    public EventResponse deleteEventById(int id) {
        Event event = eventRepository.findById(id);
        if (event != null) {
            eventRepository.removeEventById(id);
            return new EventResponse("Удаление мероприятия прошло успешно.", true, event);
        } else {
            return new EventResponse("Мероприятие с указанным идентификатором не существует.", false, null);
        }
    }
}
