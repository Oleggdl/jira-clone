package com.example.jiraclone.controllers.scrum;

import com.example.jiraclone.entities.scrum.TaskScrum;
import com.example.jiraclone.repositories.UserRepository;
import com.example.jiraclone.repositories.scrum.ColumnScrumRepository;
import com.example.jiraclone.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("jira-clone/scrum")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    ColumnScrumRepository columnScrumRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/tasks")
    public List<TaskScrum> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/tasks/{id}")
    public ResponseEntity<TaskScrum> getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    @PostMapping("/tasks")
    public TaskScrum createTask(@RequestBody TaskScrum taskScrum) {
        return taskService.createTask(taskScrum);
    }

    @PutMapping("/tasks/{taskId}/{creatorId}/{executorId}")
    public ResponseEntity<TaskScrum> createTaskWithUsers(@PathVariable Long taskId,
                                                         @PathVariable Long creatorId,
                                                         @PathVariable Long executorId) {
        return taskService.createTaskWithUsers(taskId, creatorId, executorId);
    }

    @PutMapping("/tasks/{id}")
    public ResponseEntity<TaskScrum> updateTask(@PathVariable Long id, @RequestBody TaskScrum taskScrumDetails) {
        return taskService.updateTask(id, taskScrumDetails);
    }

    @PutMapping("/tasks/description/{id}")
    public ResponseEntity<TaskScrum> updateTaskDescription(@PathVariable Long id,
                                                           @RequestBody TaskScrum taskScrumDetails) {
        return taskService.updateTaskDescription(id, taskScrumDetails);
    }

    @PutMapping("/tasks/name/{id}")
    public ResponseEntity<TaskScrum> updateTaskName(@PathVariable Long id,
                                                    @RequestBody TaskScrum taskScrumDetails) {
        return taskService.updateTaskName(id, taskScrumDetails);
    }

    @DeleteMapping("/tasks/{id}/{userId}/{projectId}")
    public ResponseEntity<Map<String, Boolean>> deleteTask(@PathVariable Long id, @PathVariable Long userId,
                                                           @PathVariable Long projectId) {
        return taskService.deleteTask(id, userId, projectId);
    }
}
