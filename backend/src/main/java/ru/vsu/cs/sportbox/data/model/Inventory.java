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
@Table(name = "inventory")
@Schema(description = "Информация об оборудовании")
public class Inventory {
    @Id
    @Column(name = "id", unique = true)
    @SequenceGenerator(name="inventory_identifier", sequenceName="inventory_sequence", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="inventory_identifier")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "size")
    private Integer size;

    @ManyToOne (optional=false, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn (name="inventory_type_id")
    private InventoryType inventoryType;

    @OneToMany(mappedBy = "inventory", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    @JsonIgnore
    private Set<Booking> bookings;

    @PrePersist
    public void addInventory() {
        inventoryType.getInventories().add(this);
    }

    @PreRemove
    public void removeInventory() {
        inventoryType.getInventories().remove(this);
    }
}
