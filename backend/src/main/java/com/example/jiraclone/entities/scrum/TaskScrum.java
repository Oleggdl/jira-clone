package com.example.jiraclone.entities.scrum;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "tasks_scrum")
public class TaskScrum {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String task_name;
    private String create_date;
    private String task_description;
    private String creator_id;
    private String executor_id;
    private String sprint_id;
    private String state_id;

    public TaskScrum() {
    }

    public TaskScrum(long id, String task_name, String create_date, String task_description,
                     String creator_id, String executor_id, String sprint_id, String state_id) {
        this.id = id;
        this.task_name = task_name;
        this.create_date = create_date;
        this.task_description = task_description;
        this.creator_id = creator_id;
        this.executor_id = executor_id;
        this.sprint_id = sprint_id;
        this.state_id = state_id;
    }
}
