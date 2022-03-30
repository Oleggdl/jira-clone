package com.example.jiraclone.controllers.scrum;

import com.example.jiraclone.entities.scrum.Sprint;
import com.example.jiraclone.exceptions.ResourceNotFoundException;
import com.example.jiraclone.repositories.scrum.SprintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("jira-clone/scrum")
public class SprintController {

    @Autowired
    SprintRepository sprintRepository;

    @GetMapping("/sprints")
    public List<Sprint> getAllSprints() {
        return sprintRepository.findAll();
    }

    @PostMapping("/sprints")
    public Sprint createSprint(@RequestBody Sprint sprint) {
        return sprintRepository.save(sprint);
    }

    @GetMapping("/sprints/{id}")
    public ResponseEntity<Sprint> getSprintById(@PathVariable Long id) {

        Sprint sprint = sprintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sprint not exist with id:" + id));

        return ResponseEntity.ok(sprint);
    }

    @PutMapping("/sprints/{id}")
    public ResponseEntity<Sprint> updateSprint(@PathVariable Long id, @RequestBody Sprint sprintDetails) {

        Sprint sprint = sprintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sprint not exist with id:" + id));

        sprint.setSprint_name(sprintDetails.getSprint_name());
        sprint.setStart_date(sprintDetails.getStart_date());
        sprint.setEnd_date(sprintDetails.getEnd_date());
        sprint.setScrum_project_id(sprintDetails.getScrum_project_id());

        Sprint updateSprint = sprintRepository.save(sprint);

        return ResponseEntity.ok(updateSprint);
    }

    @DeleteMapping("/sprints/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteSprint(@PathVariable Long id) {
        Sprint sprint = sprintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sprint not exist with id:" + id));

        sprintRepository.delete((sprint));
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
