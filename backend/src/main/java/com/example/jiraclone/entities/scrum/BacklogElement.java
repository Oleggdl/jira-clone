package com.example.jiraclone.entities.scrum;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "backlog")
public class BacklogElement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private Long scrum_project_id;
    private Long scrum_task_id;

    public BacklogElement() {
    }

    public BacklogElement(long id, Long scrum_project_id, Long scrum_task_id) {
        this.id = id;
        this.scrum_project_id = scrum_project_id;
        this.scrum_task_id = scrum_task_id;
    }
}
