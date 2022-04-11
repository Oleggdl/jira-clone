package com.example.jiraclone.repositories.scrum;

import com.example.jiraclone.entities.scrum.UserScrumProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserScrumProjectRepository extends JpaRepository<UserScrumProject, Long> {
}
