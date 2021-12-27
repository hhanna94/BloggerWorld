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

import com.hh.bloggerworld.models.ErrorResponse;
import com.hh.bloggerworld.models.Post;
import com.hh.bloggerworld.services.BlogService;
import com.hh.bloggerworld.services.PostService;

@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/post")
@RestController
public class PostController {
	@Autowired
	private PostService postService;
	
	// ================================
    // GET REQUESTS
    // ================================
	
	// Get and return list of all of a blog's posts.
	@GetMapping("/blog/{id}")
	public ResponseEntity<Object> getBlogPosts(@PathVariable("id") Long blog_id) {
		List<Post> blogPosts = postService.findBlogPosts(blog_id);
		return ResponseEntity.ok(blogPosts);
	}
	
	// Get and return a blog post's details based on the post's ID.
	@GetMapping("/{id}")
	public ResponseEntity<Object> getPost(@PathVariable("id") Long post_id) {
		Post post = postService.findPost(post_id);
		return ResponseEntity.ok(post);
	}
	
	// Get and return a list of all existing posts (parent blog being irrelevent).
	@GetMapping("/all")
	public ResponseEntity<Object> getAllPosts() {
		List<Post> posts = postService.findAllPosts();
		return ResponseEntity.ok(posts);
	}
	
	// Get and return a list of all posts that have a title that includes the given string.
	@GetMapping("/search/post/{title}")
	public ResponseEntity<Object> getPostsByTitle(@PathVariable("title") String title) {
		List<Post> posts = postService.findPostsByTitle(title);
		return ResponseEntity.ok(posts);
	}
	
	// Get and return a list of all posts that have an author's last name that matches the given string.
	@GetMapping("/search/author/{lastName}")
	public ResponseEntity<Object> getPostsByAuthorLastName(@PathVariable("lastName") String lastName) {
		List<Post> posts = postService.findPostsByAuthorLastName(lastName);
		return ResponseEntity.ok(posts);
	}
	
	// Get and return a list of all posts that contain the given string in their content body.
	@GetMapping("/search/content/{content}")
	public ResponseEntity<Object> getPostsByContent(@PathVariable("content") String content) {
		List<Post> posts = postService.findPostsByContent(content);
		return ResponseEntity.ok(posts);
	}
	
	// ================================
    // POST/PUT REQUESTS
    // ================================
	
	// If the user is a logged in user, if the request is deemed invalid (does not meet all back-end validations created in the Post model), return a list of errors so that the user knows what to fix. If the request is valid, then save the post to the database and return the saved post.
	@PreAuthorize("hasRole('USER')")
	@PostMapping("/create")
	public ResponseEntity<Object> createPost(@Valid @RequestBody Post post, BindingResult result) {
		if (result.hasErrors()) {
	        List<String> errors = result.getAllErrors().stream().map(e -> e.getDefaultMessage()).collect(Collectors.toList());
	        return ResponseEntity.badRequest().body(new ErrorResponse("404", "Validation failure", errors));
	    }
		postService.savePost(post);
		return ResponseEntity.ok(post);
	}
	
	// If the user is a logged in user, use the above create method to edit the post. Since the code was exactly the same, I had this put request just utilize the post request.
	@PreAuthorize("hasRole('USER')")
	@PutMapping("/{id}")
	public ResponseEntity<Object> editPost(@Valid @RequestBody Post post, BindingResult result) {
		return this.createPost(post, result);
	}
	
	// ================================
    // DELETE REQUESTS
    // ================================
	
	// If the user is a logged in user, delete the post and return a message saying that the post was successfully deleted.
	@PreAuthorize("hasRole('USER')")
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deletePost(@PathVariable("id") Long id) {
		postService.deletePost(id);
		return ResponseEntity.ok("deleted successfully");
	}
}
