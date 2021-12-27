package com.hh.bloggerworld.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hh.bloggerworld.models.Role;

@Repository
//These methods query the database for role related requests.
public interface RoleRepo extends CrudRepository<Role, Long> {
	
	List<Role> findAll();
	List<Role> findByName(String name);
	
}
