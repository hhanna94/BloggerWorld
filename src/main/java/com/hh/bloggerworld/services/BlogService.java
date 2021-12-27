package com.hh.bloggerworld.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hh.bloggerworld.models.Blog;
import com.hh.bloggerworld.repositories.BlogRepo;

@Service
public class BlogService {
	@Autowired
	private BlogRepo blogRepo;
	
	// Creates or updates a blog.
	public Blog saveBlog(Blog blog) {
		return blogRepo.save(blog);
	}
	
	// Returns a list of a user's blogs.
	public List<Blog> findUserBlogs(Long id) {
		return blogRepo.findByCreator_Id(id);
	}
	
	// Searchs for a blog by its ID -- if it exists, then returns the blog.
	public Blog findBlog(Long id) {
		Optional<Blog> blog = blogRepo.findById(id);
		if (!blog.isPresent()) {
			return null;
		}
		return blog.get();
	}
	
	// Deletes a blog
	public void deleteBlog(Long id) {
		blogRepo.deleteById(id);
	}
	
	// Returns a list of all blogs
	public List<Blog> findAllBlogs() {
		return blogRepo.findAll();
	}
	
	// Returns a list of any posts that belong to a certain category
	public List<Blog> findBlogsByCategory(String category) {
		return blogRepo.findByCategory(category);
	}
}
