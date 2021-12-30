import axios from "axios";

const API_URL = "http://localhost:8080/api/blog/";

// A helper class used to make all of the blog related API calls.
class BlogService {
    // Get a list of all of the logged in user's blogs.
    getUserBlogs(user_id) {
        return axios.get(API_URL+"user/"+user_id)
    }

    // Get a blog based on the blog's ID.
    getBlog(blog_id) {
        return axios.get(API_URL+blog_id)
    }

    // Get all blogs that exist.
    getAllBlogs()  {
        return axios.get(API_URL+"all")
    }
    
    // Get all blogs that exist in a certain category.
    getBlogsByCategory(category) {
        return axios.get(API_URL+"category/"+category)
    }

    // Get a user's favorite blogs.
    getUserFavorites(user_id) {
        return axios.get(API_URL+"favorites/"+user_id)
    }

    // Create a blog.
    createBlog(blog) {
        return axios.post(API_URL+"create", blog)
    }

    // Edit a blog.
    editBlog(blog) {
        return axios.put(API_URL+blog.id, blog)
    }

    // Favorite a blog.
    favoriteBlog(blog_id, user_id) {
        return axios.put(API_URL+blog_id+"/user/"+user_id)
    }

    // Delete a blog.
    deleteBlog(id) {
        return axios.delete(API_URL+id)
    }
}

export default new BlogService();