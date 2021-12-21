import axios from "axios";

const API_URL = "http://localhost:8080/api/comment/";

class CommentService {
    
    createComment(comment) {
        return axios.post(API_URL+"create", comment)
    }

    getPostComments(post_id) {
        return axios.get(API_URL+"post/"+post_id)
    }
}

export default new CommentService();