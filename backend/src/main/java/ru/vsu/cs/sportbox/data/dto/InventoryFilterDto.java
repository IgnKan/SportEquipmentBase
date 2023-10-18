package ru.vsu.cs.sportbox.data.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Информация, необходимая для фильтрации списка оборудования")
public class InventoryFilterDto {
    private String inventoryType;
    private int id;
}
