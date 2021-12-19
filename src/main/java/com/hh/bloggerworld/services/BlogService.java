package com.hh.bloggerworld.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hh.bloggerworld.models.Blog;
import com.hh.bloggerworld.repositories.BlogRepo;

@Service
public class BlogService {
	@Autowired
	private BlogRepo blogRepo;
	
	public Blog saveBlog(Blog blog) {
		return blogRepo.save(blog);
	}

}
