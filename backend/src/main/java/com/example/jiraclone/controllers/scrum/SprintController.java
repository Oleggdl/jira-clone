package com.example.jiraclone.controllers.scrum;

import com.example.jiraclone.entities.scrum.Sprint;
import com.example.jiraclone.repositories.scrum.ProjectScrumRepository;
import com.example.jiraclone.services.SprintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("TaskManager/scrum")
public class SprintController {

    @Autowired
    private SprintService sprintService;

    @Autowired
    ProjectScrumRepository projectScrumRepository;

    @GetMapping("/sprints")
    public List<Sprint> getAllSprints() {
        return sprintService.getAllSprints();
    }

    @GetMapping("/sprints/project/{projectId}")
    public List<Sprint> getSprintsProject(@PathVariable Long projectId) {
        return sprintService.getSprintsProject(projectId);
    }

    @GetMapping("/sprints/startedSprint/{projectId}")
    public List<Sprint> getStartedSprint(@PathVariable Long projectId) {
        return sprintService.getStartedSprint(projectId);
    }

    @PostMapping("/sprints")
    public Sprint createSprint(@RequestBody Sprint sprint) {
        return sprintService.createSprint(sprint);
    }

    @GetMapping("/sprints/{id}")
    public ResponseEntity<Sprint> getSprintById(@PathVariable Long id) {
        return sprintService.getSprintById(id);
    }

    @PutMapping("/sprints/project/{sprintId}/{projectId}")
    public ResponseEntity<Sprint> putSprint(@PathVariable Long sprintId,
                                            @PathVariable Long projectId) {
        return sprintService.putSprint(sprintId, projectId);
    }

    @PutMapping("/sprints/{id}")
    public ResponseEntity<Sprint> updateSprint(@PathVariable Long id, @RequestBody Sprint sprintDetails) {
        return sprintService.updateSprint(id, sprintDetails);
    }

    @PutMapping("/sprints/settings/{id}")
    public ResponseEntity<Sprint> updateSprintSettings(@PathVariable Long id, @RequestBody Sprint sprintDetails) {
        return sprintService.updateSprintSettings(id, sprintDetails);
    }

    @DeleteMapping("/sprints/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteSprint(@PathVariable Long id) {
        return sprintService.deleteSprint(id);
    }
}
