package com.hh.bloggerworld.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hh.bloggerworld.models.User;

@Repository
public interface UserRepo extends CrudRepository<User, Long>{
	User findByUsername(String username);
	
	Optional<User> findById(Long id);
}
