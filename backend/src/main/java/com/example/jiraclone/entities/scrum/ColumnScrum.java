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

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "sprint_column", referencedColumnName = "id")
    private Sprint sprint_column;

    @JsonIgnore
    @OneToMany(mappedBy = "sprint_column")
    private Set<TaskSprint> taskSprints;
}
