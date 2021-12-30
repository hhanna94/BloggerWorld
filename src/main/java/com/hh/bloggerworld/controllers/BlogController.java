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
	
	// ================================
    // GET REQUESTS
    // ================================
	
	// If the user is a logged in user, get and return a list of the user's blogs.
	@PreAuthorize("hasRole('USER')")
	@GetMapping("/user/{id}")
	public ResponseEntity<Object> getUserBlogs(@PathVariable("id") Long user_id) {
		List<Blog> userBlogs = blogService.findUserBlogs(user_id);
		return ResponseEntity.ok(userBlogs);
	}
	
	// Get and return a blog's details based on the blog's ID.
	@GetMapping("/{id}")
	public ResponseEntity<Object> getBlog(@PathVariable("id") Long blog_id) {
		Blog blog = blogService.findBlog(blog_id);
		return ResponseEntity.ok(blog);
	}
	
	// Get and return a list of all existing blogs.
	@GetMapping("/all")
	public ResponseEntity<Object> getAllBlogs() {
		List<Blog> blogs = blogService.findAllBlogs();
		return ResponseEntity.ok(blogs);
	}
	
	// Get and return a list of all blogs that exist within a specified category.
	@GetMapping("/category/{category}")
	public ResponseEntity<Object> getBlogsByCategory(@PathVariable("category") String category) {
		List<Blog> blogs = blogService.findBlogsByCategory(category);
		return ResponseEntity.ok(blogs);
	}
	
	// Get and return a list of all blogs that a user favorited.
	@GetMapping("/favorites/{user_id}")
	public ResponseEntity<Object> getUserFavorites(@PathVariable("user_id") Long user_id) {
		List<Blog> blogs = blogService.getUserFavorites(user_id);
		return ResponseEntity.ok(blogs);
	}
	
	// ================================
    // POST/PUT REQUESTS
    // ================================
	
	// If the user is a logged in user, if the request is deemed invalid (does not meet all back-end validations created in the Blog model), return a list of errors so that the user knows what to fix. If the request is valid, then save the blog to the database and return the saved blog.
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
	
	// If the user is a logged in user, use the above create method to edit the blog. Since the code was exactly the same, I had this put request just utilize the post request.
	@PreAuthorize("hasRole('USER')")
	@PutMapping("/{id}")
	public ResponseEntity<Object> editBlog(@Valid @RequestBody Blog blog, BindingResult result) {
		return this.createBlog(blog, result);
	}
	
	// If the user is a logged in user, favorite the blog
	@PreAuthorize("hasRole('USER')")
	@PutMapping("/{blog_id}/user/{user_id}")
	public ResponseEntity<Object> favoriteBlog(@PathVariable("blog_id") Long blog_id, @PathVariable("user_id") Long user_id) {
		Blog blog = blogService.favoriteBlog(blog_id, user_id);
		return ResponseEntity.ok(blog);
	}
	
	// ================================
    // DELETE REQUESTS
    // ================================
	
	// If the user is a logged in user, delete the blog and return a message saying that the blog was successfully deleted.
	@PreAuthorize("hasRole('USER')")
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteBlog(@PathVariable("id") Long id)  {
		blogService.deleteBlog(id);
		return ResponseEntity.ok("deleted successfully");
	}
}
