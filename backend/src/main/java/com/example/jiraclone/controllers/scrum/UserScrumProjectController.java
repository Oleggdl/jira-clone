package com.example.jiraclone.controllers.scrum;


import com.example.jiraclone.entities.Role;
import com.example.jiraclone.entities.Users;
import com.example.jiraclone.entities.scrum.ProjectScrum;
import com.example.jiraclone.entities.scrum.TaskScrum;
import com.example.jiraclone.entities.scrum.UserScrumProject;
import com.example.jiraclone.exceptions.ResourceNotFoundException;
import com.example.jiraclone.repositories.RoleRepository;
import com.example.jiraclone.repositories.UserRepository;
import com.example.jiraclone.repositories.scrum.ProjectScrumRepository;
import com.example.jiraclone.repositories.scrum.UserScrumProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("jira-clone/scrum")
public class UserScrumProjectController {

    @Autowired
    UserScrumProjectRepository userScrumProjectRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProjectScrumRepository projectScrumRepository;

    @Autowired
    RoleRepository roleRepository;

    @GetMapping("/userScrumProject")
    public List<UserScrumProject> getAllUserScrumProject() {
        return userScrumProjectRepository.findAll();
    }

    @GetMapping("/userScrumProject/{id}")
    public ResponseEntity<UserScrumProject> getUserScrumProjectById(@PathVariable Long id) {

        UserScrumProject userScrumProject = userScrumProjectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("userScrumProjectRepository not exist with id:" + id));

        return ResponseEntity.ok(userScrumProject);
    }

    @GetMapping("/userScrumProject/forUsers/{userId}")
    public List<UserScrumProject> getUserScrumProjects(@PathVariable Long userId) {

        Users users = userRepository.findById(userId).get();
        List<UserScrumProject> projectScrums = userScrumProjectRepository.findAll();

        ArrayList<UserScrumProject> userScrumProjects = new ArrayList<>();

        for (int i = 0; i <= projectScrums.size() - 1; i++) {

            if (projectScrums.get(i).getUsers() == users) {
                userScrumProjects.add(projectScrums.get(i));
            }
        }
        return userScrumProjects;
    }


    @GetMapping("/userScrumProject/usersOnProject/{projectId}")
    public List<UserScrumProject> getUsersOnProject(@PathVariable Long projectId) {

        ProjectScrum projectScrum = projectScrumRepository.findById(projectId).get();
        List<UserScrumProject> userScrumProject = userScrumProjectRepository.findAll();

        ArrayList<UserScrumProject> userScrumProjectsArray = new ArrayList<>();

        for (int i = 0; i <= userScrumProject.size() - 1; i++) {

            if (userScrumProject.get(i).getScrum_project() == projectScrum) {
                userScrumProjectsArray.add(userScrumProject.get(i));
            }
        }
        return userScrumProjectsArray;
    }

    @GetMapping("/userScrumProject/search/{userId}")
    public List<UserScrumProject> searchProject(HttpServletRequest request, @PathVariable Long userId) {

        String projectName = request.getParameter("projectName");

        List<UserScrumProject> userScrumProject = userScrumProjectRepository.findAll();
        Users users = userRepository.findById(userId).get();

        ArrayList<UserScrumProject> userScrumProjectsArray = new ArrayList<>();

        for (int i = 0; i <= userScrumProject.size() - 1; i++) {

            if (userScrumProject.get(i).getScrum_project().getProject_name().toUpperCase().contains(projectName
                    .toUpperCase()) && userScrumProject.get(i).getUsers() == users) {
                userScrumProjectsArray.add(userScrumProject.get(i));

            }
        }


        return userScrumProjectsArray;
    }

    @PostMapping("/userScrumProject")
    public UserScrumProject createUserScrumProject(@RequestBody UserScrumProject userScrumProject) {
        return userScrumProjectRepository.save(userScrumProject);
    }

    @PutMapping("/userScrumProject/{userScrumProjectId}/{userId}/{projectId}/{userRoleId}")
    public ResponseEntity<UserScrumProject> updateUserScrumProject(@PathVariable Long userScrumProjectId,
                                                                   @PathVariable Long userId,
                                                                   @PathVariable Long projectId,
                                                                   @PathVariable Long userRoleId) {

        UserScrumProject userScrumProject = userScrumProjectRepository.findById(userScrumProjectId).get();
        Users user = userRepository.findById(userId).get();
        ProjectScrum projectScrum = projectScrumRepository.findById(projectId).get();
        Role role = roleRepository.findById(userRoleId).get();

        userScrumProject.setScrum_project(projectScrum);
        userScrumProject.setUsers(user);
        userScrumProject.setUser_role(role);


        UserScrumProject updatedUserScrumProject = userScrumProjectRepository.save(userScrumProject);
        return ResponseEntity.ok(updatedUserScrumProject);
    }

    @DeleteMapping("/userScrumProject/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteUserScrumProject(@PathVariable Long id) {
        UserScrumProject userScrumProject = userScrumProjectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("UserScrumProject not exist with id:" + id));

        userScrumProjectRepository.delete((userScrumProject));
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
