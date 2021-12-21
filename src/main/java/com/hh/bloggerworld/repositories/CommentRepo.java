package com.hh.bloggerworld.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hh.bloggerworld.models.Comment;

@Repository
public interface CommentRepo extends CrudRepository<Comment, Long>{
	List<Comment> findByPost_Id(Long id);
}
