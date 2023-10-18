package ru.vsu.cs.sportbox.responses;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.vsu.cs.sportbox.data.model.Person;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Schema(description = "Ответ сервера с информацией о пользователе")
public class PersonResponse {
    private String message;
    private boolean status;
    private Person person;
}
