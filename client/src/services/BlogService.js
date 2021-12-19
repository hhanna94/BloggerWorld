import axios from "axios";

const API_URL = "http://localhost:8080/api/blog/";

class BlogService {
    createBlog(blog) {
        return axios.post(API_URL+"create", blog)
    }

    getUserBlogs(user_id) {
        return axios.get(API_URL+"user/"+user_id)
    }
}

export default new BlogService();