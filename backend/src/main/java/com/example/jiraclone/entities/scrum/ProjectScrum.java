package com.example.jiraclone.entities.scrum;


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
public class ProjectScrum {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String project_name;
    private String project_key;
    private String project_description;
    private Boolean is_favorite;

    @ManyToOne()
    @JoinColumn(name = "supervisor", referencedColumnName = "id")
    private Users supervisor;

    @JsonIgnore
    @OneToMany(mappedBy = "scrum_project_id", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<BacklogElement> backlogElement;

    @JsonIgnore
    @OneToMany(mappedBy = "scrum_project", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserScrumProject> userScrumProjects;

    @JsonIgnore
    @OneToMany(mappedBy = "scrum_project_sprint", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Sprint> sprints;
}
