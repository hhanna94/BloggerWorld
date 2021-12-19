import axios from "axios";

const API_URL = "http://localhost:8080/api/blog/";

class BlogService {
    createBlog(blog) {
        return axios.post(API_URL+"create", blog)
    }

}

export default new BlogService();