package ru.vsu.cs.sportbox;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.postgresql.shaded.com.ongres.scram.common.bouncycastle.base64.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import ru.vsu.cs.sportbox.config.SecurityConfig;
import ru.vsu.cs.sportbox.controller.InventoryController;
import ru.vsu.cs.sportbox.controller.PersonController;
import ru.vsu.cs.sportbox.data.dto.InventoryCreateDto;
import ru.vsu.cs.sportbox.data.dto.PersonCreateDto;
import ru.vsu.cs.sportbox.data.dto.PersonLoginDto;
import ru.vsu.cs.sportbox.data.model.Inventory;
import ru.vsu.cs.sportbox.data.model.InventoryType;
import ru.vsu.cs.sportbox.data.model.Person;
import ru.vsu.cs.sportbox.responses.InventoryResponse;
import ru.vsu.cs.sportbox.responses.PersonResponse;
import ru.vsu.cs.sportbox.service.*;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.nullValue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest({PersonController.class, InventoryController.class})
@Import(SecurityConfig.class)
class SportBoxApplicationTests {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @MockBean
    private PersonService personService;
    @MockBean
    private InventoryService inventoryService;

    @Test
    public void loginPerson_thenReturnPerson() throws Exception{

        PersonLoginDto personLoginDto = new PersonLoginDto();
        personLoginDto.setEmail("ivan@gmail.com");
        personLoginDto.setPassword("123");

        Person person = new Person();
        person.setEmail("ivan@gmail.com");
        person.setPassword("123");

        PersonResponse personResponse = new PersonResponse();
        personResponse.setStatus(true);
        personResponse.setPerson(person);
        given(personService.loginPerson(any())).willReturn(personResponse);


        String username = System.getProperty("SECURITY_USERNAME");
        String password = System.getProperty("SECURITY_PASSWORD");
        String credentials = username + ":" + password;
        String base64Credentials = new String(Base64.encode(credentials.getBytes()));

        ResultActions response = mockMvc.perform(post("/api/person/login")
                .header("Authorization", "Basic " + base64Credentials)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(personLoginDto)));


        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.status", is(true)))
                .andExpect(jsonPath("$.person.email", is(person.getEmail())))
                .andExpect(jsonPath("$.person.password", is(person.getPassword())));

    }
    @Test
    public void loginPerson_thenReturnNull() throws Exception{

        PersonLoginDto personLoginDto = new PersonLoginDto();
        personLoginDto.setEmail("ivan@gmail.com");
        personLoginDto.setPassword("123");

        PersonResponse personResponse = new PersonResponse();
        personResponse.setStatus(false);
        personResponse.setPerson(null);
        given(personService.loginPerson(any())).willReturn(personResponse);


        String username = System.getProperty("SECURITY_USERNAME");
        String password = System.getProperty("SECURITY_PASSWORD");
        String credentials = username + ":" + password;
        String base64Credentials = new String(Base64.encode(credentials.getBytes()));

        ResultActions response = mockMvc.perform(post("/api/person/login")
                .header("Authorization", "Basic " + base64Credentials)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(personLoginDto)));


        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.status", is(false)))
                .andExpect(jsonPath("$.person", is(nullValue())));

    }

    @Test
    public void addPerson_thenReturnPerson() throws Exception{

        PersonCreateDto personCreateDto = new PersonCreateDto();
        personCreateDto.setName("Иван");
        personCreateDto.setEmail("ivan@gmail.com");
        personCreateDto.setPassword("123");

        Person person = new Person();
        person.setName("Иван");
        person.setEmail("ivan@gmail.com");
        person.setPassword("123");

        PersonResponse personResponse = new PersonResponse();
        personResponse.setStatus(true);
        personResponse.setPerson(person);
        given(personService.addNewPerson(any())).willReturn(personResponse);


        String username = System.getProperty("SECURITY_USERNAME");
        String password = System.getProperty("SECURITY_PASSWORD");
        String credentials = username + ":" + password;
        String base64Credentials = new String(Base64.encode(credentials.getBytes()));

        ResultActions response = mockMvc.perform(post("/api/person/add")
                .header("Authorization", "Basic " + base64Credentials)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(personCreateDto)));


        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.status", is(true)))
                .andExpect(jsonPath("$.person.name", is(person.getName())))
                .andExpect(jsonPath("$.person.email", is(person.getEmail())))
                .andExpect(jsonPath("$.person.password", is(person.getPassword())));

    }
    @Test
    public void addPerson_thenReturnNull() throws Exception{

        PersonCreateDto personCreateDto = new PersonCreateDto();
        personCreateDto.setName("Иван");
        personCreateDto.setEmail("ivan@gmail.com");
        personCreateDto.setPassword("123");

        PersonResponse personResponse = new PersonResponse();
        personResponse.setStatus(false);
        personResponse.setPerson(null);
        given(personService.addNewPerson(any())).willReturn(personResponse);


        String username = System.getProperty("SECURITY_USERNAME");
        String password = System.getProperty("SECURITY_PASSWORD");
        String credentials = username + ":" + password;
        String base64Credentials = new String(Base64.encode(credentials.getBytes()));

        ResultActions response = mockMvc.perform(post("/api/person/add")
                .header("Authorization", "Basic " + base64Credentials)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(personCreateDto)));


        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.status", is(false)))
                .andExpect(jsonPath("$.person", is(nullValue())));

    }

    @Test
    public void getPersonById_thenReturnPerson() throws Exception{

        Person person = new Person();
        person.setId(1);
        person.setName("Иван");
        person.setEmail("ivan@gmail.com");
        person.setPassword("123");

        PersonResponse personResponse = new PersonResponse();
        personResponse.setStatus(true);
        personResponse.setPerson(person);
        given(personService.getPersonById(1)).willReturn(personResponse);


        String username = System.getProperty("SECURITY_USERNAME");
        String password = System.getProperty("SECURITY_PASSWORD");
        String credentials = username + ":" + password;
        String base64Credentials = new String(Base64.encode(credentials.getBytes()));

        ResultActions response = mockMvc.perform(get("/api/person/profile")
                .header("Authorization", "Basic " + base64Credentials)
                .param("id", "1")
                .contentType(MediaType.APPLICATION_JSON));


        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.status", is(true)))
                .andExpect(jsonPath("$.person.name", is(person.getName())))
                .andExpect(jsonPath("$.person.email", is(person.getEmail())))
                .andExpect(jsonPath("$.person.password", is(person.getPassword())));

    }
    @Test
    public void getPersonById_thenReturnNull() throws Exception{

        Person person = new Person();
        person.setId(2);
        person.setName("Иван");
        person.setEmail("ivan@gmail.com");
        person.setPassword("123");

        PersonResponse personResponse = new PersonResponse();
        personResponse.setStatus(false);
        personResponse.setPerson(null);
        given(personService.getPersonById(1)).willReturn(personResponse);


        String username = System.getProperty("SECURITY_USERNAME");
        String password = System.getProperty("SECURITY_PASSWORD");
        String credentials = username + ":" + password;
        String base64Credentials = new String(Base64.encode(credentials.getBytes()));

        ResultActions response = mockMvc.perform(get("/api/person/profile")
                .header("Authorization", "Basic " + base64Credentials)
                .param("id", "1")
                .contentType(MediaType.APPLICATION_JSON));


        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.status", is(false)))
                .andExpect(jsonPath("$.person", is(nullValue())));

    }

    @Test
    public void banPerson_thenReturnPerson() throws Exception{

        Person person = new Person();
        person.setId(1);
        person.setName("Иван");
        person.setEmail("ivan@gmail.com");
        person.setPassword("123");

        PersonResponse personResponse = new PersonResponse();
        personResponse.setStatus(true);
        personResponse.setPerson(person);
        given(personService.banPerson(1)).willReturn(personResponse);


        String username = System.getProperty("SECURITY_USERNAME");
        String password = System.getProperty("SECURITY_PASSWORD");
        String credentials = username + ":" + password;
        String base64Credentials = new String(Base64.encode(credentials.getBytes()));

        ResultActions response = mockMvc.perform(put("/api/person/ban")
                .header("Authorization", "Basic " + base64Credentials)
                .param("id", "1")
                .contentType(MediaType.APPLICATION_JSON));


        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.status", is(true)))
                .andExpect(jsonPath("$.person.name", is(person.getName())))
                .andExpect(jsonPath("$.person.email", is(person.getEmail())))
                .andExpect(jsonPath("$.person.password", is(person.getPassword())));

    }
    @Test
    public void unbanPerson_thenReturnPerson() throws Exception{

        Person person = new Person();
        person.setId(1);
        person.setName("Иван");
        person.setEmail("ivan@gmail.com");
        person.setPassword("123");

        PersonResponse personResponse = new PersonResponse();
        personResponse.setStatus(true);
        personResponse.setPerson(person);
        given(personService.unbanPerson(1)).willReturn(personResponse);


        String username = System.getProperty("SECURITY_USERNAME");
        String password = System.getProperty("SECURITY_PASSWORD");
        String credentials = username + ":" + password;
        String base64Credentials = new String(Base64.encode(credentials.getBytes()));

        ResultActions response = mockMvc.perform(put("/api/person/unban")
                .header("Authorization", "Basic " + base64Credentials)
                .param("id", "1")
                .contentType(MediaType.APPLICATION_JSON));


        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.status", is(true)))
                .andExpect(jsonPath("$.person.name", is(person.getName())))
                .andExpect(jsonPath("$.person.email", is(person.getEmail())))
                .andExpect(jsonPath("$.person.password", is(person.getPassword())));

    }
    @Test
    public void deletePerson_thenReturnPerson() throws Exception{

        Person person = new Person();
        person.setId(1);
        person.setName("Иван");
        person.setEmail("ivan@gmail.com");
        person.setPassword("123");

        PersonResponse personResponse = new PersonResponse();
        personResponse.setStatus(true);
        personResponse.setPerson(person);
        given(personService.deletePersonById(1)).willReturn(personResponse);


        String username = System.getProperty("SECURITY_USERNAME");
        String password = System.getProperty("SECURITY_PASSWORD");
        String credentials = username + ":" + password;
        String base64Credentials = new String(Base64.encode(credentials.getBytes()));

        ResultActions response = mockMvc.perform(delete("/api/person/delete")
                .header("Authorization", "Basic " + base64Credentials)
                .param("id", "1")
                .contentType(MediaType.APPLICATION_JSON));


        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.status", is(true)))
                .andExpect(jsonPath("$.person.name", is(person.getName())))
                .andExpect(jsonPath("$.person.email", is(person.getEmail())))
                .andExpect(jsonPath("$.person.password", is(person.getPassword())));

    }

    @Test
    public void deletePerson_thenReturnNull() throws Exception{

        Person person = new Person();
        person.setId(2);
        person.setName("Иван");
        person.setEmail("ivan@gmail.com");
        person.setPassword("123");

        PersonResponse personResponse = new PersonResponse();
        personResponse.setStatus(false);
        personResponse.setPerson(null);
        given(personService.deletePersonById(1)).willReturn(personResponse);


        String username = System.getProperty("SECURITY_USERNAME");
        String password = System.getProperty("SECURITY_PASSWORD");
        String credentials = username + ":" + password;
        String base64Credentials = new String(Base64.encode(credentials.getBytes()));

        ResultActions response = mockMvc.perform(delete("/api/person/delete")
                .header("Authorization", "Basic " + base64Credentials)
                .param("id", "1")
                .contentType(MediaType.APPLICATION_JSON));


        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.status", is(false)))
                .andExpect(jsonPath("$.person", is(nullValue())));

    }

    @Test
    public void addInventory_thenReturnInventory() throws Exception{

        InventoryCreateDto inventoryCreateDto = new InventoryCreateDto();
        inventoryCreateDto.setName("Лыжи голубые");
        inventoryCreateDto.setSize(40);
        inventoryCreateDto.setInventoryType("Лыжи");

        Inventory inventory = new Inventory();
        inventory.setName("Лыжи голубые");
        inventory.setSize(40);
        inventory.setInventoryType(new InventoryType());
        inventory.getInventoryType().setType("Лыжи");

        InventoryResponse inventoryResponse = new InventoryResponse();
        inventoryResponse.setStatus(true);
        inventoryResponse.setInventory(inventory);
        given(inventoryService.addNewInventory(any())).willReturn(inventoryResponse);


        String username = System.getProperty("SECURITY_USERNAME");
        String password = System.getProperty("SECURITY_PASSWORD");
        String credentials = username + ":" + password;
        String base64Credentials = new String(Base64.encode(credentials.getBytes()));

        ResultActions response = mockMvc.perform(post("/api/inventory/add")
                .header("Authorization", "Basic " + base64Credentials)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(inventoryCreateDto)));


        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.status", is(true)))
                .andExpect(jsonPath("$.inventory.name", is(inventory.getName())))
                .andExpect(jsonPath("$.inventory.size", is(inventory.getSize())))
                .andExpect(jsonPath("$.inventory.inventoryType.type", is(inventory.getInventoryType().getType())));

    }
    @Test
    public void addInventory_thenReturnNull() throws Exception{

        InventoryCreateDto inventoryCreateDto = new InventoryCreateDto();
        inventoryCreateDto.setName("Лыжи голубые");
        inventoryCreateDto.setSize(40);
        inventoryCreateDto.setInventoryType("Лыжи");

        InventoryResponse inventoryResponse = new InventoryResponse();
        inventoryResponse.setStatus(false);
        inventoryResponse.setInventory(null);
        given(inventoryService.addNewInventory(any())).willReturn(inventoryResponse);


        String username = System.getProperty("SECURITY_USERNAME");
        String password = System.getProperty("SECURITY_PASSWORD");
        String credentials = username + ":" + password;
        String base64Credentials = new String(Base64.encode(credentials.getBytes()));

        ResultActions response = mockMvc.perform(post("/api/inventory/add")
                .header("Authorization", "Basic " + base64Credentials)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(inventoryCreateDto)));


        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.status", is(false)))
                .andExpect(jsonPath("$.inventory", is(nullValue())));

    }

    @Test
    public void getInventoryById_thenReturnInventory() throws Exception{

        Inventory inventory = new Inventory();
        inventory.setId(1);
        inventory.setName("Лыжи голубые");
        inventory.setSize(40);
        inventory.setInventoryType(new InventoryType());
        inventory.getInventoryType().setType("Лыжи");

        InventoryResponse inventoryResponse = new InventoryResponse();
        inventoryResponse.setStatus(true);
        inventoryResponse.setInventory(inventory);
        given(inventoryService.getInventoryById(1)).willReturn(inventoryResponse);


        String username = System.getProperty("SECURITY_USERNAME");
        String password = System.getProperty("SECURITY_PASSWORD");
        String credentials = username + ":" + password;
        String base64Credentials = new String(Base64.encode(credentials.getBytes()));

        ResultActions response = mockMvc.perform(get("/api/inventory/get_by_id")
                .header("Authorization", "Basic " + base64Credentials)
                .param("id", "1")
                .contentType(MediaType.APPLICATION_JSON));


        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.status", is(true)))
                .andExpect(jsonPath("$.inventory.name", is(inventory.getName())))
                .andExpect(jsonPath("$.inventory.size", is(inventory.getSize())))
                .andExpect(jsonPath("$.inventory.inventoryType.type", is(inventory.getInventoryType().getType())));

    }
    @Test
    public void getInventoryById_thenReturnNull() throws Exception{

        Inventory inventory = new Inventory();
        inventory.setId(2);
        inventory.setName("Лыжи голубые");
        inventory.setSize(40);
        inventory.setInventoryType(new InventoryType());
        inventory.getInventoryType().setType("Лыжи");

        InventoryResponse inventoryResponse = new InventoryResponse();
        inventoryResponse.setStatus(false);
        inventoryResponse.setInventory(null);
        given(inventoryService.getInventoryById(1)).willReturn(inventoryResponse);


        String username = System.getProperty("SECURITY_USERNAME");
        String password = System.getProperty("SECURITY_PASSWORD");
        String credentials = username + ":" + password;
        String base64Credentials = new String(Base64.encode(credentials.getBytes()));

        ResultActions response = mockMvc.perform(get("/api/inventory/get_by_id")
                .header("Authorization", "Basic " + base64Credentials)
                .param("id", "1")
                .contentType(MediaType.APPLICATION_JSON));


        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.status", is(false)))
                .andExpect(jsonPath("$.inventory", is(nullValue())));

    }

    @Test
    public void deleteInventory_thenReturnInventory() throws Exception{

        Inventory inventory = new Inventory();
        inventory.setId(1);
        inventory.setName("Лыжи голубые");
        inventory.setSize(40);
        inventory.setInventoryType(new InventoryType());
        inventory.getInventoryType().setType("Лыжи");

        InventoryResponse inventoryResponse = new InventoryResponse();
        inventoryResponse.setStatus(true);
        inventoryResponse.setInventory(inventory);
        given(inventoryService.deleteInventoryById(1)).willReturn(inventoryResponse);


        String username = System.getProperty("SECURITY_USERNAME");
        String password = System.getProperty("SECURITY_PASSWORD");
        String credentials = username + ":" + password;
        String base64Credentials = new String(Base64.encode(credentials.getBytes()));

        ResultActions response = mockMvc.perform(delete("/api/inventory/delete")
                .header("Authorization", "Basic " + base64Credentials)
                .param("id", "1")
                .contentType(MediaType.APPLICATION_JSON));


        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.status", is(true)))
                .andExpect(jsonPath("$.inventory.name", is(inventory.getName())))
                .andExpect(jsonPath("$.inventory.size", is(inventory.getSize())))
                .andExpect(jsonPath("$.inventory.inventoryType.type", is(inventory.getInventoryType().getType())));

    }
    @Test
    public void deleteInventory_thenReturnNull() throws Exception{

        Inventory inventory = new Inventory();
        inventory.setId(2);
        inventory.setName("Лыжи голубые");
        inventory.setSize(40);
        inventory.setInventoryType(new InventoryType());
        inventory.getInventoryType().setType("Лыжи");

        InventoryResponse inventoryResponse = new InventoryResponse();
        inventoryResponse.setStatus(false);
        inventoryResponse.setInventory(null);
        given(inventoryService.deleteInventoryById(1)).willReturn(inventoryResponse);


        String username = System.getProperty("SECURITY_USERNAME");
        String password = System.getProperty("SECURITY_PASSWORD");
        String credentials = username + ":" + password;
        String base64Credentials = new String(Base64.encode(credentials.getBytes()));

        ResultActions response = mockMvc.perform(delete("/api/inventory/delete")
                .header("Authorization", "Basic " + base64Credentials)
                .param("id", "1")
                .contentType(MediaType.APPLICATION_JSON));


        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.status", is(false)))
                .andExpect(jsonPath("$.inventory", is(nullValue())));

    }

}
