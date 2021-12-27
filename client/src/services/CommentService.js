import axios from "axios";

const API_URL = "http://localhost:8080/api/comment/";

// A helper class used to make all of the comment related API calls.
class CommentService {
    // Create a comment
    createComment(comment) {
        return axios.post(API_URL+"create", comment)
    }

    // Get a list of all of a post's comments.
    getPostComments(post_id) {
        return axios.get(API_URL+"post/"+post_id)
    }
}

export default new CommentService();