package com.example.jiraclone.services;

import com.example.jiraclone.entities.scrum.BacklogElement;
import com.example.jiraclone.entities.scrum.ProjectScrum;
import com.example.jiraclone.entities.scrum.TaskScrum;
import com.example.jiraclone.exceptions.ResourceNotFoundException;
import com.example.jiraclone.repositories.scrum.BacklogRepository;
import com.example.jiraclone.repositories.scrum.ProjectScrumRepository;
import com.example.jiraclone.repositories.scrum.TaskScrumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BacklogElementService {

    @Autowired
    BacklogRepository backlogRepository;

    @Autowired
    TaskScrumRepository taskScrumRepository;

    @Autowired
    ProjectScrumRepository projectScrumRepository;

    public List<BacklogElement> getAllBacklogElement() {
        return backlogRepository.findAll();
    }

    public List<BacklogElement> getBacklogElements(Long projectId) {
        ProjectScrum projectScrum = projectScrumRepository.findById(projectId).get();
        List<BacklogElement> backlogElements = backlogRepository.findAll();
        ArrayList<BacklogElement> backlogProjectElements = new ArrayList<>();
        for (int i = 0; i <= backlogElements.size() - 1; i++) {
            if (backlogElements.get(i).getScrum_project_id() == projectScrum) {
                backlogProjectElements.add(backlogElements.get(i));
            }
        }
        return backlogProjectElements;
    }

    public List<BacklogElement> searchTasksInBacklog(HttpServletRequest request, Long projectId) {

        String taskName = request.getParameter("taskName");
        List<BacklogElement> backlogElements = backlogRepository.findAll();
        ProjectScrum projectScrum = projectScrumRepository.findById(projectId).get();
        ArrayList<BacklogElement> backlogElementsArray = new ArrayList<>();
        for (int i = 0; i <= backlogElements.size() - 1; i++) {
            if (backlogElements.get(i).getScrum_task_id().getTask_name().toUpperCase().contains(taskName
                    .toUpperCase()) && backlogElements.get(i).getScrum_project_id() == projectScrum) {
                backlogElementsArray.add(backlogElements.get(i));
            }
        }
        return backlogElementsArray;
    }

    public BacklogElement createBacklogElement(BacklogElement backlogElement) {
        return backlogRepository.save(backlogElement);
    }

    public ResponseEntity<BacklogElement> getBacklogElementById(Long id) {
        BacklogElement backlogElement = backlogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("BacklogElement not exist with id:" + id));
        return ResponseEntity.ok(backlogElement);
    }

    public ResponseEntity<BacklogElement> uniteBacklogAndTask(Long taskId, Long backlogId, Long projectId) {
        BacklogElement backlogElement = backlogRepository.findById(backlogId).get();
        TaskScrum taskScrum = taskScrumRepository.findById(taskId).get();
        ProjectScrum projectScrum = projectScrumRepository.findById(projectId).get();
        backlogElement.setScrum_task_id(taskScrum);
        backlogElement.setScrum_project_id(projectScrum);
        BacklogElement updateBacklogElement = backlogRepository.save(backlogElement);
        return ResponseEntity.ok(updateBacklogElement);
    }

    public ResponseEntity<Map<String, Boolean>> deleteBacklogElement(Long id) {
        BacklogElement backlogElement = backlogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("BacklogElement not exist with id:" + id));
        backlogRepository.delete((backlogElement));
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
