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
//    private String supervisor;

    @JsonIgnore
    @OneToMany(mappedBy = "scrum_task_id")
    private Set<BacklogElement> backlogElement;

    @JsonIgnore
    @OneToMany(mappedBy = "scrum_project")
    private Set<UserScrumProject> userScrumProjects;

    public ProjectScrum() {
    }

    public ProjectScrum(long id, String project_name, String project_key, String project_type,
                        String project_description, Set<BacklogElement> backlogElement) {
        this.id = id;
        this.project_name = project_name;
        this.project_key = project_key;
        this.project_type = project_type;
        this.project_description = project_description;
        this.backlogElement = backlogElement;
    }
}
