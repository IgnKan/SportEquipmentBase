package ru.vsu.cs.sportbox.data.model;


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
@Table(name = "person")
@Schema(description = "Информация о пользователе")
public class Person {

    @Id
    @Column(name = "id", unique = true)
    @SequenceGenerator(name="person_identifier", sequenceName="person_sequence", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="person_identifier")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "password")
    private String password;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "is_baned")
    private Boolean isBaned = false;

    @ManyToOne (optional=false, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn (name="role_id")
    private Role role;

    @OneToMany(mappedBy = "person", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    private Set<Booking> bookings;

    @PrePersist
    public void addPerson() {
        role.getPersons().add(this);
    }

    @PreRemove
    public void removePerson() {
        role.getPersons().remove(this);
    }
}
