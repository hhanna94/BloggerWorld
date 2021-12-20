import axios from "axios";

const API_URL = "http://localhost:8080/api/blog/";

class BlogService {
    createBlog(blog) {
        return axios.post(API_URL+"create", blog)
    }

    getUserBlogs(user_id) {
        return axios.get(API_URL+"user/"+user_id)
    }

    getBlog(blog_id) {
        return axios.get(API_URL+blog_id)
    }

    editBlog(blog) {
        return axios.put(API_URL+blog.id, blog)
    }

    deleteBlog(id) {
        return axios.delete(API_URL+id)
    }
}

export default new BlogService();