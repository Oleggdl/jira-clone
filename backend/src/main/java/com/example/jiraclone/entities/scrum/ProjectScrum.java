package com.example.jiraclone.entities.scrum;


import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "scrum_project")
public class ProjectScrum {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String project_name;
    private String project_key;
    private String project_type;
    private String project_description;
//    private String supervisor;

    public ProjectScrum() {
    }

    public ProjectScrum(long id, String project_name, String project_key, String project_type,
                        String project_description) {
        this.id = id;
        this.project_name = project_name;
        this.project_key = project_key;
        this.project_type = project_type;
        this.project_description = project_description;
//        this.supervisor = supervisor;
    }
}
