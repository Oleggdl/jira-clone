package com.example.jiraclone.controllers.scrum;

import com.example.jiraclone.entities.scrum.BacklogElement;
import com.example.jiraclone.services.BacklogElementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("TaskManager/scrum")
public class BacklogElementController {

    @Autowired
    private BacklogElementService backlogElementService;

    @GetMapping("/backlog")
    public List<BacklogElement> getAllBacklogElement() {
        return backlogElementService.getAllBacklogElement();
    }

    @GetMapping("/backlog/tasks/{projectId}")
    public List<BacklogElement> getBacklogElements(@PathVariable Long projectId) {
        return backlogElementService.getBacklogElements(projectId);
    }

    @GetMapping("/backlog/search/{projectId}")
    public List<BacklogElement> searchTasksInBacklog(HttpServletRequest request, @PathVariable Long projectId) {
        return backlogElementService.searchTasksInBacklog(request, projectId);
    }

    @PostMapping("/backlog")
    public BacklogElement createBacklogElement(@RequestBody BacklogElement backlogElement) {
        return backlogElementService.createBacklogElement(backlogElement);
    }

    @GetMapping("/backlog/{id}")
    public ResponseEntity<BacklogElement> getBacklogElementById(@PathVariable Long id) {
        return backlogElementService.getBacklogElementById(id);
    }

    @PutMapping("/backlog/{backlogId}/{taskId}/{projectId}")
    public ResponseEntity<BacklogElement> uniteBacklogAndTask(@PathVariable Long taskId,
                                                              @PathVariable Long backlogId,
                                                              @PathVariable Long projectId) {

        return backlogElementService.uniteBacklogAndTask(taskId, backlogId, projectId);
    }

    @PutMapping("/backlog/completedTasks/{id}")
    public ResponseEntity<BacklogElement> updateCompletedTasks(@PathVariable Long id,
                                                               @RequestBody BacklogElement backlogElement) {

        return backlogElementService.updateCompletedTasks(id, backlogElement);
    }

    @DeleteMapping("/backlog/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteBacklogElement(@PathVariable Long id) {
        return backlogElementService.deleteBacklogElement(id);
    }

    @GetMapping("/backlog/completed-tasks/{projectId}")
    public List<BacklogElement> getCompletedBacklogElements(@PathVariable Long projectId) {
        return backlogElementService.getCompletedBacklogElements(projectId);
    }
}
