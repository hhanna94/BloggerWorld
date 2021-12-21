package com.hh.bloggerworld.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name="posts")
public class Post {
	// ================================
    // ATTRIBUTES
    // ================================
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotEmpty(message="Must enter a title.")
	private String title;
	
	@NotEmpty(message="Must enter content.")
	@Column(columnDefinition="TEXT")
	private String content;
	
	private String imageURL;
	
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
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="blog_id")
    private Blog parentBlog;
    
    // ================================
    // CONSTRUCTOR
    // ================================
    private Post() {}
    
    // ================================
    // GETTERS AND SETTERS
    // ================================
	public Long getId() {
		return id;
	}
	public String getTitle() {
		return title;
	}
	public String getContent() {
		return content;
	}
	public String getImageURL() {
		return imageURL;
	}
	public Date getCreatedAt() {
		return createdAt;
	}
	public Date getUpdatedAt() {
		return updatedAt;
	}
	public Blog getParentBlog() {
		return parentBlog;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public void setImageURL(String imageURL) {
		this.imageURL = imageURL;
	}
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}
	public void setParentBlog(Blog blog) {
		this.parentBlog = blog;
	}
   
}
