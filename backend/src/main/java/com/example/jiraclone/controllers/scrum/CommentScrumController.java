package com.example.jiraclone.controllers.scrum;

import com.example.jiraclone.entities.scrum.CommentScrum;
import com.example.jiraclone.entities.scrum.TaskScrum;
import com.example.jiraclone.entities.scrum.UserScrumProject;
import com.example.jiraclone.exceptions.ResourceNotFoundException;
import com.example.jiraclone.repositories.scrum.CommentScrumRepository;
import com.example.jiraclone.repositories.scrum.TaskScrumRepository;
import com.example.jiraclone.repositories.scrum.UserScrumProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("jira-clone/scrum")
public class CommentScrumController {


    @Autowired
    CommentScrumRepository commentScrumRepository;

    @Autowired
    TaskScrumRepository taskScrumRepository;

    @Autowired
    UserScrumProjectRepository userScrumProjectRepository;

    @GetMapping("/commentsScrum")
    public List<CommentScrum> getAllCommentsScrum() {
        return commentScrumRepository.findAll();
    }

    @GetMapping("/commentsScrum/task/{taskId}")
    public List<CommentScrum> getAllCommentsScrumUsers(@PathVariable Long taskId) {

        TaskScrum taskScrum = taskScrumRepository.findById(taskId).get();
        List<CommentScrum> commentScrumsAll = commentScrumRepository.findAll();

        ArrayList<CommentScrum> commentScrumsNew = new ArrayList<>();

        for (int i = 0; i <= commentScrumsAll.size() - 1; i++) {

            if (commentScrumsAll.get(i).getTask_scrum_id() == taskScrum) {
                commentScrumsNew.add(commentScrumsAll.get(i));
            }
        }
        return commentScrumsNew;
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

    @PutMapping("/commentsScrum/user/{commentId}/{userId}/{taskId}")
    public ResponseEntity<CommentScrum> putComment(@PathVariable Long commentId,
                                                   @PathVariable Long userId,
                                                   @PathVariable Long taskId) {

        CommentScrum commentScrum = commentScrumRepository.findById(commentId).get();
        UserScrumProject userScrumProject = userScrumProjectRepository.findById(userId).get();
        TaskScrum taskScrum = taskScrumRepository.findById(taskId).get();

        commentScrum.setUser_id(userScrumProject);
        commentScrum.setTask_scrum_id(taskScrum);

        CommentScrum updatedCommentScrum = commentScrumRepository.save(commentScrum);

        return ResponseEntity.ok(updatedCommentScrum);
    }

    @PutMapping("/commentsScrum/{id}")
    public ResponseEntity<CommentScrum> updateCommentScrum(@PathVariable Long id,
                                                           @RequestBody CommentScrum commentScrumDetails) {

        CommentScrum commentScrum = commentScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CommentScrum not exist with id:" + id));

        commentScrum.setContent(commentScrumDetails.getContent());
        commentScrum.setIs_changed(commentScrumDetails.getIs_changed());

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
