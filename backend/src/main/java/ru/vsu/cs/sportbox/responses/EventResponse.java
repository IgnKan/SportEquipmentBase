package ru.vsu.cs.sportbox.responses;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.vsu.cs.sportbox.data.model.Event;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Schema(description = "Ответ сервера с информацией о мероприятии")
public class EventResponse {
    private String message;
    private boolean status;
    private Event event;
}
