package com.example.jiraclone.services;

import com.example.jiraclone.entities.Users;
import com.example.jiraclone.entities.scrum.ProjectScrum;
import com.example.jiraclone.entities.scrum.TaskScrum;
import com.example.jiraclone.entities.scrum.UserScrumProject;
import com.example.jiraclone.exceptions.ResourceNotFoundException;
import com.example.jiraclone.repositories.UserRepository;
import com.example.jiraclone.repositories.scrum.ColumnScrumRepository;
import com.example.jiraclone.repositories.scrum.ProjectScrumRepository;
import com.example.jiraclone.repositories.scrum.TaskScrumRepository;
import com.example.jiraclone.repositories.scrum.UserScrumProjectRepository;
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

    @Autowired
    ProjectScrumRepository projectScrumRepository;

    @Autowired
    UserScrumProjectRepository userScrumProjectRepository;

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

    public ResponseEntity<Map<String, Boolean>> deleteTask(Long id, Long userId, Long projectId) {
        List<UserScrumProject> projectScrums = userScrumProjectRepository.findAll();
        Users user = userRepository.findById(userId).get();
        ProjectScrum projectScrum = projectScrumRepository.findById(projectId).get();
        TaskScrum taskScrum = taskScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not exist with id:" + id));

        Map<String, Boolean> response = new HashMap<>();

        for (int i = 0; i <= projectScrums.size() - 1; i++) {
            if ((projectScrums.get(i).getUsers() == taskScrum.getCreator_id()
                    && projectScrums.get(i).getUsers() == user)
                    || (projectScrums.get(i).getUsers() == user
                    && projectScrums.get(i).getUser_role().getId() == 1)
                    && projectScrums.get(i).getScrum_project() == projectScrum) {

                taskScrumRepository.delete((taskScrum));
                response.put("deleted", Boolean.TRUE);
                return ResponseEntity.ok(response);
            }
        }
        response.put("deleted", Boolean.FALSE);

        return ResponseEntity.ok(response);
    }
}
