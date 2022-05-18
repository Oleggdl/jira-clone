package com.example.jiraclone.services;

import com.example.jiraclone.entities.scrum.ProjectScrum;
import com.example.jiraclone.entities.scrum.Sprint;
import com.example.jiraclone.exceptions.ResourceNotFoundException;
import com.example.jiraclone.repositories.scrum.ProjectScrumRepository;
import com.example.jiraclone.repositories.scrum.SprintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SprintService {

    @Autowired
    SprintRepository sprintRepository;

    @Autowired
    ProjectScrumRepository projectScrumRepository;

    public List<Sprint> getAllSprints() {
        return sprintRepository.findAll();
    }

    public List<Sprint> getSprintsProject(Long projectId) {
        ProjectScrum projectScrum = projectScrumRepository.findById(projectId).get();
        List<Sprint> sprints = sprintRepository.findAll();
        ArrayList<Sprint> sprintsArray = new ArrayList<>();
        for (int i = 0; i <= sprints.size() - 1; i++) {
            if (sprints.get(i).getScrum_project_sprint() == projectScrum) {
                sprintsArray.add(sprints.get(i));
            }
        }
        return sprintsArray;
    }

    public List<Sprint> getStartedSprint(Long projectId) {
        ProjectScrum projectScrum = projectScrumRepository.findById(projectId).get();
        List<Sprint> sprints = sprintRepository.findAll();
        ArrayList<Sprint> sprintsArray = new ArrayList<>();
        for (int i = 0; i <= sprints.size() - 1; i++) {
            if ((sprints.get(i).getScrum_project_sprint() == projectScrum) && sprints.get(i).getIs_started() == true) {
                sprintsArray.add(sprints.get(i));
            }
        }
        return sprintsArray;
    }

    public Sprint createSprint(Sprint sprint) {
        return sprintRepository.save(sprint);
    }

    public ResponseEntity<Sprint> getSprintById(Long id) {
        Sprint sprint = sprintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sprint not exist with id:" + id));
        return ResponseEntity.ok(sprint);
    }

    public ResponseEntity<Sprint> putSprint(Long sprintId, Long projectId) {
        Sprint sprint = sprintRepository.findById(sprintId).get();
        ProjectScrum projectScrum = projectScrumRepository.findById(projectId).get();
        sprint.setScrum_project_sprint(projectScrum);
        Sprint updatedSprint = sprintRepository.save(sprint);
        return ResponseEntity.ok(updatedSprint);
    }

    public ResponseEntity<Sprint> updateSprint(Long id, Sprint sprintDetails) {
        Sprint sprint = sprintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sprint not exist with id:" + id));
        sprint.setSprint_name(sprintDetails.getSprint_name());
        sprint.setStart_date(sprintDetails.getStart_date());
        sprint.setEnd_date(sprintDetails.getEnd_date());
        sprint.setIs_started(sprintDetails.getIs_started());
        Sprint updateSprint = sprintRepository.save(sprint);
        return ResponseEntity.ok(updateSprint);
    }

    public ResponseEntity<Sprint> updateSprintSettings(Long id, Sprint sprintDetails) {
        Sprint sprint = sprintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sprint not exist with id:" + id));
        sprint.setSprint_name(sprintDetails.getSprint_name());
        sprint.setStart_date(sprintDetails.getStart_date());
        sprint.setEnd_date(sprintDetails.getEnd_date());
        Sprint updateSprint = sprintRepository.save(sprint);
        return ResponseEntity.ok(updateSprint);
    }

    public ResponseEntity<Map<String, Boolean>> deleteSprint(Long id) {
        Sprint sprint = sprintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sprint not exist with id:" + id));

        sprintRepository.delete((sprint));
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
