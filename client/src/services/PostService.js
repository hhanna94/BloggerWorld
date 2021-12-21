import axios from "axios";

const API_URL = "http://localhost:8080/api/post/";

class PostService {
    createPost(post) {
        return axios.post(API_URL+"create", post)
    }

    getBlogPosts(blog_id) {
        return axios.get(API_URL+"blog/"+blog_id)
    }

    getPost(post_id) {
        return axios.get(API_URL+post_id)
    }

    editPost(post) {
        return axios.put(API_URL+post.id, post)
    }

    deletePost(post_id) {
        return axios.delete(API_URL+post_id)
    }
}

export default new PostService();