package com.hh.bloggerworld.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hh.bloggerworld.models.Blog;

@Repository
// These methods query the database for blog related requests.
public interface BlogRepo extends CrudRepository<Blog, Long>{
	// Used to return a list of blog's created by a specific user.
	List<Blog> findByCreator_Id(Long id);
	
	// Used to return a blog based on the ID.
	Optional<Blog> findById(Long id);
	
	// Used to return a list of all blogs.
	List<Blog> findAll();
	
	// Used to return a list of all blogs that belong to a certain category.
	List<Blog> findByCategory(String category);
	
}
