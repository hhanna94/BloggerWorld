package com.hh.bloggerworld.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hh.bloggerworld.models.Comment;

@Repository
//These methods query the database for comment related requests.
public interface CommentRepo extends CrudRepository<Comment, Long>{
	
	// Used to return a list of all comments that belong to a specific post.
	List<Comment> findByPost_Id(Long id);
}
