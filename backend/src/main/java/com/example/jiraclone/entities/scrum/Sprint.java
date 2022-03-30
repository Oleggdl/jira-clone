package com.example.jiraclone.entities.scrum;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "sprints")
public class Sprint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

//    @Column(name = "sprint_name")
    private String sprint_name;

//    @Column(name = "start_date")
    private String start_date;

//    @Column(name = "end_date")
    private String end_date;

//    @Column(name = "scrum_project_id")
    private String scrum_project_id;

    public Sprint() {
    }

    public Sprint(long id, String sprint_name, String start_date, String end_date, String scrum_project_id) {
        this.id = id;
        this.sprint_name = sprint_name;
        this.start_date = start_date;
        this.end_date = end_date;
        this.scrum_project_id = scrum_project_id;
    }
}
