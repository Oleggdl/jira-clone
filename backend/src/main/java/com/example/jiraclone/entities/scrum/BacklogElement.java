package com.example.jiraclone.entities.scrum;

import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class BacklogElement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "scrum_project_id", referencedColumnName = "id")
    private ProjectScrum scrum_project_id;

    @ManyToOne
    @JoinColumn(name = "scrum_task_id", referencedColumnName = "id")
    private TaskScrum scrum_task_id;
}
