package com.example.jiraclone.controllers.scrum;

import com.example.jiraclone.entities.scrum.BacklogElement;
import com.example.jiraclone.exceptions.ResourceNotFoundException;
import com.example.jiraclone.repositories.scrum.BacklogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("jira-clone/scrum")
public class BacklogElementController {

    @Autowired
    BacklogRepository backlogRepository;

    @GetMapping("/backlog")
    public List<BacklogElement> getAllBacklogElement() {
        return backlogRepository.findAll();
    }

    @PostMapping("/backlog")
    public BacklogElement createBacklogElement(@RequestBody BacklogElement backlogElement) {
        return backlogRepository.save(backlogElement);
    }

    @GetMapping("/backlog/{id}")
    public ResponseEntity<BacklogElement> getBacklogElementById(@PathVariable Long id) {

        BacklogElement backlogElement = backlogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("BacklogElement not exist with id:" + id));

        return ResponseEntity.ok(backlogElement);
    }

    @PutMapping("/backlog/{id}")
    public ResponseEntity<BacklogElement> updateBacklogElement(@PathVariable Long id,
                                                               @RequestBody BacklogElement backlogElementDetails) {

        BacklogElement backlogElement = backlogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("BacklogElement not exist with id:" + id));

        backlogElement.setScrum_project_id(backlogElementDetails.getScrum_project_id());
        backlogElement.setScrum_task_id(backlogElementDetails.getScrum_task_id());

        BacklogElement updateBacklogElement = backlogRepository.save(backlogElement);

        return ResponseEntity.ok(updateBacklogElement);
    }

    @DeleteMapping("/backlog/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteBacklogElement(@PathVariable Long id) {
        BacklogElement backlogElement = backlogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("BacklogElement not exist with id:" + id));

        backlogRepository.delete((backlogElement));
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
