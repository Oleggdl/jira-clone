package com.example.jiraclone.services;

import com.example.jiraclone.entities.Users;
import com.example.jiraclone.entities.scrum.TaskScrum;
import com.example.jiraclone.exceptions.ResourceNotFoundException;
import com.example.jiraclone.repositories.UserRepository;
import com.example.jiraclone.repositories.scrum.ColumnScrumRepository;
import com.example.jiraclone.repositories.scrum.TaskScrumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TaskService {

    @Autowired
    TaskScrumRepository taskScrumRepository;

    @Autowired
    ColumnScrumRepository columnScrumRepository;

    @Autowired
    UserRepository userRepository;

    public List<TaskScrum> getAllTasks() {
        return taskScrumRepository.findAll();
    }

    public ResponseEntity<TaskScrum> getTaskById(Long id) {
        TaskScrum taskScrum = taskScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not exist with id:" + id));
        return ResponseEntity.ok(taskScrum);
    }

    public TaskScrum createTask(TaskScrum taskScrum) {
        return taskScrumRepository.save(taskScrum);
    }

    public ResponseEntity<TaskScrum> createTaskWithUsers(Long taskId, Long creatorId, Long executorId) {
        TaskScrum taskScrum = taskScrumRepository.findById(taskId).get();
        Users creator = userRepository.findById(creatorId).get();
        Users executor = userRepository.findById(executorId).get();
        taskScrum.setExecutor_id(executor);
        taskScrum.setCreator_id(creator);
        TaskScrum updatedTaskScrum = taskScrumRepository.save(taskScrum);
        return ResponseEntity.ok(updatedTaskScrum);

    }

    public ResponseEntity<TaskScrum> updateTask(Long id, TaskScrum taskScrumDetails) {
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

    public ResponseEntity<TaskScrum> updateTaskDescription(Long id, TaskScrum taskScrumDetails) {
        TaskScrum taskScrum = taskScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not exist with id:" + id));
        taskScrum.setTask_description(taskScrumDetails.getTask_description());
        TaskScrum updateTaskScrum = taskScrumRepository.save(taskScrum);
        return ResponseEntity.ok(updateTaskScrum);
    }

    public ResponseEntity<TaskScrum> updateTaskName(Long id, TaskScrum taskScrumDetails) {
        TaskScrum taskScrum = taskScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not exist with id:" + id));
        taskScrum.setTask_name(taskScrumDetails.getTask_name());
        TaskScrum updateTaskScrum = taskScrumRepository.save(taskScrum);
        return ResponseEntity.ok(updateTaskScrum);
    }

    public ResponseEntity<Map<String, Boolean>> deleteTask(Long id) {
        TaskScrum taskScrum = taskScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not exist with id:" + id));
        taskScrumRepository.delete((taskScrum));
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
