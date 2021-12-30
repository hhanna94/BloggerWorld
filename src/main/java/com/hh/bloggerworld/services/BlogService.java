package com.hh.bloggerworld.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hh.bloggerworld.models.Blog;
import com.hh.bloggerworld.models.User;
import com.hh.bloggerworld.repositories.BlogRepo;
import com.hh.bloggerworld.repositories.UserRepo;

@Service
public class BlogService {
	@Autowired
	private BlogRepo blogRepo;
	@Autowired
	private UserRepo userRepo;
	
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
	
	// Favorite a blog for a user by adding the user to the usersWhoFavorited attribute on the Blog model, then saving the blog.
	public Blog favoriteBlog(Long blog_id, Long user_id) {
		Blog blog = blogRepo.findById(blog_id).get();
		User user = userRepo.findById(user_id).get();
		
		blog.getUsersWhoFavorited().add(user);
		
		return blogRepo.save(blog);
	}
	
	// Get a list of blogs a user favorited
	public List<Blog> getUserFavorites(Long user_id) {
		return blogRepo.findByUsersWhoFavoritedId(user_id);
	}
}
