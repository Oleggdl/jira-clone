package com.example.jiraclone.entities.scrum;

import com.example.jiraclone.entities.Users;
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

    private String task_name;
    private String create_date;
    private String task_description;

    @ManyToOne()
    @JoinColumn(name = "creator_id", referencedColumnName = "id")
    private Users creator_id;

    @ManyToOne()
    @JoinColumn(name = "executor_id", referencedColumnName = "id")
    private Users executor_id;

    @JsonIgnore
    @OneToMany(mappedBy = "scrum_task_id")
    private Set<BacklogElement> backlogElement;

    @JsonIgnore
    @OneToMany(mappedBy = "task_scrum_id")
    private Set<CommentScrum> commentScrums;

    @JsonIgnore
    @OneToMany(mappedBy = "task_scrum")
    private Set<TaskSprint> taskSprints;
}
