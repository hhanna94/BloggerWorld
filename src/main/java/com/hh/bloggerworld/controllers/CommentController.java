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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hh.bloggerworld.models.Comment;
import com.hh.bloggerworld.models.ErrorResponse;
import com.hh.bloggerworld.services.CommentService;

@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/comment")
@RestController
public class CommentController {
	@Autowired
	private CommentService commentService;
	
	// Get a list of a post's comments based on the post ID.
	@GetMapping("/post/{id}")
	public ResponseEntity<Object> getPostComments(@PathVariable("id") Long post_id) {
		List<Comment> postComments = commentService.findPostComments(post_id);
		return ResponseEntity.ok(postComments);
	}
	
	// If the user is a logged in user, if the request is deemed invalid (does not meet all back-end validations created in the Comment model), return a list of errors so that the user knows what to fix. If the request is valid, then save the comment to the database and return the saved comment.
	@PreAuthorize("hasRole('USER')")
	@PostMapping("/create")
	public ResponseEntity<Object> createComment(@Valid @RequestBody Comment newComment, BindingResult result) {
		if (result.hasErrors()) {
	        List<String> errors = result.getAllErrors().stream().map(e -> e.getDefaultMessage()).collect(Collectors.toList());
	        return ResponseEntity.badRequest().body(new ErrorResponse("404", "Validation failure", errors));
	    }
		commentService.saveComment(newComment);
		return ResponseEntity.ok(newComment);
	}
}
