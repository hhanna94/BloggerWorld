import axios from "axios";

const API_URL = "http://localhost:8080/api/post/";

// A helper class used to make all of the blog post related API calls.
class PostService {
    // Get a list of all of a blog's posts based on the blog ID.
    getBlogPosts(blog_id) {
        return axios.get(API_URL+"blog/"+blog_id)
    }

    // Get the details of a post.
    getPost(post_id) {
        return axios.get(API_URL+post_id)
    }
    
    // Get all posts that exist.
    getAllPosts() {
        return axios.get(API_URL+"all")
    }

    // Get all posts returned from querying the database for post titles that include what is typed in the search bar.
    getPostsByTitle(title) {
        return axios.get(API_URL+"search/post/"+title)
    }

    // Get all posts returned from querying the database for author's last names that include what is typed in the search bar.
    getPostsByAuthor(lastName) {
        return axios.get(API_URL+"search/author/"+lastName)
    }

    // Get all posts returned from querying the database for post content that includes what is typed in the search bar.
    getPostsByContent(content) {
        return axios.get(API_URL+"search/content/"+content)
    }

    // Get posts a user has liked.
    getLikedPosts(user_id) {
        return axios.get(API_URL+"favorites/"+user_id)
    }

    // Create a post.
    createPost(post) {
        return axios.post(API_URL+"create", post)
    }

    // Edit a post.
    editPost(post) {
        return axios.put(API_URL+post.id, post)
    }

    // Like a post.
    likePost(post_id, user_id) {
        return axios.put(API_URL+post_id+"/user/"+user_id)
    }


    // Delete a post
    deletePost(post_id) {
        return axios.delete(API_URL+post_id)
    }
}

export default new PostService();