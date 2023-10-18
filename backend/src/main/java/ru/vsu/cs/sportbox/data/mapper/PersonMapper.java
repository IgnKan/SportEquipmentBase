package ru.vsu.cs.sportbox.data.mapper;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.vsu.cs.sportbox.data.dto.PersonCreateDto;
import ru.vsu.cs.sportbox.data.model.Person;
import ru.vsu.cs.sportbox.data.repository.RoleRepository;

@Component
@AllArgsConstructor
public class PersonMapper {
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    public Person personCreateDtoToPerson (PersonCreateDto personCreateDto){
        Person person = new Person();

        person.setName(personCreateDto.getName());
        person.setPassword(passwordEncoder.encode(personCreateDto.getPassword()));
        person.setEmail(personCreateDto.getEmail());
        person.setRole(roleRepository.findByName("Customer"));

        return person;
    }

    public Person personCreateDtoToAdmin(PersonCreateDto personCreateDto) {
        Person person = new Person();

        person.setName(personCreateDto.getName());
        person.setPassword(passwordEncoder.encode(personCreateDto.getPassword()));
        person.setEmail(personCreateDto.getEmail());
        person.setRole(roleRepository.findByName("Admin"));

        return person;
    }
}
