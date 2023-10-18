package ru.vsu.cs.sportbox.service;

import ru.vsu.cs.sportbox.data.dto.InventoryTypeFilterDto;
import ru.vsu.cs.sportbox.data.model.InventoryType;
import ru.vsu.cs.sportbox.responses.InventoryTypeResponse;

import java.util.List;

public interface InventoryTypeService {
    List<InventoryType> filterInventoryType(InventoryTypeFilterDto inventoryTypeFilterDto);

    List<InventoryType> getAllInventoryTypes();

    InventoryTypeResponse getInventoryTypeById(int id);
}
