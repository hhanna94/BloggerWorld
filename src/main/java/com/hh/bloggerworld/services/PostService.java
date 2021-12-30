package com.hh.bloggerworld.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hh.bloggerworld.models.Post;
import com.hh.bloggerworld.models.User;
import com.hh.bloggerworld.repositories.PostRepo;
import com.hh.bloggerworld.repositories.UserRepo;

@Service
public class PostService {
	@Autowired
	private PostRepo postRepo;
	@Autowired
	private UserRepo userRepo;
	
	// Creates or updates a post.
	public Post savePost(Post post) {
		return postRepo.save(post);
	}
	
	// Returns a list of a blog's posts.
	public List<Post> findBlogPosts(Long id) {
		return postRepo.findByParentBlog_Id(id);
	}
	
	// Searches for a post by its ID -- if it exists then returns the post.
	public Post findPost(Long id) {
		Optional<Post> post = postRepo.findById(id);
		if (!post.isPresent()) {
			return null;
		}
		return post.get();
	}
	
	// Deletes a post
	public void deletePost(Long id) {
		postRepo.deleteById(id);
	}
	
	// Returns a list of all posts
	public List<Post> findAllPosts() {
		return postRepo.findAll();
	}
	
	// Returns a list of any posts that have a title that contains the given string.
	public List<Post> findPostsByTitle(String title) {
		return postRepo.findByTitleContainsIgnoreCase(title);
	}
	
	// Returns a list of any posts that have an author whose last name contains the given string.
	public List<Post> findPostsByAuthorLastName(String name) {
		return postRepo.findByParentBlogCreatorLastNameContainsIgnoreCase(name);
	}
	
	// Returns a list of any posts that have a content body that contains the given string.
	public List<Post> findPostsByContent(String content) {
		return postRepo.findByContentContainsIgnoreCase(content);
	}
	
	// Returns a list of posts a user has liked.
	public List<Post> findLikedPosts(Long user_id) {
		return userRepo.findById(user_id).get().getFavoritedPosts();
	}
	
	// Like a blog post for a user
	public Post likePost(Long post_id, Long user_id) {
		Post post = postRepo.findById(post_id).get();
		User user = userRepo.findById(user_id).get();
		
		post.getUsersWhoLiked().add(user);
		
		return postRepo.save(post);
	}
}
