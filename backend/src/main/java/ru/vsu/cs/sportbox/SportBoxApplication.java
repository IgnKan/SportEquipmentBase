package ru.vsu.cs.sportbox;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "SportBox API", version = "1.0.0", description = "Веб-приложение для проката инвентаря на спортивной базе."), servers = {@Server(url = "https://sportbox.up.railway.app")})
public class SportBoxApplication {

    public static void main(String[] args) {
        SpringApplication.run(SportBoxApplication.class, args);
    }

}
