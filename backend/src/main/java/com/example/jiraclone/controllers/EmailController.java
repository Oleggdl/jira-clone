package com.example.jiraclone.controllers;

import com.example.jiraclone.classes.EmailRequest;
import com.example.jiraclone.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("jira-clone/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/add_user/{emailFrom}/{userType}")
    public void addUserToProject(@RequestBody EmailRequest request, @PathVariable String emailFrom,
                                 @PathVariable String userType) {

        emailService.addUserToProject(request, emailFrom, userType);
    }
}
