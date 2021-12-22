var axios = require("axios");

export const jwtToken = localStorage.getItem("auth");

axios.interceptors.request.use(
    function (config) {
        const newToken = localStorage.getItem("auth");
        if (newToken !== null) {
            config.headers["authorization"] = "Bearer " + newToken;
        }
        return config;
    },
    function (err) {
        return Promise.reject(err);
    }
);