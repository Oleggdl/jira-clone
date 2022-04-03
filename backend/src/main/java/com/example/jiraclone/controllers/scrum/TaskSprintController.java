package com.example.jiraclone.controllers.scrum;

import com.example.jiraclone.entities.scrum.ColumnScrum;
import com.example.jiraclone.entities.scrum.Sprint;
import com.example.jiraclone.entities.scrum.TaskScrum;
import com.example.jiraclone.entities.scrum.TaskSprint;
import com.example.jiraclone.repositories.scrum.ColumnScrumRepository;
import com.example.jiraclone.repositories.scrum.SprintRepository;
import com.example.jiraclone.repositories.scrum.TaskScrumRepository;
import com.example.jiraclone.repositories.scrum.TaskSprintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("jira-clone/scrum")
public class TaskSprintController {

    @Autowired
    TaskSprintRepository taskSprintRepository;

    @Autowired
    TaskScrumRepository taskScrumRepository;

    @Autowired
    SprintRepository sprintRepository;

    @Autowired
    ColumnScrumRepository columnScrumRepository;

    @GetMapping("/taskSprint")
    public List<TaskSprint> getAllTaskSprint() {
        return taskSprintRepository.findAll();
    }

    @GetMapping("/taskSprint/{sprintId}")
    public List<TaskSprint> getTaskSprints(@PathVariable Long sprintId) {

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

    @GetMapping("/taskSprint/{sprintId}/{columnId}")
    public List<TaskSprint> getTaskSprintsColumn(@PathVariable Long sprintId,
                                                 @PathVariable Long columnId) {

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

    @PostMapping("/taskSprint")
    public TaskSprint createTaskSprint(@RequestBody TaskSprint taskSprint) {
        return taskSprintRepository.save(taskSprint);
    }

    @PutMapping("/taskSprint/{taskSprintId}/{sprintId}/{taskId}")
    public ResponseEntity<TaskSprint> updateTaskSprint(@PathVariable Long taskSprintId,
                                                       @PathVariable Long sprintId,
                                                       @PathVariable Long taskId) {

        TaskSprint taskSprint = taskSprintRepository.findById(taskSprintId).get();
        Sprint sprint = sprintRepository.findById(sprintId).get();
        TaskScrum taskScrum = taskScrumRepository.findById(taskId).get();

        taskSprint.setSprint_task_sprint(sprint);
        taskSprint.setTask_scrum(taskScrum);

        TaskSprint updatedTaskSprint = taskSprintRepository.save(taskSprint);
        return ResponseEntity.ok(updatedTaskSprint);
    }

    @PutMapping("/taskSprint/{taskSprintId}/{columnId}")
    public ResponseEntity<TaskSprint> updateTaskSprintColumn(@PathVariable Long taskSprintId,
                                                             @PathVariable Long columnId) {

        TaskSprint taskSprint = taskSprintRepository.findById(taskSprintId).get();
        ColumnScrum columnScrum = columnScrumRepository.findById(columnId).get();

        taskSprint.setSprint_column(columnScrum);

        TaskSprint updatedTaskSprint = taskSprintRepository.save(taskSprint);
        return ResponseEntity.ok(updatedTaskSprint);
    }
}