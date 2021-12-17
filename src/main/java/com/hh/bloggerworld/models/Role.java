package com.hh.bloggerworld.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="roles")
public class Role {
    // ================================
    // ATTRIBUTES
    // ================================
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    
    // ================================
    // RELATIONSHIPS
    // ================================
    @ManyToMany(mappedBy = "roles")
    private List<User> users;

    // ================================
    // CONSTRUCTOR
    // ================================
    public Role() {
    }
    
    // ================================
    // GETTERS AND SETTERS
    // ================================
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    @JsonIgnore
    public List<User> getUsers() {
        return users;
    }
    public void setUsers(List<User> users) {
        this.users = users;
    }
}
