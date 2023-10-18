package ru.vsu.cs.sportbox.service.impl;


import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.vsu.cs.sportbox.data.dto.PersonCreateDto;
import ru.vsu.cs.sportbox.data.dto.PersonFilterDto;
import ru.vsu.cs.sportbox.data.dto.PersonLoginDto;
import ru.vsu.cs.sportbox.data.mapper.PersonMapper;
import ru.vsu.cs.sportbox.data.model.Person;
import ru.vsu.cs.sportbox.data.repository.PersonRepository;
import ru.vsu.cs.sportbox.responses.PersonResponse;
import ru.vsu.cs.sportbox.service.PersonService;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class PersonServiceImpl implements PersonService {

    private PersonRepository personRepository;
    private PersonMapper personMapper;
    private PasswordEncoder passwordEncoder;
    @Override
    @Transactional
    public PersonResponse addNewPerson(PersonCreateDto personCreateDto){
        Person person = personMapper.personCreateDtoToPerson(personCreateDto);

        if (personRepository.existsByEmail(person.getEmail()))
            return new PersonResponse("К указанной почте уже привязан аккаунт.", false, null);

        personRepository.save(person);
        return new PersonResponse("Регистрация прошла успешно.", true, person);
    }

    @Override
    @Transactional
    public PersonResponse addNewAdmin(PersonCreateDto personCreateDto) {
        Person person = personMapper.personCreateDtoToAdmin(personCreateDto);

        if (personRepository.existsByEmail(person.getEmail()))
            return new PersonResponse("К указанной почте уже привязан аккаунт.", false, null);

        personRepository.save(person);
        return new PersonResponse("Регистрация прошла успешно.", true, person);
    }

    @Override
    @Transactional
    public PersonResponse loginPerson(PersonLoginDto personLoginDto) {
        Person person = personRepository.findByEmail(personLoginDto.getEmail());
        if (person != null) {
            if (person.getIsBaned()){
                return new PersonResponse("Ваш аккаунт был заблокирован за нарушение условий аренды. Обратитесь к сотрудникам компании для разблокировки аккаунта.", false, person);
            }
            String rawPassword = personLoginDto.getPassword();
            String encodedPassword = person.getPassword();
            Boolean isPasswordRight = passwordEncoder.matches(rawPassword, encodedPassword);
            if (isPasswordRight) {
                return new PersonResponse("Авторизация прошла успешно.", true, person);
            } else {
                return new PersonResponse("Введен неверный пароль.", false, person);
            }
        } else {
            return new PersonResponse("Аккаунта с указанной почтой не существует.", false, null);
        }
    }

    @Override
    @Transactional
    public PersonResponse getPersonById(int id) {
        Person person = personRepository.findById(id);
        if (person != null) {
            return new PersonResponse("Пользователь успешно найден.", true, person);
        } else {
            return new PersonResponse("Пользователя с указанным идентификатором не существует.", false, null);
        }
    }

    @Override
    @Transactional
    public List<Person> filterPerson(PersonFilterDto personFilterDto) {
        List<Person> persons = new ArrayList<>();
        if (StringUtils.isNotBlank(personFilterDto.getEmail())){
            persons.add(personRepository.findByEmail(personFilterDto.getEmail()));
        } else {
            persons = personRepository.findAll();
        }

        return persons;
    }

    @Override
    @Transactional
    public PersonResponse deletePersonById(int id) {
        Person person = personRepository.findById(id);
        if (person != null) {
            personRepository.removePersonById(id);
            return new PersonResponse("Удаление пользователя прошло успешно.", true, person);
        } else {
            return new PersonResponse("Пользователя с указанным идентификатором не существует.", false, null);
        }
    }

    @Override
    @Transactional
    public PersonResponse banPerson(int id) {
        Person person = personRepository.findById(id);
        if (person != null) {
            person.setIsBaned(true);
            personRepository.save(person);
            return new PersonResponse("Блокировка пользователя прошла успешно.", true, person);
        } else {
            return new PersonResponse("Пользователя с указанным идентификатором не существует.", false, null);
        }
    }

    @Override
    @Transactional
    public PersonResponse unbanPerson(int id) {
        Person person = personRepository.findById(id);
        if (person != null) {
            person.setIsBaned(false);
            personRepository.save(person);
            return new PersonResponse("Разблокировка пользователя прошла успешно.", true, person);
        } else {
            return new PersonResponse("Пользователя с указанным идентификатором не существует.", false, null);
        }
    }
}
