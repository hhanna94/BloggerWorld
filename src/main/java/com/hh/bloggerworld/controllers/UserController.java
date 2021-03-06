package com.hh.bloggerworld.controllers;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hh.bloggerworld.config.CurrentUser;
import com.hh.bloggerworld.models.ErrorResponse;
import com.hh.bloggerworld.models.LoginUser;
import com.hh.bloggerworld.models.User;
import com.hh.bloggerworld.models.UserPrincipal;
import com.hh.bloggerworld.services.UserService;

@CrossOrigin(origins= "http://localhost:3000")
@RequestMapping("/api/user")
@RestController
public class UserController {
	@Autowired
	private UserService userService;
	
	// If the user is a logged in user, find and return that user's details.
	@GetMapping("/me")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<Object> getLoggedInUser(@CurrentUser UserPrincipal currentUser) {
		User user = userService.findByUsername(currentUser.getUsername());
		return ResponseEntity.ok(user);
	}
	
	// If the request is deemed invalid (does not meet all back-end validations created in the User model), return a list of errors so that the user knows what to fix. If the request is valid, then save the user to the database and return the saved user.
	@PostMapping("/register")
	public ResponseEntity<Object> registerUser(@Valid @RequestBody User newUser, BindingResult result) {
		userService.register(newUser, result);
		if (result.hasErrors()) {
	        List<String> errors = result.getAllErrors().stream().map(e -> e.getDefaultMessage()).collect(Collectors.toList());
	        return ResponseEntity.badRequest().body(new ErrorResponse("404", "Validation failure", errors));
	    }
		return ResponseEntity.ok(newUser);
	}
	
	// If the request is deemed invalid (does not meet all back-end validations created in the User model), return a list of errors so that the user knows what to fix. If the request is valid, then create and return a JWT for the user, which will essentially log them in.
	@PostMapping("/login")
	public ResponseEntity<Object> loginUser(@Valid @RequestBody LoginUser newLogin, BindingResult result) {
		userService.validateLogin(newLogin, result);
		if (result.hasErrors()) {
			List<String> errors = result.getAllErrors().stream().map(e -> e.getDefaultMessage()).collect(Collectors.toList());
	        return ResponseEntity.badRequest().body(new ErrorResponse("404", "Validation failure", errors));
		}
		
		ResponseEntity<Object> jwtResponse = userService.login(newLogin);
		return ResponseEntity.ok(jwtResponse);
		
	}
	
} 
