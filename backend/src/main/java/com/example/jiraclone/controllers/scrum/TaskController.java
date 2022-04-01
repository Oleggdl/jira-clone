package com.example.jiraclone.controllers.scrum;

import com.example.jiraclone.entities.scrum.BacklogElement;
import com.example.jiraclone.entities.scrum.TaskScrum;
import com.example.jiraclone.exceptions.ResourceNotFoundException;
import com.example.jiraclone.repositories.scrum.TaskScrumRepository;
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

    @GetMapping("/tasks")
    public List<TaskScrum> getAllTasks() {
        return taskScrumRepository.findAll();
    }

    @PostMapping("/tasks")
    public TaskScrum createTask(@RequestBody TaskScrum taskScrum) {
        return taskScrumRepository.save(taskScrum);
    }

    @GetMapping("/tasks/{id}")
    public ResponseEntity<TaskScrum> getTaskById(@PathVariable Long id) {

        TaskScrum taskScrum = taskScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not exist with id:" + id));

        return ResponseEntity.ok(taskScrum);
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
        taskScrum.setSprint_id(taskScrumDetails.getSprint_id());
        taskScrum.setState_id(taskScrumDetails.getState_id());

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
