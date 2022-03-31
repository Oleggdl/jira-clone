package com.example.jiraclone.repositories.scrum;

import com.example.jiraclone.entities.scrum.BacklogElement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BacklogRepository extends JpaRepository<BacklogElement, Long> {
}
