package ru.vsu.cs.sportbox.service;

import ru.vsu.cs.sportbox.data.dto.EventChangeDto;
import ru.vsu.cs.sportbox.data.dto.EventCreateDto;
import ru.vsu.cs.sportbox.data.dto.EventFilterDto;
import ru.vsu.cs.sportbox.data.model.Event;
import ru.vsu.cs.sportbox.responses.*;

import java.util.List;
import java.util.Set;

public interface EventService {
    List<Event> filterEvent(EventFilterDto eventFilterDto);

    Set<Event> getRecommendations(int bookingId);

    EventResponse addNewEvent(EventCreateDto eventCreateDto);

    EventResponse getEventById(int id);

    EventResponse changeEvent(int id, EventChangeDto eventChangeDto);

    EventResponse deleteEventById(int id);
}
