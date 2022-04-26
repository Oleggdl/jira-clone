package com.example.jiraclone.services;

import com.example.jiraclone.classes.EmailRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final TemplateEngine templateEngine;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    public EmailService(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    public void addUserToProject(EmailRequest request) {


        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            Context context = new Context();

            context.setVariable("emailTo", request.getEmailTo());
            context.setVariable("projectId", request.getProjectId());
            context.setVariable("projectName", request.getProjectName());
            context.setVariable("userName", request.getUserName());
            context.setVariable("link", "http://localhost:3000?joinTheTeam=true&&projectId=" + request.getProjectId());


            String body = templateEngine.process("joinTheTeamEmail", context);

            String emailTo = request.getEmailTo();
            Long projectId = request.getProjectId();
            String projectName = request.getProjectName();
            String userName = request.getUserName();

            String mailSubject = userName + " is waiting for you to join them";
//            String mailContent = "<h2>Your team is waiting for you to join them</h2>" + "\n";
//            mailContent += userName + " has invited you to collaborate on " + projectName + "\n";
//            mailContent += "<a href=\"http://localhost:3000/\">Join the team</a>" + "\n";
//
//
            helper.setFrom("olegblotski@gmail.com", "Jira-clone");
            helper.setTo(emailTo);
            helper.setSubject(mailSubject);
            helper.setText(body, true);


            mailSender.send(message);
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }
}
