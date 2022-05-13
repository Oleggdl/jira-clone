package com.example.jiraclone.pojo;

import lombok.Data;

@Data
public class SignupRequest {
	
	private String username;
	private String email;
	private String password;
	private String name;
	private String surname;

}
