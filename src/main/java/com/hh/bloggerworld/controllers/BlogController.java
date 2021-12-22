package com.hh.bloggerworld.controllers;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hh.bloggerworld.models.Blog;
import com.hh.bloggerworld.models.ErrorResponse;
import com.hh.bloggerworld.services.BlogService;
import com.hh.bloggerworld.services.UserService;

@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/blog")
@RestController
public class BlogController {
	@Autowired
	private BlogService blogService;
	
	@Autowired
	private UserService userService;
	
	@PreAuthorize("hasRole('USER')")
	@GetMapping("/user/{id}")
	public ResponseEntity<Object> getUserBlogs(@PathVariable("id") Long user_id) {
		List<Blog> userBlogs = blogService.findUserBlogs(user_id);
		return ResponseEntity.ok(userBlogs);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Object> getBlog(@PathVariable("id") Long blog_id) {
		Blog blog = blogService.findBlog(blog_id);
		return ResponseEntity.ok(blog);
	}
	
	@GetMapping("/all")
	public ResponseEntity<Object> getAllBlogs() {
		List<Blog> blogs = blogService.findAllBlogs();
		return ResponseEntity.ok(blogs);
	}
	
	@GetMapping("/category/{category}")
	public ResponseEntity<Object> getBlogsByCategory(@PathVariable("category") String category) {
		List<Blog> blogs = blogService.findBlogsByCategory(category);
		return ResponseEntity.ok(blogs);
	}
	
	@PreAuthorize("hasRole('USER')")
	@PostMapping("/create")
	public ResponseEntity<Object> createBlog(@Valid @RequestBody Blog newBlog, BindingResult result) {
		if (result.hasErrors()) {
	        List<String> errors = result.getAllErrors().stream().map(e -> e.getDefaultMessage()).collect(Collectors.toList());
	        return ResponseEntity.badRequest().body(new ErrorResponse("404", "Validation failure", errors));
	    }
		blogService.saveBlog(newBlog);
		return ResponseEntity.ok(newBlog);
	}
	
	@PreAuthorize("hasRole('USER')")
	@PutMapping("/{id}")
	public ResponseEntity<Object> editBlog(@Valid @RequestBody Blog blog, BindingResult result) {
		return this.createBlog(blog, result);
	}
	
	@PreAuthorize("hasRole('USER')")
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteBlog(@PathVariable("id") Long id)  {
		blogService.deleteBlog(id);
		return ResponseEntity.ok("deleted successfully");
	}
}
