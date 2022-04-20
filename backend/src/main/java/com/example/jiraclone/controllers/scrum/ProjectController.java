package com.example.jiraclone.controllers.scrum;

import com.example.jiraclone.entities.scrum.ProjectScrum;
import com.example.jiraclone.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("jira-clone/scrum")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping("/projects")
    public List<ProjectScrum> getAllProjects() {
        return projectService.getAllProjects();
    }

    @PostMapping("/projects")
    public ProjectScrum createProject(@RequestBody ProjectScrum projectScrum) {
        return projectService.createProject(projectScrum);
    }

    @GetMapping("/projects/{id}")
    public ResponseEntity<ProjectScrum> getProjectById(@PathVariable Long id) {
        return projectService.getProjectById(id);
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<ProjectScrum> updateProject(@PathVariable Long id,
                                                      @RequestBody ProjectScrum projectScrumDetails) {
        return projectService.updateProject(id, projectScrumDetails);
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteProject(@PathVariable Long id) {
        return projectService.deleteProject(id);
    }
}
