package com.example.jiraclone.repositories.scrum;

import com.example.jiraclone.entities.scrum.TaskScrum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskScrumRepository extends JpaRepository<TaskScrum, Long> {
}
