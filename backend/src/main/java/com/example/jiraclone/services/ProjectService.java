package com.example.jiraclone.services;

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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProjectService {

    @Autowired
    ProjectScrumRepository projectScrumRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserScrumProjectRepository userScrumProjectRepository;

    public List<ProjectScrum> getAllProjects() {
        return projectScrumRepository.findAll();
    }

    public ProjectScrum createProject(ProjectScrum projectScrum) {
        return projectScrumRepository.save(projectScrum);
    }

    public ResponseEntity<ProjectScrum> addSupervisorToProject(Long id, Long userId) {
        ProjectScrum projectScrum = projectScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not exist with id:" + id));

        Users user = userRepository.findById(userId).get();
        projectScrum.setSupervisor(user);

        ProjectScrum updateProjectScrum = projectScrumRepository.save(projectScrum);
        return ResponseEntity.ok(updateProjectScrum);
    }

    public ResponseEntity<ProjectScrum> getProjectById(Long id) {
        ProjectScrum projectScrum = projectScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not exist with id:" + id));
        return ResponseEntity.ok(projectScrum);
    }

    public ResponseEntity<ProjectScrum> updateProject(Long id, ProjectScrum projectScrumDetails) {
        ProjectScrum projectScrum = projectScrumRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not exist with id:" + id));
        projectScrum.setProject_name(projectScrumDetails.getProject_name());
        projectScrum.setProject_key(projectScrumDetails.getProject_key());
        projectScrum.setProject_description(projectScrumDetails.getProject_description());
        projectScrum.setIs_favorite(projectScrumDetails.getIs_favorite());
        ProjectScrum updateProjectScrum = projectScrumRepository.save(projectScrum);
        return ResponseEntity.ok(updateProjectScrum);
    }

    public ResponseEntity<Map<String, Boolean>> deleteProject(Long id, Long userId) {

        List<UserScrumProject> projectScrums = userScrumProjectRepository.findAll();
        Users users = userRepository.findById(userId).get();

        Map<String, Boolean> response = new HashMap<>();

        for (int i = 0; i <= projectScrums.size() - 1; i++) {
            if ((projectScrums.get(i).getUsers() == users) && projectScrums.get(i).getScrum_project().getId() == id
                    && projectScrums.get(i).getUser_role().getId() == 1) {

                ProjectScrum projectScrum = projectScrumRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Project not exist with id:" + id));
                projectScrumRepository.delete(projectScrum);

                response.put("deleted", Boolean.TRUE);
                return ResponseEntity.ok(response);
            }
        }

        response.put("not deleted", Boolean.FALSE);
        return ResponseEntity.ok(response);
    }
}
