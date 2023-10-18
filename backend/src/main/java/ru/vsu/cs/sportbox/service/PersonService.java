package ru.vsu.cs.sportbox.service;

import ru.vsu.cs.sportbox.data.dto.PersonCreateDto;
import ru.vsu.cs.sportbox.data.dto.PersonFilterDto;
import ru.vsu.cs.sportbox.data.dto.PersonLoginDto;
import ru.vsu.cs.sportbox.data.model.Person;
import ru.vsu.cs.sportbox.responses.PersonResponse;

import java.util.List;

public interface PersonService {
    PersonResponse addNewPerson(PersonCreateDto personCreateDto);
    PersonResponse addNewAdmin(PersonCreateDto personCreateDto);
    PersonResponse loginPerson(PersonLoginDto personLoginDto);
    PersonResponse getPersonById(int id);

    List<Person> filterPerson(PersonFilterDto personFilterDto);

    PersonResponse deletePersonById(int id);

    PersonResponse banPerson(int id);

    PersonResponse unbanPerson(int id);
}



