import axios from "axios";

const API_URL = "http://localhost:8080/api/";

class UserService {
    login(user) {
        return axios.post(API_URL+"login", user)
            // .then(res => {
            //     if (res.data.accessToken) {
            //         localStorage.setItem("user", JSON.stringify(res.data))
            //     }
            //     return res.data;
            // })
    }

    register(user) {
        return axios.post(API_URL+"register", user)
    }
}

export default new UserService();