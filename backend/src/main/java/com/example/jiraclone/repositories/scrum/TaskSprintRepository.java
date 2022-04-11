package com.example.jiraclone.repositories.scrum;


import com.example.jiraclone.entities.scrum.TaskSprint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskSprintRepository extends JpaRepository<TaskSprint, Long> {
}
