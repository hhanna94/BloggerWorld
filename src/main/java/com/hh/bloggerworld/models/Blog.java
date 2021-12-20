package com.hh.bloggerworld.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name="blogs")
public class Blog {
	// ================================
    // ATTRIBUTES
    // ================================
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotEmpty(message="Must enter a title.")
	private String title;
	
	@NotEmpty(message="Must select a category.")
	private String category;
	
	private String theme;
	
	@Column(columnDefinition="TEXT")
	private String description;
	
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
    @JoinColumn(name="user_id")
    private User creator;
    
    // ================================
    // CONSTRUCTOR
    // ================================
    public Blog() {}
    

    // ================================
    // GETTERS AND SETTERS
    // ================================
	public Long getId() {
		return id;
	}
	public String getTitle() {
		return title;
	}
	public String getCategory() {
		return category;
	}
	public String getTheme() {
		return theme;
	}
	public Date getCreatedAt() {
		return createdAt;
	}
	public Date getUpdatedAt() {
		return updatedAt;
	}
	public User getCreator() {
		return creator;
	}
	public String getDescription() {
		return description;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public void setTheme(String theme) {
		this.theme = theme;
	}
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}
	public void setCreator(User creator) {
		this.creator = creator;
	}
	public void setDescription(String description) {
		this.description = description;
	}
    
    
}
