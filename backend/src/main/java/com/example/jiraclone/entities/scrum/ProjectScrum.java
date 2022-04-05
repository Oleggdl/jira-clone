package com.example.jiraclone.entities.scrum;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
public class ProjectScrum {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String project_name;
    private String project_key;
    private String project_type;
    private String project_description;
    private Boolean is_favorite;

    @JsonIgnore
    @OneToMany(mappedBy = "scrum_task_id")
    private Set<BacklogElement> backlogElement;

    @JsonIgnore
    @OneToMany(mappedBy = "scrum_project")
    private Set<UserScrumProject> userScrumProjects;

    @JsonIgnore
    @OneToMany(mappedBy = "scrum_project_sprint")
    private Set<Sprint> sprints;
}
