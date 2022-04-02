package com.example.jiraclone.entities.scrum;

import lombok.Data;

import javax.persistence.*;


@Data
@Entity
public class ColumnScrum {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String column_name;

    public ColumnScrum() {
    }

    public ColumnScrum(long id, String column_name) {
        this.id = id;
        this.column_name = column_name;
    }
}
