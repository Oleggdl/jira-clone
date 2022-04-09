package com.example.jiraclone.entities.scrum;

import com.example.jiraclone.entities.Role;
import com.example.jiraclone.entities.Users;
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
public class UserScrumProject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne()
    @JoinColumn(name = "users", referencedColumnName = "id")
    private Users users;

    @ManyToOne
    @JoinColumn(name = "scrum_project", referencedColumnName = "id")
    private ProjectScrum scrum_project;

    @ManyToOne()
    @JoinColumn(name = "user_role", referencedColumnName = "id")
    private Role user_role;


    @JsonIgnore
    @OneToMany(mappedBy = "user_id")
    private Set<CommentScrum> commentScrums;

    @JsonIgnore
    @OneToMany(mappedBy = "creator_id")
    private Set<TaskScrum> taskScrumsForCreator;

    @JsonIgnore
    @OneToMany(mappedBy = "executor_id")
    private Set<TaskScrum> taskScrumsForExecutor;
}
