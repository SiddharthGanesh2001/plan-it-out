package com.example.plainitoutserverside.config;

import com.example.plainitoutserverside.repository.ChatRepo;
import com.example.plainitoutserverside.repository.EventRepo;
import com.example.plainitoutserverside.repository.UserRepo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatabaseConfig {

    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${spring.datasource.username}")
    private String dbUsername;

    @Value("${spring.datasource.password}")
    private String dbPassword;

    @Bean
    public UserRepo userRepo() {
        return new UserRepo(dbUrl, dbUsername, dbPassword);
    }

    @Bean
    public EventRepo eventRepo() {
        return new EventRepo(dbUrl, dbUsername, dbPassword);
    }

    @Bean
    public ChatRepo chatRepo() {
        return new ChatRepo(dbUrl, dbUsername, dbPassword);
    }
}
