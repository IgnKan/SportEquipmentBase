package ru.vsu.cs.sportbox.service.impl;


import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.vsu.cs.sportbox.data.dto.InventoryTypeFilterDto;
import ru.vsu.cs.sportbox.data.model.Booking;
import ru.vsu.cs.sportbox.data.model.Inventory;
import ru.vsu.cs.sportbox.data.model.InventoryType;
import ru.vsu.cs.sportbox.data.repository.InventoryTypeRepository;
import ru.vsu.cs.sportbox.responses.InventoryTypeResponse;
import ru.vsu.cs.sportbox.specification.InventoryTypeSpecification;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class InventoryTypeServiceImpl implements ru.vsu.cs.sportbox.service.InventoryTypeService {
    private InventoryTypeRepository inventoryTypeRepository;

    @Override
    @Transactional
    public List<InventoryType> filterInventoryType(InventoryTypeFilterDto inventoryTypeFilterDto) {
        List<InventoryType> result = inventoryTypeRepository.findAll(InventoryTypeSpecification.getInventoryTypeByNameAndPrice(inventoryTypeFilterDto));

        String startDate = inventoryTypeFilterDto.getStartDate();
        String endDate = inventoryTypeFilterDto.getEndDate();
        if (StringUtils.isNotBlank(startDate) && StringUtils.isNotBlank(endDate)) {
            Date sDate;
            Date eDate;
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            try {
                sDate = format.parse(startDate);
                eDate = format.parse(endDate);
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }

            for (InventoryType inventoryType : new ArrayList<InventoryType>(result)) {
                int inventorySize = inventoryType.getInventories().size();
                for (Inventory inventory : inventoryType.getInventories()) {
                    for (Booking booking : inventory.getBookings()) {
                        if (sDate.equals(booking.getStartDate()) || eDate.equals(booking.getEndDate())
                                || sDate.before(booking.getStartDate()) && eDate.after(booking.getEndDate())
                                || sDate.after(booking.getStartDate()) && eDate.before(booking.getEndDate())) {
                            inventorySize--;
                            break;
                        }
                    }
                    if (inventorySize < 1) {
                        result.remove(inventoryType);
                    }
                }
            }
        }
        return result;
    }

    @Override
    @Transactional
    public List<InventoryType> getAllInventoryTypes() {
        return inventoryTypeRepository.findAllByOrderByTypeAsc();
    }

    @Override
    @Transactional
    public InventoryTypeResponse getInventoryTypeById(int id) {
        InventoryType inventoryType = inventoryTypeRepository.findById(id);
        if (inventoryType == null) {
            return new InventoryTypeResponse("Инвентаря с указанным идентификатором не существует.", false, null);
        }
        return new InventoryTypeResponse("Инвентарь был успешно найден.", true, inventoryType);
    }
}
