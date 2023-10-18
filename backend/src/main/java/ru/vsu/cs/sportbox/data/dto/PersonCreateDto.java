package ru.vsu.cs.sportbox.data.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Информация, необходимая для регистрации пользователя")
public class PersonCreateDto {

    private String name;
    private String password;
    private String email;
}
