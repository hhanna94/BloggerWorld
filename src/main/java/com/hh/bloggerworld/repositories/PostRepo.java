package com.hh.bloggerworld.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hh.bloggerworld.models.Post;

@Repository
public interface PostRepo extends CrudRepository<Post, Long>{
	List<Post> findByParentBlog_Id(Long id);
	
	Optional<Post> findById(Long id);
	
	List<Post> findAll();
}
