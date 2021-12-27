package com.hh.bloggerworld.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hh.bloggerworld.models.User;

@Repository
//These methods query the database for user related requests.
public interface UserRepo extends CrudRepository<User, Long>{
	
	// Used to return a user by their email (called a username).
	User findByUsername(String username);
	
	// Used to return a user by their ID.
	Optional<User> findById(Long id);
}
