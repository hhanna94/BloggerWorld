package com.hh.bloggerworld.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hh.bloggerworld.models.Blog;

@Repository
public interface BlogRepo extends CrudRepository<Blog, Long>{
	
}
