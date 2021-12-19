import axios from "axios";

const API_URL = "http://localhost:8080/api/";

class UserService {
    login(user) {
        return axios.post(API_URL+"login", user)
    }

    register(user) {
        return axios.post(API_URL+"register", user)
    }

    getLoggedInUser() {
        return axios.get(API_URL+"user/me")
    }
}

export default new UserService();