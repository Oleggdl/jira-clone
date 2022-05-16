package com.example.jiraclone.entities.scrum;

import com.example.jiraclone.entities.Users;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class TaskScrum {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String task_name;
    private String create_date;
    private String task_description;//todo
    private String priority;

    @ManyToOne()
    @JoinColumn(name = "creator_id", referencedColumnName = "id")
    private Users creator_id;

    @ManyToOne()
    @JoinColumn(name = "executor_id", referencedColumnName = "id")
    private Users executor_id;

    @JsonIgnore
    @OneToMany(mappedBy = "scrum_task_id", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<BacklogElement> backlogElement;

    @JsonIgnore
    @OneToMany(mappedBy = "task_scrum_id", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CommentScrum> commentScrums;

    @JsonIgnore
    @OneToMany(mappedBy = "task_scrum", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<TaskSprint> taskSprints;

    @JsonIgnore
    @OneToMany(mappedBy = "task_scrum_marks", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<MarksScrum> marksScrums;
}
