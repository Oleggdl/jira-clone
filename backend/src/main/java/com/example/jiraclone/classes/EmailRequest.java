package com.example.jiraclone.classes;

import lombok.Data;

@Data
public class EmailRequest {
    private String emailTo;
    private Long projectId;
    private String projectName;
    private String userName;
}
