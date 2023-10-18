package ru.vsu.cs.sportbox.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.vsu.cs.sportbox.data.dto.*;
import ru.vsu.cs.sportbox.data.model.Inventory;
import ru.vsu.cs.sportbox.responses.*;
import ru.vsu.cs.sportbox.service.InventoryService;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@AllArgsConstructor
@CrossOrigin(origins = {"https://sport-box.vercel.app", "http://localhost:3000"}, allowCredentials = "true")
@Tag(name = "Оборудование", description = "Методы для работы с оборудованием")
public class InventoryController {

    private InventoryService inventoryService;

    @PostMapping("/filter")
    @Operation(summary = "Фильтрация списка оборудования")
    public ResponseEntity<List<Inventory>> filterInventory(@RequestBody InventoryFilterDto inventoryFilterDto) {
        HttpStatus httpStatus = HttpStatus.OK;
        List<Inventory> inventories = inventoryService.filterInventory(inventoryFilterDto);
        return new ResponseEntity<>(inventories, httpStatus);
    }

    @PostMapping("/add")
    @Operation(summary = "Добавление нового оборудования")
    public ResponseEntity<InventoryResponse> addNewInventory(@RequestBody InventoryCreateDto inventoryCreateDto) {
        HttpStatus httpStatus = HttpStatus.OK;
        InventoryResponse inventoryCreateResponse = inventoryService.addNewInventory(inventoryCreateDto);
        return new ResponseEntity<>(inventoryCreateResponse, httpStatus);
    }

    @GetMapping("/get_by_id")
    @Operation(summary = "Получение информации об оборудовании по его id")
    public ResponseEntity<InventoryResponse> getInventoryById(@Parameter(description = "Уникальный идентификатор оборудования")
                                                                  @RequestParam(value="id") int id) {
        HttpStatus httpStatus = HttpStatus.OK;
        InventoryResponse inventoryGetResponse = inventoryService.getInventoryById(id);
        return new ResponseEntity<>(inventoryGetResponse, httpStatus);
    }

    @PutMapping("/change")
    @Operation(summary = "Изменение информации об оборудовании")
    public ResponseEntity<InventoryResponse> changeInventory(@Parameter(description = "Уникальный идентификатор оборудования")
                                                                 @RequestParam(value="id") int id, @RequestBody InventoryChangeDto inventoryChangeDto) {
        HttpStatus httpStatus = HttpStatus.OK;
        InventoryResponse inventoryChangeResponse = inventoryService.changeInventory(id, inventoryChangeDto);
        return new ResponseEntity<>(inventoryChangeResponse, httpStatus);
    }

    @DeleteMapping("/delete")
    @Operation(summary = "Удаление оборудования по его id")
    public ResponseEntity<InventoryResponse> deleteInventoryById(@Parameter(description = "Уникальный идентификатор оборудования")
                                                                     @RequestParam(value="id") int id) {
        HttpStatus httpStatus = HttpStatus.OK;
        InventoryResponse inventoryDeleteResponse = inventoryService.deleteInventoryById(id);
        return new ResponseEntity<>(inventoryDeleteResponse, httpStatus);
    }
}
