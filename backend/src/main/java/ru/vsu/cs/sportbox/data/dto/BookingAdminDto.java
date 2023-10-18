package ru.vsu.cs.sportbox.data.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@Schema(description = "Информация о заказе, возвращаемая администратору")
public class BookingAdminDto {
    private int id;
    private String inventory;
    private String email;
    private Double price;
    private String date;
    private String startDate;
    private String endDate;
    private Double debt;
}
