package com.example.jiraclone.repositories.scrum;

import com.example.jiraclone.entities.scrum.ColumnScrum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ColumnScrumRepository extends JpaRepository<ColumnScrum, Long> {
}
