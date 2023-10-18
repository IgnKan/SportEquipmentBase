package ru.vsu.cs.sportbox.data.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Информация, необходимая для создания нового заказа")
public class BookingCreateDto {
    private int personId;
    private int inventoryTypeId;
    private String startDate;
    private String endDate;
    private int size;
}
