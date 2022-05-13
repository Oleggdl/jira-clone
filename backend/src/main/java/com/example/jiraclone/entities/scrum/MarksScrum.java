package com.example.jiraclone.entities.scrum;

import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class MarksScrum {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String mark_text;
    private String mark_color;

    @ManyToOne
    @JoinColumn(name = "task_scrum_marks", referencedColumnName = "id")
    private TaskScrum task_scrum_marks;

}
