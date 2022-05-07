package com.example.jiraclone.entities.scrum;

import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class TaskSprint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private Long index;

    @ManyToOne
    @JoinColumn(name = "task_scrum", referencedColumnName = "id")
    private TaskScrum task_scrum;

    @ManyToOne
    @JoinColumn(name = "sprint_task_sprint", referencedColumnName = "id")
    private Sprint sprint_task_sprint;

    @ManyToOne
    @JoinColumn(name = "sprint_column", referencedColumnName = "id")
    private ColumnScrum sprint_column;
}
