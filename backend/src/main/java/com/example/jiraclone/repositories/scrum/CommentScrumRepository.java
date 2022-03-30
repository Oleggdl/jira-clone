package com.example.jiraclone.repositories.scrum;

import com.example.jiraclone.entities.scrum.CommentScrum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentScrumRepository extends JpaRepository<CommentScrum, Long> {
}
