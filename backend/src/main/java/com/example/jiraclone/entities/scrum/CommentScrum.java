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
    private String task_scrum_id;
    private String user_id;

    public CommentScrum() {
    }

    public CommentScrum(long id, String content, String create_date, String task_scrum_id, String user_id) {
        this.id = id;
        this.content = content;
        this.create_date = create_date;
        this.task_scrum_id = task_scrum_id;
        this.user_id = user_id;
    }
}
