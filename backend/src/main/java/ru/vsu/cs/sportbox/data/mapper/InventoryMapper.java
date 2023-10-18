package ru.vsu.cs.sportbox.data.mapper;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import ru.vsu.cs.sportbox.data.dto.InventoryCreateDto;
import ru.vsu.cs.sportbox.data.model.Inventory;
import ru.vsu.cs.sportbox.data.model.InventoryType;
import ru.vsu.cs.sportbox.data.repository.InventoryTypeRepository;

@Component
@AllArgsConstructor
public class InventoryMapper {
    private InventoryTypeRepository inventoryTypeRepository;

    public Inventory inventoryCreateDtoToInventory (InventoryCreateDto inventoryCreateDto){
        Inventory inventory = new Inventory();

        inventory.setName(inventoryCreateDto.getName());
        InventoryType inventoryType = inventoryTypeRepository.findByType(inventoryCreateDto.getInventoryType());
        if (inventoryType == null) {
            return null;
        }
        inventory.setInventoryType(inventoryType);
        if (inventoryType.getIsSizable() && inventoryCreateDto.getSize() != 0) {
            inventory.setSize(inventoryCreateDto.getSize());
        }

        return inventory;
    }
}
