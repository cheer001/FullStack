package com.spring.datajpa;


import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.oas.annotations.EnableOpenApi;

@Configuration
@SpringBootApplication
@EnableOpenApi
@OpenAPIDefinition(info = @Info(title = "Tutorial API",version = "2.0",description = "Find Tutorials"))
public class SpringbootTutorialsApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootTutorialsApplication.class, args);
    }

}
