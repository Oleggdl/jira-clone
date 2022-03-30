package com.example.jiraclone.repositories.scrum;

import com.example.jiraclone.entities.scrum.ProjectScrum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectScrumRepository extends JpaRepository<ProjectScrum, Long> {
}
