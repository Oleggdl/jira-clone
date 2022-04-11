package com.example.jiraclone.entities;

import com.example.jiraclone.entities.scrum.UserScrumProject;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
})
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String password;

    @JsonIgnore
    @OneToMany(mappedBy = "users")
    private Set<UserScrumProject> userScrumProjects;

    public Users() {
    }

    public Users(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
