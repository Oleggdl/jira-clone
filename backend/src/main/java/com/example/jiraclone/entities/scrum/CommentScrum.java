package com.example.jiraclone.entities.scrum;

import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class CommentScrum {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String content;
    private String create_date;
    private Boolean is_changed;

    @ManyToOne
    @JoinColumn(name = "task_scrum_id", referencedColumnName = "id")
    private TaskScrum task_scrum_id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserScrumProject user_id;
}
