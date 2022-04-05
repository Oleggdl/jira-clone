package com.example.jiraclone.controllers.scrum;

import com.example.jiraclone.entities.Users;
import com.example.jiraclone.entities.scrum.TaskScrum;
import com.example.jiraclone.entities.scrum.TaskSprint;
import com.example.jiraclone.entities.scrum.UserScrumProject;
import com.example.jiraclone.exceptions.ResourceNotFoundException;
import com.example.jiraclone.repositories.UserRepository;
import com.example.jiraclone.repositories.scrum.ColumnScrumRepository;
import com.example.jiraclone.repositories.scrum.TaskScrumRepository;
import com.example.jiraclone.repositories.scrum.UserScrumProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("jira-clone/scrum")
public class TaskController {

    @Autowired
    TaskScrumRepository taskScrumRepository;

    @Autowired
    ColumnScrumRepository columnScrumRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/tasks")
    public List<TaskScrum> getAllTasks() {
        return taskScrumRepository.findAll();
    }

    @GetMapping("/tasks/{id}")
    public ResponseEntity<TaskScrum> getTaskById(@PathVariable Long id) {

        TaskScrum taskScrum = taskScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not exist with id:" + id));

        return ResponseEntity.ok(taskScrum);
    }

    @PostMapping("/tasks")
    public TaskScrum createTask(@RequestBody TaskScrum taskScrum) {
        return taskScrumRepository.save(taskScrum);
    }

    @PutMapping("/tasks/{taskId}/{creatorId}/{executorId}")
    public ResponseEntity<TaskScrum> createTaskWithUsers(@PathVariable Long taskId,
                                                         @PathVariable Long creatorId,
                                                         @PathVariable Long executorId) {

        TaskScrum taskScrum = taskScrumRepository.findById(taskId).get();

        Users creator = userRepository.findById(creatorId).get();
        if (executorId != null) {
            Users executor = userRepository.findById(executorId).get();
            taskScrum.setExecutor_id(executor);
        }

        taskScrum.setCreator_id(creator);

        TaskScrum updatedTaskScrum = taskScrumRepository.save(taskScrum);
        return ResponseEntity.ok(updatedTaskScrum);

    }

    @PutMapping("/tasks/{id}")
    public ResponseEntity<TaskScrum> updateTask(@PathVariable Long id, @RequestBody TaskScrum taskScrumDetails) {

        TaskScrum taskScrum = taskScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not exist with id:" + id));

        taskScrum.setTask_name(taskScrumDetails.getTask_name());
        taskScrum.setCreate_date(taskScrumDetails.getCreate_date());
        taskScrum.setCreator_id(taskScrumDetails.getCreator_id());
        taskScrum.setTask_description(taskScrumDetails.getTask_description());
        taskScrum.setExecutor_id(taskScrumDetails.getExecutor_id());

        TaskScrum updateTaskScrum = taskScrumRepository.save(taskScrum);

        return ResponseEntity.ok(updateTaskScrum);
    }

    @PutMapping("/tasks/description/{id}")
    public ResponseEntity<TaskScrum> updateTaskDescription(@PathVariable Long id,
                                                           @RequestBody TaskScrum taskScrumDetails) {

        TaskScrum taskScrum = taskScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not exist with id:" + id));

        taskScrum.setTask_description(taskScrumDetails.getTask_description());

        TaskScrum updateTaskScrum = taskScrumRepository.save(taskScrum);

        return ResponseEntity.ok(updateTaskScrum);
    }

    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteTask(@PathVariable Long id) {
        TaskScrum taskScrum = taskScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not exist with id:" + id));

        taskScrumRepository.delete((taskScrum));
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
