package com.hh.bloggerworld.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hh.bloggerworld.models.Post;

@Repository
//These methods query the database for post related requests.
public interface PostRepo extends CrudRepository<Post, Long>{
	
	// Used to return a list of all posts that belong to a certain blog.
	List<Post> findByParentBlog_Id(Long id);
	
	// Used to return a post based on its ID.
	Optional<Post> findById(Long id);
	
	// Used to return a list of all posts.
	List<Post> findAll();
	
	// Used to return a list of all posts that have a title that contains the given string -- not case sensitive.
	List<Post> findByTitleContainsIgnoreCase(String title);
	
	// Used to return a list of all posts whose parent blog's creator's last name contains the given string -- not case sensitive. This is a fun one.
	List<Post> findByParentBlogCreatorLastNameContainsIgnoreCase(String lastName);
	
	// Used to return a list of all posts that have their content body containing the given string -- not case sensitive.
	List<Post> findByContentContainsIgnoreCase(String content);
}
