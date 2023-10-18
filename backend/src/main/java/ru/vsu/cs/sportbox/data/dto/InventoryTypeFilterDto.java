package ru.vsu.cs.sportbox.data.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Информация, необходимая для фильтрации списка типов оборудования")
public class InventoryTypeFilterDto {
    private String inventoryType;
    private int minPrice;
    private int maxPrice;
    private String startDate;
    private String endDate;
}
