package ru.vsu.cs.sportbox.data.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "event")
@Schema(description = "Информация о мероприятии")
public class Event {
    @Id
    @Column(name = "id", unique = true)
    @SequenceGenerator(name="event_identifier", sequenceName="event_sequence", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="event_identifier")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private Double price;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "start_date")
    private Date startDate;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "description")
    private String description;

    @ManyToOne (optional=false, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn (name="inventory_type_id")
    private InventoryType inventoryType;

    @ManyToMany(mappedBy="events", fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<Booking> bookings;

    @PreRemove
    public void removeEvent() {
        bookings.forEach(booking -> booking.getEvents().remove(this));
        inventoryType.getEvents().remove(this);
    }
}
