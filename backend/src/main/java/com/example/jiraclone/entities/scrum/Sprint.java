package com.example.jiraclone.entities.scrum;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
public class Sprint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String sprint_name;
    private String start_date;
    private String end_date;
    private Boolean is_started;

    @ManyToOne()
    @JoinColumn(name = "scrum_project_sprint", referencedColumnName = "id")
    private ProjectScrum scrum_project_sprint;

    @JsonIgnore
    @OneToMany(mappedBy = "sprint_column")
    private Set<ColumnScrum> columnScrums;

    @JsonIgnore
    @OneToMany(mappedBy = "sprint_task_sprint")
    private Set<TaskSprint> taskSprintsAndSprints;
}
