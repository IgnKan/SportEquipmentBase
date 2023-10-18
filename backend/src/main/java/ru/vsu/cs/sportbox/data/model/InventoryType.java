package ru.vsu.cs.sportbox.data.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "inventory_type")
@Schema(description = "Информация о типе оборудования")
public class InventoryType {

    @Id
    @Column(name = "id", unique = true)
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "type", unique = true)
    private String type;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Double price;

    @Column(name = "is_sizable")
    private Boolean isSizable;

    @OneToMany (mappedBy="inventoryType", fetch=FetchType.EAGER, cascade = CascadeType.REMOVE)
    @JsonIgnore
    private Set<Inventory> inventories;

    @OneToMany (mappedBy="inventoryType", fetch=FetchType.EAGER, cascade = CascadeType.REMOVE)
    @JsonIgnore
    private Set<Event> events;
}
