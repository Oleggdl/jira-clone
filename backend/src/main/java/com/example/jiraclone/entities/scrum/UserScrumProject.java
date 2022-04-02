package com.example.jiraclone.entities.scrum;

import com.example.jiraclone.entities.Role;
import com.example.jiraclone.entities.Users;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
public class UserScrumProject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "users", referencedColumnName = "id")
    private Users users;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "scrum_project", referencedColumnName = "id")
    private ProjectScrum scrum_project;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_role", referencedColumnName = "id")
    private Role user_role;


    @JsonIgnore
    @OneToMany(mappedBy = "user_id")
    private Set<CommentScrum> commentScrums;
}
