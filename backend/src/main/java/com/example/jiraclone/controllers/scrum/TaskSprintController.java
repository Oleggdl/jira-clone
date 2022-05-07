package com.example.jiraclone.controllers.scrum;

import com.example.jiraclone.entities.scrum.TaskSprint;
import com.example.jiraclone.services.TaskSprintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("jira-clone/scrum")
public class TaskSprintController {

    @Autowired
    private TaskSprintService sprintService;

    @GetMapping("/taskSprint")
    public List<TaskSprint> getAllTaskSprint() {
        return sprintService.getAllTaskSprint();
    }

    @GetMapping("/taskSprint/{sprintId}")
    public List<TaskSprint> getTaskSprints(@PathVariable Long sprintId) {
        return sprintService.getTaskSprints(sprintId);
    }

    @GetMapping("/taskSprint/forProject/{projectId}")
    public List<TaskSprint> getTaskSprintsForProject(@PathVariable Long projectId) {
        return sprintService.getTaskSprintsForProject(projectId);
    }

    @GetMapping("/taskSprint/search/{sprintId}")
    public List<TaskSprint> searchTasksInBacklog(HttpServletRequest request, @PathVariable Long sprintId) {
        return sprintService.searchTasksInBacklog(request, sprintId);
    }

    @GetMapping("/taskSprint/{sprintId}/{columnId}")
    public List<TaskSprint> getTaskSprintsColumn(@PathVariable Long sprintId,
                                                 @PathVariable Long columnId) {
        return sprintService.getTaskSprintsColumn(sprintId, columnId);
    }

    @PostMapping("/taskSprint")
    public TaskSprint createTaskSprint(@RequestBody TaskSprint taskSprint) {
        return sprintService.createTaskSprint(taskSprint);
    }

    @PutMapping("/taskSprint/{taskSprintId}/{sprintId}/{taskId}")
    public ResponseEntity<TaskSprint> updateTaskSprint(@PathVariable Long taskSprintId,
                                                       @PathVariable Long sprintId,
                                                       @PathVariable Long taskId) {
        return sprintService.updateTaskSprint(taskSprintId, sprintId, taskId);
    }

    @PutMapping("/taskSprint/{taskSprintId}/{columnId}")
    public ResponseEntity<TaskSprint> updateTaskSprintColumn(@PathVariable Long taskSprintId,
                                                             @PathVariable Long columnId) {
        return sprintService.updateTaskSprintColumn(taskSprintId, columnId);
    }

    @PutMapping("/taskSprint/indexInBoard/{taskSprintId}/{index}")
    public ResponseEntity<TaskSprint> changeIndexBoardTaskSprint(@PathVariable Long taskSprintId,
                                                             @PathVariable Long index) {
        return sprintService.changeIndexBoardTaskSprint(taskSprintId, index);
    }

    @PutMapping("/taskSprint/updateSprint/{taskSprintId}/{sprintId}")
    public ResponseEntity<TaskSprint> updateTaskSprintSprint(@PathVariable Long taskSprintId,
                                                             @PathVariable Long sprintId) {
        return sprintService.updateTaskSprintSprint(taskSprintId, sprintId);
    }

    @DeleteMapping("/taskSprint/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteTaskSprint(@PathVariable Long id) {
        return sprintService.deleteTaskSprint(id);
    }
}
