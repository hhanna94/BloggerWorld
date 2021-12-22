package com.hh.bloggerworld.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hh.bloggerworld.models.Blog;

@Repository
public interface BlogRepo extends CrudRepository<Blog, Long>{
	List<Blog> findByCreator_Id(Long id);
	
	Optional<Blog> findById(Long id);
	
	List<Blog> findAll();
	
	List<Blog> findByCategory(String category);
	
}
