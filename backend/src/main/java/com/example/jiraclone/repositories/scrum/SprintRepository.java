package com.example.jiraclone.repositories.scrum;

import com.example.jiraclone.entities.scrum.Sprint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SprintRepository extends JpaRepository<Sprint, Long> {
}
