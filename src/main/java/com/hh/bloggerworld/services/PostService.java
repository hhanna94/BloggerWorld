package com.hh.bloggerworld.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hh.bloggerworld.models.Post;
import com.hh.bloggerworld.repositories.PostRepo;

@Service
public class PostService {
	@Autowired
	private PostRepo postRepo;
	
	public Post savePost(Post post) {
		return postRepo.save(post);
	}
	
	public List<Post> findBlogPosts(Long id) {
		return postRepo.findByParentBlog_Id(id);
	}
	
	public Post findPost(Long id) {
		Optional<Post> post = postRepo.findById(id);
		if (!post.isPresent()) {
			return null;
		}
		return post.get();
	}
	
	public void deletePost(Long id) {
		postRepo.deleteById(id);
	}
	
	public List<Post> findAllPosts() {
		return postRepo.findAll();
	}
	
	public List<Post> findPostsByTitle(String title) {
		return postRepo.findByTitleContainsIgnoreCase(title);
	}
	
	public List<Post> findPostsByAuthorLastName(String name) {
		return postRepo.findByParentBlogCreatorLastNameContainsIgnoreCase(name);
	}
	
	public List<Post> findPostsByContent(String content) {
		return postRepo.findByContentContainsIgnoreCase(content);
	}
}
