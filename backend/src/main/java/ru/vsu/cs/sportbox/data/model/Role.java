package ru.vsu.cs.sportbox.data.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "role")
@Schema(description = "Информация о роли пользователя (клиент или администратор)")
public class Role {

    @Id
    @Column(name = "id", unique = true)
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @OneToMany (mappedBy="role", fetch=FetchType.EAGER, cascade = CascadeType.REMOVE)
    @JsonIgnore
    private Set<Person> persons;

}
