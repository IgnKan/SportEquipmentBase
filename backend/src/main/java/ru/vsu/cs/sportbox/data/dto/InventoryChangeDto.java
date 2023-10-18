package ru.vsu.cs.sportbox.data.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Информация, необходимая для изменения данных об оборудовании")
public class InventoryChangeDto {
    private String inventoryType;
    private int size;
    private String name;
}
