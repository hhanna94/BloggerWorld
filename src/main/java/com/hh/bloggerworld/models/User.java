package com.hh.bloggerworld.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OrderColumn;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="users")
public class User{
	// ================================
    // ATTRIBUTES
    // ================================
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Size(min=2, message="First name must be at least two characters.")
	private String firstName;
	
	@Size(min=2, message="Last name must be at least two characters.")
	private String lastName;
	
	@NotEmpty(message="Must enter an email.")
	@Email(message="Please enter a valid email!")
	private String username;
	
	// Validation handled with regex in userService
	private String password;
	
	@Transient
	private String confirmPassword;
	
	@Column(updatable=false)
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date createdAt;
    
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date updatedAt;
    
    @PrePersist
    protected void onCreate(){
        this.createdAt = new Date();
    }
    @PreUpdate
    protected void onUpdate(){
        this.updatedAt = new Date();
    }

    
    // ================================
    // RELATIONSHIPS
    // ================================
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "users_roles", 
        joinColumns = @JoinColumn(name = "user_id"), 
        inverseJoinColumns = @JoinColumn(name = "role_id"))
    @JsonIgnore
    private List<Role> roles;
    
    @OneToMany(mappedBy="creator", fetch = FetchType.LAZY)
    private List<Blog> blogs = new ArrayList<Blog>();
    

    @OneToMany(fetch = FetchType.LAZY, mappedBy="post")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<Comment> comments;
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
    	name = "favorite_blogs",
    	joinColumns = @JoinColumn(name = "user_id"),
    	inverseJoinColumns = @JoinColumn(name = "blog_id")
    )
    @JsonIgnore
    private List<Blog> favoritedBlogs = new ArrayList<Blog>();
    
    
    
    // ================================
    // CONSTRUCTOR
    // ================================
	public User() {}
	

	
	// ================================
    // GETTERS AND SETTERS
    // ================================
	
	public Long getId() {
		return id;
	}
	public String getFirstName() {
		return firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public String getUsername() {
		return username;
	}
	public String getPassword() {
		return password;
	}
	public String getConfirmPassword() {
		return confirmPassword;
	}
	public Date getCreatedAt() {
		return createdAt;
	}
	public Date getUpdatedAt() {
		return updatedAt;
	}
	
	public List<Role> getRoles() {
        return roles;
    }
//	public List<Blog> getBlogs() {
//		return blogs;
//	}
	
	public void setId(Long id) {
		this.id = id;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}
	public void setRoles(List<Role> roles) {
        this.roles = roles;
    }
//	public void setBlogs(List<Blog> blogs) {
//		this.blogs = blogs;
//	}
	public List<Blog> getFavoritedBlogs() {
		return favoritedBlogs;
	}
	public void setFavoritedBlogs(List<Blog> favoritedBlogs) {
		this.favoritedBlogs = favoritedBlogs;
	}
	
	
}
