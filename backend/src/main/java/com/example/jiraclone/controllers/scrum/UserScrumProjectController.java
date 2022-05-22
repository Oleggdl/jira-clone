package com.example.jiraclone.controllers.scrum;


import com.example.jiraclone.entities.scrum.UserScrumProject;
import com.example.jiraclone.services.UserProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("TaskManager/scrum")
public class UserScrumProjectController {

    @Autowired
    private UserProjectService projectService;

    @GetMapping("/userScrumProject")
    public List<UserScrumProject> getAllUserScrumProject() {
        return projectService.getAllUserScrumProject();
    }

    @GetMapping("/userScrumProject/{id}")
    public ResponseEntity<UserScrumProject> getUserScrumProjectById(@PathVariable Long id) {
        return projectService.getUserScrumProjectById(id);
    }

    @GetMapping("/userScrumProject/forUsers/{userId}")
    public List<UserScrumProject> getUserScrumProjects(@PathVariable Long userId) {
        return projectService.getUserScrumProjects(userId);
    }

    @GetMapping("/userScrumProject/isExist/{userId}/{projectId}")
    public ResponseEntity<Boolean> isUserProjectExist(@PathVariable Long userId, @PathVariable Long projectId) {
        return projectService.isUserProjectExist(userId, projectId);
    }

    @GetMapping("/userScrumProject/forUsers/favorite/{userId}")
    public List<UserScrumProject> getUserScrumProjectsFavorite(@PathVariable Long userId) {
        return projectService.getUserScrumProjectsFavorite(userId);
    }

    @GetMapping("/userScrumProject/usersOnProject/{projectId}")
    public List<UserScrumProject> getUsersOnProject(@PathVariable Long projectId) {
        return projectService.getUsersOnProject(projectId);
    }

    @GetMapping("/userScrumProject/search/{userId}")
    public List<UserScrumProject> searchProject(HttpServletRequest request, @PathVariable Long userId) {
        return projectService.searchProject(request, userId);
    }

    @PostMapping("/userScrumProject")
    public UserScrumProject createUserScrumProject(@RequestBody UserScrumProject userScrumProject) {
        return projectService.createUserScrumProject(userScrumProject);
    }

    @PutMapping("/userScrumProject/{userScrumProjectId}/{userId}/{projectId}/{userRoleId}")
    public ResponseEntity<UserScrumProject> updateUserScrumProject(@PathVariable Long userScrumProjectId,
                                                                   @PathVariable Long userId,
                                                                   @PathVariable Long projectId,
                                                                   @PathVariable Long userRoleId) {
        return projectService.updateUserScrumProject(userScrumProjectId, userId, projectId, userRoleId);
    }

    @DeleteMapping("/userScrumProject/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteUserScrumProject(@PathVariable Long id) {
        return projectService.deleteUserScrumProject(id);
    }
}
