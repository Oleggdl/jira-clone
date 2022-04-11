package com.example.jiraclone.entities;

import com.example.jiraclone.entities.scrum.UserScrumProject;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole name;

    @JsonIgnore
    @OneToMany(mappedBy = "user_role")
    private Set<UserScrumProject> userScrumProjects;
}
