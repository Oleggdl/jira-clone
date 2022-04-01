package com.example.jiraclone.entities.scrum;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
public class TaskScrum {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonIgnore
    @OneToMany(mappedBy = "scrum_task_id")
    private Set<BacklogElement> backlogElement;

    private String task_name;
    private String create_date;
    private String task_description;
    private Long creator_id;
    private Long executor_id;
    private Long sprint_id;
    private Long state_id;



    public TaskScrum() {
    }

    public TaskScrum(long id, String task_name, String create_date, String task_description, Long creator_id,
                     Long executor_id, Long sprint_id, Long state_id, Set<BacklogElement> backlogElement) {
        this.id = id;
        this.task_name = task_name;
        this.create_date = create_date;
        this.task_description = task_description;
        this.creator_id = creator_id;
        this.executor_id = executor_id;
        this.sprint_id = sprint_id;
        this.state_id = state_id;
        this.backlogElement = backlogElement;
    }
}
