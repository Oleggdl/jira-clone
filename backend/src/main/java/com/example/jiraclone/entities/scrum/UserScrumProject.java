package com.example.jiraclone.entities.scrum;

import com.example.jiraclone.entities.Role;
import com.example.jiraclone.entities.Users;
import lombok.Data;

import javax.persistence.*;

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

    public UserScrumProject() {
    }

    public UserScrumProject(long id, ProjectScrum scrum_project, Role user_role) {
        this.id = id;
//        this.user = user;
        this.scrum_project = scrum_project;
        this.user_role = user_role;
    }
}
