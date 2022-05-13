package com.example.jiraclone.controllers.scrum;

import com.example.jiraclone.entities.scrum.CommentScrum;
import com.example.jiraclone.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("jira-clone/scrum")
public class CommentScrumController {


    @Autowired
    private CommentService commentService;

    @GetMapping("/commentsScrum")
    public List<CommentScrum> getAllCommentsScrum() {
        return commentService.getAllCommentsScrum();
    }

    @GetMapping("/commentsScrum/task/{taskId}")
    public List<CommentScrum> getAllCommentsScrumUsers(@PathVariable Long taskId) {
        return commentService.getAllCommentsScrumUsers(taskId);
    }

    @PostMapping("/commentsScrum")
    public CommentScrum createCommentScrum(@RequestBody CommentScrum commentScrum) {
        return commentService.createCommentScrum(commentScrum);
    }

    @GetMapping("/commentsScrum/{id}")
    public ResponseEntity<CommentScrum> getCommentScrumById(@PathVariable Long id) {
        return commentService.getCommentScrumById(id);
    }

    @PutMapping("/commentsScrum/user/{commentId}/{userId}/{taskId}")
    public ResponseEntity<CommentScrum> putComment(@PathVariable Long commentId,
                                                   @PathVariable Long userId,
                                                   @PathVariable Long taskId) {
        return commentService.putComment(commentId, userId, taskId);
    }

    @PutMapping("/commentsScrum/{id}")
    public ResponseEntity<CommentScrum> updateCommentScrum(@PathVariable Long id,
                                                           @RequestBody CommentScrum commentScrumDetails) {
        return commentService.updateCommentScrum(id, commentScrumDetails);
    }

    @DeleteMapping("/commentsScrum/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteCommentScrum(@PathVariable Long id) {
        return commentService.deleteCommentScrum(id);
    }
}
