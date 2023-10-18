package ru.vsu.cs.sportbox.data.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Информация, необходимая для фильтрации списка пользователей")
public class PersonFilterDto {
    private String email;
}
