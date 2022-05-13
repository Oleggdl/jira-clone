package com.example.jiraclone.entities;

import com.example.jiraclone.entities.scrum.ProjectScrum;
import com.example.jiraclone.entities.scrum.UserScrumProject;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
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
    private String name;
    private String surname;

    @JsonIgnore
    @OneToMany(mappedBy = "users")
    private Set<UserScrumProject> userScrumProjects;

    @JsonIgnore
    @OneToMany(mappedBy = "supervisor")
    private Set<ProjectScrum> supervisor;

    public Users(String username, String email, String name, String surname, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
    }
}
