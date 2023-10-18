package ru.vsu.cs.sportbox.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.vsu.cs.sportbox.data.dto.*;
import ru.vsu.cs.sportbox.data.model.Event;
import ru.vsu.cs.sportbox.responses.*;
import ru.vsu.cs.sportbox.service.EventService;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/event")
@AllArgsConstructor
@CrossOrigin(origins = {"https://sport-box.vercel.app", "http://localhost:3000"}, allowCredentials = "true")
@Tag(name = "Мероприятия", description = "Методы для работы с мероприятиями")
public class EventController {
    private EventService eventService;

    @PostMapping("/filter")
    @Operation(summary = "Фильтрация списка мероприятий")
    public ResponseEntity<List<Event>> filterEvent(@RequestBody EventFilterDto eventFilterDto) {
        HttpStatus httpStatus = HttpStatus.OK;
        List<Event> events = eventService.filterEvent(eventFilterDto);
        return new ResponseEntity<>(events, httpStatus);
    }

    @GetMapping("/recommendation")
    @Operation(summary = "Получение рекомендованных к посещению мероприятиий по id заказа")
    public ResponseEntity<Set<Event>> getRecommendations(@Parameter(description = "Уникальный идентификатор заказа")
                                                             @RequestParam(value="booking_id") int bookingId) {
        HttpStatus httpStatus = HttpStatus.OK;
        Set<Event> events = eventService.getRecommendations(bookingId);
        return new ResponseEntity<>(events, httpStatus);
    }

    @PostMapping("/add")
    @Operation(summary = "Добавление нового мероприятия")
    public ResponseEntity<EventResponse> addNewEvent(@RequestBody EventCreateDto eventCreateDto) {
        HttpStatus httpStatus = HttpStatus.OK;
        EventResponse eventCreateResponse = eventService.addNewEvent(eventCreateDto);
        return new ResponseEntity<>(eventCreateResponse, httpStatus);
    }

    @GetMapping("/get_by_id")
    @Operation(summary = "Получение информации о мероприятии по его id")
    public ResponseEntity<EventResponse> getEventById(@Parameter(description = "Уникальный идентификатор мероприятия")
                                                          @RequestParam(value="id") int id) {
        HttpStatus httpStatus = HttpStatus.OK;
        EventResponse eventGetResponse = eventService.getEventById(id);
        return new ResponseEntity<>(eventGetResponse, httpStatus);
    }

    @PutMapping("/change")
    @Operation(summary = "Изменение информации о мероприятии")
    public ResponseEntity<EventResponse> changeEvent(@Parameter(description = "Уникальный идентификатор мероприятия")
                                                         @RequestParam(value="id") int id, @RequestBody EventChangeDto eventChangeDto) {
        HttpStatus httpStatus = HttpStatus.OK;
        EventResponse eventChangeResponse = eventService.changeEvent(id, eventChangeDto);
        return new ResponseEntity<>(eventChangeResponse, httpStatus);
    }

    @DeleteMapping("/delete")
    @Operation(summary = "Удаление мероприятия по его id")
    public ResponseEntity<EventResponse> deleteEventById(@Parameter(description = "Уникальный идентификатор мероприятия")
                                                             @RequestParam(value="id") int id) {
        HttpStatus httpStatus = HttpStatus.OK;
        EventResponse eventDeleteResponse = eventService.deleteEventById(id);
        return new ResponseEntity<>(eventDeleteResponse, httpStatus);
    }
}
