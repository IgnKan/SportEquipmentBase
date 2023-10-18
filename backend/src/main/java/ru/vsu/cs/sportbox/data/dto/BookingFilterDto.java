package ru.vsu.cs.sportbox.data.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Информация, необходимая для фильтрации списка заказов")
public class BookingFilterDto {
    private int id;
    private String email;
    private String date;
}
