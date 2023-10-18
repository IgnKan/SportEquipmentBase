package ru.vsu.cs.sportbox.service.impl;


import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.vsu.cs.sportbox.data.dto.InventoryChangeDto;
import ru.vsu.cs.sportbox.data.dto.InventoryCreateDto;
import ru.vsu.cs.sportbox.data.dto.InventoryFilterDto;
import ru.vsu.cs.sportbox.data.mapper.InventoryMapper;
import ru.vsu.cs.sportbox.data.model.Inventory;
import ru.vsu.cs.sportbox.data.model.InventoryType;
import ru.vsu.cs.sportbox.data.repository.InventoryRepository;
import ru.vsu.cs.sportbox.data.repository.InventoryTypeRepository;
import ru.vsu.cs.sportbox.responses.*;
import ru.vsu.cs.sportbox.service.InventoryService;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class InventoryServiceImpl implements InventoryService {
    private InventoryRepository inventoryRepository;
    private InventoryTypeRepository inventoryTypeRepository;
    private InventoryMapper inventoryMapper;

    @Override
    @Transactional
    public List<Inventory> filterInventory(InventoryFilterDto inventoryFilterDto) {
        if (inventoryFilterDto.getInventoryType() != null && inventoryFilterDto.getId() != 0) {
            ArrayList<Inventory> result = new ArrayList<>();
            result.add(inventoryRepository.findByIdAndInventoryType(inventoryFilterDto.getId(), inventoryTypeRepository.findByType(inventoryFilterDto.getInventoryType())));
            return result;
        } else if (inventoryFilterDto.getInventoryType() != null) {
            return inventoryRepository.findByInventoryType(inventoryTypeRepository.findByType(inventoryFilterDto.getInventoryType()));
        } else if (inventoryFilterDto.getId() != 0) {
            ArrayList<Inventory> result = new ArrayList<>();
            result.add(inventoryRepository.findById(inventoryFilterDto.getId()));
            return result;
        }
        return inventoryRepository.findAll();
    }

    @Override
    @Transactional
    public InventoryResponse addNewInventory(InventoryCreateDto inventoryCreateDto) {
        Inventory inventory = inventoryMapper.inventoryCreateDtoToInventory(inventoryCreateDto);
        if (inventory == null) {
            return new InventoryResponse("При добавлении инвентаря возникла ошибка.", false, null);
        }
        Inventory savedInventory = inventoryRepository.save(inventory);
        return new InventoryResponse("Инвентарь был успешно добавлен.", true, savedInventory);
    }

    @Override
    @Transactional
    public InventoryResponse getInventoryById(int id) {
        Inventory inventory = inventoryRepository.findById(id);
        if (inventory == null) {
            return new InventoryResponse("Инвентаря с указанным идентификатором не существует.", false, null);
        }
        return new InventoryResponse("Инвентарь был успешно найден.", true, inventory);
    }

    @Override
    @Transactional
    public InventoryResponse deleteInventoryById(int id) {
        Inventory inventory = inventoryRepository.findById(id);
        if (inventory != null) {
            inventoryRepository.removeInventoryById(id);
            return new InventoryResponse("Удаление инвентаря прошло успешно.", true, inventory);
        } else {
            return new InventoryResponse("Инвентаря с указанным идентификатором не существует.", false, null);
        }
    }

    @Override
    @Transactional
    public InventoryResponse changeInventory(int id, InventoryChangeDto inventoryChangeDto) {
        Inventory inventory = inventoryRepository.findById(id);
        if (inventory != null) {
            if (StringUtils.isNotBlank(inventoryChangeDto.getName())){
                inventory.setName(inventoryChangeDto.getName());
            }

            InventoryType inventoryType;
            if (StringUtils.isNotBlank(inventoryChangeDto.getInventoryType())) {
                inventoryType = inventoryTypeRepository.findByType(inventoryChangeDto.getInventoryType());
            } else {
                inventoryType = inventory.getInventoryType();
            }
            if (inventoryType == null) {
                return new InventoryResponse("Указанного типа инвентаря не существует.", false, null);
            }
            inventory.setInventoryType(inventoryType);
            if (inventoryType.getIsSizable() && inventoryChangeDto.getSize() != 0) {
                inventory.setSize(inventoryChangeDto.getSize());
            }

            inventoryRepository.save(inventory);
            return new InventoryResponse("Изменение инвентаря прошло успешно.", true, inventory);
        } else {
            return new InventoryResponse("Инвентаря с указанным идентификатором не существует.", false, null);
        }
    }
}
