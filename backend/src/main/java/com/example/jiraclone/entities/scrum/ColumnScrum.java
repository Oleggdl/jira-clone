package com.example.jiraclone.entities.scrum;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.Set;


@Data
@Entity
public class ColumnScrum {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String column_name;

    @JsonIgnore
    @OneToMany(mappedBy = "state_id")
    private Set<TaskScrum> taskScrums;
}
