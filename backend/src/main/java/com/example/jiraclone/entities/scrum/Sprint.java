package com.example.jiraclone.entities.scrum;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Sprint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String sprint_name;
    private String start_date;
    private String end_date;
    private String scrum_project_id;
}
