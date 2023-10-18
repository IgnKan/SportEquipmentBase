package ru.vsu.cs.sportbox.service;

import ru.vsu.cs.sportbox.data.dto.BookingAdminDto;
import ru.vsu.cs.sportbox.data.dto.BookingCreateDto;
import ru.vsu.cs.sportbox.data.dto.BookingFilterDto;
import ru.vsu.cs.sportbox.responses.BookingResponse;

import java.util.List;

public interface BookingService {
    BookingResponse deleteBookingById(int id);
    BookingResponse addNewBooking(BookingCreateDto bookingCreateDto);
    BookingResponse checkBooking(BookingCreateDto bookingCreateDto);

    BookingResponse getBookingById(int id);

    BookingResponse returnBooking(int id);

    List<BookingAdminDto> filterBooking(BookingFilterDto bookingFilterDto);
}
