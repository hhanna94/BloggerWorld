package com.hh.bloggerworld.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hh.bloggerworld.models.Comment;
import com.hh.bloggerworld.repositories.CommentRepo;

@Service
public class CommentService {
	@Autowired
	private CommentRepo commentRepo;
	
	public Comment saveComment(Comment comment) {
		return commentRepo.save(comment);
	}
	
	public List<Comment> findPostComments(Long id) {
		return commentRepo.findByPost_Id(id);
	}
	
}
