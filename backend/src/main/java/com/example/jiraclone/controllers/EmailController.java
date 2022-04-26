package com.example.jiraclone.controllers;

import com.example.jiraclone.classes.EmailRequest;
import com.example.jiraclone.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("jira-clone/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/add_user")
    public void addUserToProject(@RequestBody EmailRequest request) {

        emailService.addUserToProject(request);
    }

//    @PostMapping("/add_user_to_project")
//    public void addUserToProjectFromMail(@RequestBody EmailRequest request) {
//
//        emailService.addUserToProject(request);
//    }
}
