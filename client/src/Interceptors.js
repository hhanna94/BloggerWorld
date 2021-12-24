var axios = require("axios");

export const jwtToken = localStorage.getItem("auth");

axios.interceptors.request.use(
    function (config) {
        // There was unfortunately an issue with the way I set up my app that forced me to save the token to a new variable within the actual function in order for the logged in user to update properly on login and logout.
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