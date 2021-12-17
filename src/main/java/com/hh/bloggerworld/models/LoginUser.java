package com.hh.bloggerworld.models;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class LoginUser {
	@NotEmpty(message="Must enter an email.")
    private String username;
    
    @Size(min=8, message="Password must be at least 8 characters!")
    private String password;
    
    public LoginUser() {}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}
    
	
}
