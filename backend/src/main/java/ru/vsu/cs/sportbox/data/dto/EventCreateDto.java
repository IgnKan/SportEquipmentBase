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
@Schema(description = "Информация, необходимая для добавления нового мероприятия")
public class EventCreateDto {
    private String name;
    private double price;
    private String description;
    private String startDate;
    private String endDate;
    private String inventoryType;
}
