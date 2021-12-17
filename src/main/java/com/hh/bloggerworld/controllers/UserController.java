package com.hh.bloggerworld.controllers;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hh.bloggerworld.models.ErrorResponse;
import com.hh.bloggerworld.models.LoginUser;
import com.hh.bloggerworld.models.User;
import com.hh.bloggerworld.services.UserService;

@CrossOrigin(origins= "http://localhost:3000")
@RequestMapping("/api")
@RestController
public class UserController {
	@Autowired
	private UserService userService;
	
	
	
	@PostMapping("/register")
	public ResponseEntity<Object> registerUser(@Valid @RequestBody User newUser, BindingResult result) {
		System.out.println(newUser);
		userService.register(newUser, result);
		if (result.hasErrors()) {
	        List<String> errors = result.getAllErrors().stream().map(e -> e.getDefaultMessage()).collect(Collectors.toList());
	        return ResponseEntity.badRequest().body(new ErrorResponse("404", "Validation failure", errors));
	    }
		return ResponseEntity.ok(newUser);
	}
	
	@PostMapping("/login")
	public ResponseEntity<Object> loginUser(@Valid @RequestBody LoginUser newLogin, BindingResult result) {
		User user = userService.validateLogin(newLogin, result);
		if (result.hasErrors()) {
			List<String> errors = result.getAllErrors().stream().map(e -> e.getDefaultMessage()).collect(Collectors.toList());
	        return ResponseEntity.badRequest().body(new ErrorResponse("404", "Validation failure", errors));
		}
		
		ResponseEntity<Object> jwtResponse = userService.login(newLogin);
		System.out.println("yayyyy");
		return ResponseEntity.ok(jwtResponse);
		
	}
	
} 
