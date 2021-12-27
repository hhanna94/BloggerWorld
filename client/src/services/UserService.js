import axios from "axios";

const API_URL = "http://localhost:8080/api/user/";

// A helper class used to make all of the user related API calls.
class UserService {
    // Login in the user securely -- this will return a JWT that will then be stored in local storage and includedd in all API calls.
    login(user) {
        return axios.post(API_URL+"login", user)
    }

    // Register a user
    register(user) {
        return axios.post(API_URL+"register", user)
    }

    // Get the details for a logged in user.
    getLoggedInUser() {
        return axios.get(API_URL+"me")
    }
}

export default new UserService();