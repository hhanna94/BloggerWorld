var axios = require("axios");

export const jwtToken = localStorage.getItem("auth");

axios.interceptors.request.use(
    function (config) {
        if (jwtToken) {
            config.headers["authorization"] = "Bearer " + jwtToken;
        }
        return config;
    },
    function (err) {
        return Promise.reject(err);
    }
);