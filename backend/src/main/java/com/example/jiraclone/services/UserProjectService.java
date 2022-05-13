package com.example.jiraclone.services;

import com.example.jiraclone.entities.Role;
import com.example.jiraclone.entities.Users;
import com.example.jiraclone.entities.scrum.ProjectScrum;
import com.example.jiraclone.entities.scrum.UserScrumProject;
import com.example.jiraclone.exceptions.ResourceNotFoundException;
import com.example.jiraclone.repositories.RoleRepository;
import com.example.jiraclone.repositories.UserRepository;
import com.example.jiraclone.repositories.scrum.ProjectScrumRepository;
import com.example.jiraclone.repositories.scrum.UserScrumProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserProjectService {

    @Autowired
    UserScrumProjectRepository userScrumProjectRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProjectScrumRepository projectScrumRepository;

    @Autowired
    RoleRepository roleRepository;

    public List<UserScrumProject> getAllUserScrumProject() {
        return userScrumProjectRepository.findAll();
    }

    public ResponseEntity<UserScrumProject> getUserScrumProjectById(Long id) {
        UserScrumProject userScrumProject = userScrumProjectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("userScrumProjectRepository not exist with id:" + id));
        return ResponseEntity.ok(userScrumProject);
    }

    public ResponseEntity<Boolean> isUserProjectExist(Long userId, Long projectId) {
        List<UserScrumProject> projectScrums = userScrumProjectRepository.findAll();
        Users users = userRepository.findById(userId).get();
        ProjectScrum projectScrum = projectScrumRepository.findById(projectId).get();
        for (int i = 0; i <= projectScrums.size() - 1; i++) {
            if (projectScrums.get(i).getUsers() == users && projectScrums.get(i).getScrum_project() == projectScrum) {
                return ResponseEntity.ok(true);
            }
        }
        return ResponseEntity.ok(false);
    }

    public List<UserScrumProject> getUserScrumProjects(Long userId) {
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

    public List<UserScrumProject> getUserScrumProjectsFavorite(Long userId) {
        Users users = userRepository.findById(userId).get();
        List<UserScrumProject> projectScrums = userScrumProjectRepository.findAll();
        ArrayList<UserScrumProject> userScrumProjects = new ArrayList<>();
        for (int i = 0; i <= projectScrums.size() - 1; i++) {
            if ((projectScrums.get(i).getUsers() == users)
                    && projectScrums.get(i).getScrum_project().getIs_favorite() == true) {
                userScrumProjects.add(projectScrums.get(i));
            }
        }
        return userScrumProjects;
    }

    public List<UserScrumProject> getUsersOnProject(Long projectId) {
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

    public List<UserScrumProject> searchProject(HttpServletRequest request, Long userId) {
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

    public UserScrumProject createUserScrumProject(UserScrumProject userScrumProject) {
        return userScrumProjectRepository.save(userScrumProject);
    }

    public ResponseEntity<UserScrumProject> updateUserScrumProject(Long userScrumProjectId, Long userId,
                                                                   Long projectId, Long userRoleId) {
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

    public ResponseEntity<Map<String, Boolean>> deleteUserScrumProject(Long id) {
        UserScrumProject userScrumProject = userScrumProjectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("UserScrumProject not exist with id:" + id));
        userScrumProjectRepository.delete((userScrumProject));
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
