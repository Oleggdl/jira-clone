package com.example.jiraclone.pojo;

import lombok.Data;

@Data
public class JwtResponse {

    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private String name;
    private String surname;

    public JwtResponse(String token, Long id, String username, String email, String name, String surname) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.email = email;
        this.name = name;
        this.surname = surname;
    }
}
