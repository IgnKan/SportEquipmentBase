package ru.vsu.cs.sportbox.service;

import ru.vsu.cs.sportbox.data.dto.InventoryChangeDto;
import ru.vsu.cs.sportbox.data.dto.InventoryCreateDto;
import ru.vsu.cs.sportbox.data.dto.InventoryFilterDto;
import ru.vsu.cs.sportbox.data.model.Inventory;
import ru.vsu.cs.sportbox.responses.*;

import java.util.List;

public interface InventoryService {

    List<Inventory> filterInventory(InventoryFilterDto inventoryFilterDto);
    InventoryResponse addNewInventory(InventoryCreateDto inventoryCreateDto);
    InventoryResponse getInventoryById(int id);
    InventoryResponse deleteInventoryById(int id);
    InventoryResponse changeInventory(int id, InventoryChangeDto inventoryChangeDto);
}
