package ru.vsu.cs.sportbox.data.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.media.Schema;
import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "booking")
@Schema(description = "Информация о заказе")
public class Booking {

    @Id
    @Column(name = "id", unique = true)
    @SequenceGenerator(name="booking_identifier", sequenceName="booking_sequence", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="booking_identifier")
    private Integer id;

    @Column(name = "price")
    private Double price;

    @CreationTimestamp
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "date")
    private Date date;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "start_date")
    private Date startDate;

    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "end_date")
    private Date endDate;

    @ManyToOne(optional = false, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "person_id")
    @JsonIgnore
    private Person person;

    @ManyToOne(optional = false, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "inventory_id")
    private Inventory inventory;

    @Column(name = "debt")
    private Double debt = 0.0;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name="event_booking",
            joinColumns={@JoinColumn(name="booking_id")},
            inverseJoinColumns={@JoinColumn(name="event_id")})
    private Set<Event> events;


    @PrePersist
    public void addBooking() {
        person.getBookings().add(this);
        inventory.getBookings().add(this);
        events.forEach(event -> event.getBookings().add(this));
    }

    @PreRemove
    public void removeBooking() {
        person.getBookings().remove(this);
        inventory.getBookings().remove(this);
        events.forEach(event -> event.getBookings().remove(this));
    }

}
