package com.example.jiraclone.entities.scrum;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class TaskSprint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "task_scrum", referencedColumnName = "id")
    private TaskScrum task_scrum;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "sprint_task_sprint", referencedColumnName = "id")
    private Sprint sprint_task_sprint;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "sprint_column", referencedColumnName = "id")
    private ColumnScrum sprint_column;
}
