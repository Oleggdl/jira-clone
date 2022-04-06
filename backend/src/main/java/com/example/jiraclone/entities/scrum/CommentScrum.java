package com.example.jiraclone.entities.scrum;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class CommentScrum {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String content;
    private String create_date;
    private Boolean is_changed;

    @ManyToOne()
    @JoinColumn(name = "task_scrum_id", referencedColumnName = "id")
    private TaskScrum task_scrum_id;

    @ManyToOne()
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserScrumProject user_id;
}
