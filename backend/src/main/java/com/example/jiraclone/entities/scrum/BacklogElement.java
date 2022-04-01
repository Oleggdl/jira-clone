package com.example.jiraclone.entities.scrum;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class BacklogElement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "scrum_project_id", referencedColumnName = "id")
    private ProjectScrum scrum_project_id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "scrum_task_id", referencedColumnName = "id")
    private TaskScrum scrum_task_id;

    public BacklogElement() {
    }

    public BacklogElement(long id, ProjectScrum scrum_project_id, TaskScrum scrum_task_id) {
        this.id = id;
        this.scrum_project_id = scrum_project_id;
        this.scrum_task_id = scrum_task_id;
    }
}
