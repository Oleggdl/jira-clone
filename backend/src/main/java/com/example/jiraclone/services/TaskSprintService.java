package com.example.jiraclone.services;

import com.example.jiraclone.entities.scrum.*;
import com.example.jiraclone.exceptions.ResourceNotFoundException;
import com.example.jiraclone.repositories.scrum.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TaskSprintService {

    @Autowired
    TaskSprintRepository taskSprintRepository;

    @Autowired
    ProjectScrumRepository projectScrumRepository;

    @Autowired
    TaskScrumRepository taskScrumRepository;

    @Autowired
    SprintRepository sprintRepository;

    @Autowired
    ColumnScrumRepository columnScrumRepository;

    public List<TaskSprint> getAllTaskSprint() {
        return taskSprintRepository.findAll();
    }

    public List<TaskSprint> getTaskSprints(Long sprintId) {
        Sprint sprint = sprintRepository.findById(sprintId).get();
        List<TaskSprint> taskSprints = taskSprintRepository.findAll();
        ArrayList<TaskSprint> taskSprintsArray = new ArrayList<>();
        for (int i = 0; i <= taskSprints.size() - 1; i++) {
            if (taskSprints.get(i).getSprint_task_sprint() == sprint) {
                taskSprintsArray.add(taskSprints.get(i));
            }
        }
        return taskSprintsArray;
    }

    public List<TaskSprint> getTaskSprintsForProject(Long projectId) {

        List<Sprint> sprint = sprintRepository.findAll();
        ArrayList<Sprint> sprints = new ArrayList<>();
        ProjectScrum projectScrum = projectScrumRepository.findById(projectId).get();

        for (int i = 0; i <= sprint.size() - 1; i++) {
            if (sprint.get(i).getScrum_project_sprint() == projectScrum) {
                sprints.add(sprint.get(i));
            }
        }

        List<TaskSprint> taskSprints = taskSprintRepository.findAll();
        ArrayList<TaskSprint> taskSprintsArray = new ArrayList<>();

        for (int i = 0; i <= sprints.size() - 1; i++) {
            for (int j = 0; j <= taskSprints.size() - 1; j++) {
                if (taskSprints.get(j).getSprint_task_sprint() == sprints.get(i)) {
                    taskSprintsArray.add(taskSprints.get(j));
                }
            }
        }

        return taskSprintsArray;
    }

    public List<TaskSprint> searchTasksInBacklog(HttpServletRequest request, Long sprintId) {
        String taskName = request.getParameter("taskName");
        List<TaskSprint> taskSprints = taskSprintRepository.findAll();
        Sprint sprint = sprintRepository.findById(sprintId).get();
        ArrayList<TaskSprint> taskSprintsArray = new ArrayList<>();
        for (int i = 0; i <= taskSprints.size() - 1; i++) {
            if (taskSprints.get(i).getTask_scrum().getTask_name().toUpperCase().contains(taskName
                    .toUpperCase()) && taskSprints.get(i).getSprint_task_sprint() == sprint) {
                taskSprintsArray.add(taskSprints.get(i));
            }
        }
        return taskSprintsArray;
    }

    public List<TaskSprint> getTaskSprintsColumn(Long sprintId, Long columnId) {
        Sprint sprint = sprintRepository.findById(sprintId).get();
        ColumnScrum columnScrum = columnScrumRepository.findById(columnId).get();
        List<TaskSprint> taskSprints = taskSprintRepository.findAll();
        ArrayList<TaskSprint> taskSprintsArray = new ArrayList<>();
        for (int i = 0; i <= taskSprints.size() - 1; i++) {
            if (taskSprints.get(i).getSprint_task_sprint() == sprint
                    && taskSprints.get(i).getSprint_column() == columnScrum) {
                taskSprintsArray.add(taskSprints.get(i));
            }
        }
        return taskSprintsArray;
    }

    public TaskSprint createTaskSprint(TaskSprint taskSprint) {
        return taskSprintRepository.save(taskSprint);
    }

    public ResponseEntity<TaskSprint> updateTaskSprint(Long taskSprintId, Long sprintId, Long taskId) {
        TaskSprint taskSprint = taskSprintRepository.findById(taskSprintId).get();
        Sprint sprint = sprintRepository.findById(sprintId).get();
        TaskScrum taskScrum = taskScrumRepository.findById(taskId).get();
        taskSprint.setSprint_task_sprint(sprint);
        taskSprint.setTask_scrum(taskScrum);
        TaskSprint updatedTaskSprint = taskSprintRepository.save(taskSprint);
        return ResponseEntity.ok(updatedTaskSprint);
    }

    public ResponseEntity<TaskSprint> updateTaskSprintColumn(Long taskSprintId, Long columnId) {
        TaskSprint taskSprint = taskSprintRepository.findById(taskSprintId).get();
        ColumnScrum columnScrum = columnScrumRepository.findById(columnId).get();
        taskSprint.setSprint_column(columnScrum);
        TaskSprint updatedTaskSprint = taskSprintRepository.save(taskSprint);
        return ResponseEntity.ok(updatedTaskSprint);
    }

    public ResponseEntity<Map<String, Boolean>> deleteTaskSprint(Long id) {
        TaskSprint taskSprint = taskSprintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TaskSprint not exist with id:" + id));
        taskSprintRepository.delete((taskSprint));
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
