package com.example.jiraclone.controllers.scrum;

import com.example.jiraclone.entities.scrum.ProjectScrum;
import com.example.jiraclone.exceptions.ResourceNotFoundException;
import com.example.jiraclone.repositories.scrum.ProjectScrumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("jira-clone/scrum")
public class ProjectController {

    @Autowired
    ProjectScrumRepository projectScrumRepository;

    @GetMapping("/projects")
    public List<ProjectScrum> getAllProjects() {
        return projectScrumRepository.findAll();
    }

    @PostMapping("/projects")
    public ProjectScrum createProject(@RequestBody ProjectScrum projectScrum) {
        return projectScrumRepository.save(projectScrum);
    }

    @GetMapping("/projects/{id}")
    public ResponseEntity<ProjectScrum> getProjectById(@PathVariable Long id) {

        ProjectScrum projectScrum = projectScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not exist with id:" + id));

        return ResponseEntity.ok(projectScrum);
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<ProjectScrum> updateProject(@PathVariable Long id,
                                                      @RequestBody ProjectScrum projectScrumDetails) {

        ProjectScrum projectScrum = projectScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not exist with id:" + id));

        projectScrum.setProject_name(projectScrumDetails.getProject_name());
        projectScrum.setProject_key(projectScrumDetails.getProject_key());
        projectScrum.setProject_type(projectScrumDetails.getProject_type());
        projectScrum.setProject_description(projectScrumDetails.getProject_description());

        ProjectScrum updateProjectScrum = projectScrumRepository.save(projectScrum);

        return ResponseEntity.ok(updateProjectScrum);
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteProject(@PathVariable Long id) {
        ProjectScrum projectScrum = projectScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not exist with id:" + id));

        projectScrumRepository.delete((projectScrum));
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
