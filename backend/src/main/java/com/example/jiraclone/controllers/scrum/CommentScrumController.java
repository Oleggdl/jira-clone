package com.example.jiraclone.controllers.scrum;

import com.example.jiraclone.entities.scrum.CommentScrum;
import com.example.jiraclone.exceptions.ResourceNotFoundException;
import com.example.jiraclone.repositories.scrum.CommentScrumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("jira-clone/scrum")
public class CommentScrumController {


    @Autowired
    CommentScrumRepository commentScrumRepository;

    @GetMapping("/commentsScrum")
    public List<CommentScrum> getAllCommentsScrum() {
        return commentScrumRepository.findAll();
    }

    @PostMapping("/commentsScrum")
    public CommentScrum createCommentScrum(@RequestBody CommentScrum commentScrum) {
        return commentScrumRepository.save(commentScrum);
    }

    @GetMapping("/commentsScrum/{id}")
    public ResponseEntity<CommentScrum> getCommentScrumById(@PathVariable Long id) {

        CommentScrum commentScrum = commentScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CommentScrum not exist with id:" + id));

        return ResponseEntity.ok(commentScrum);
    }

    @PutMapping("/commentsScrum/{id}")
    public ResponseEntity<CommentScrum> updateCommentScrum(@PathVariable Long id,
                                                           @RequestBody CommentScrum commentScrumDetails) {

        CommentScrum commentScrum = commentScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CommentScrum not exist with id:" + id));

        commentScrum.setContent(commentScrumDetails.getContent());
        commentScrum.setCreate_date(commentScrumDetails.getCreate_date());
        commentScrum.setTask_scrum_id(commentScrumDetails.getTask_scrum_id());
        commentScrum.setUser_id(commentScrumDetails.getUser_id());

        CommentScrum updateCommentScrum = commentScrumRepository.save(commentScrum);

        return ResponseEntity.ok(updateCommentScrum);
    }

    @DeleteMapping("/commentsScrum/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteCommentScrum(@PathVariable Long id) {
        CommentScrum commentScrum = commentScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ColCommentScrum not exist with id:" + id));

        commentScrumRepository.delete(commentScrum);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
