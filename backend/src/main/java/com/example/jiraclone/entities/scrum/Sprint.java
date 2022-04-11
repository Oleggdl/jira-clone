package com.example.jiraclone.entities.scrum;

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
public class Sprint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String sprint_name;
    private String start_date;
    private String end_date;
    private Boolean is_started;

    @ManyToOne
    @JoinColumn(name = "scrum_project_sprint", referencedColumnName = "id")
    private ProjectScrum scrum_project_sprint;

    @JsonIgnore
    @OneToMany(mappedBy = "sprint_column", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ColumnScrum> columnScrums;

    @JsonIgnore
    @OneToMany(mappedBy = "sprint_task_sprint", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<TaskSprint> taskSprintsAndSprints;
}
