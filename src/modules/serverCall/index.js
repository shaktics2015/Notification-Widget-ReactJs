import axios from "axios";

const JSON_SERVER_URL = "http://localhost:9000/json/";

export const jsonServerCall = (config) => {

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      if (!error.response) {
        error.response = {
          data: "network error",
          status: 500,
        };
      }
      return Promise.reject(error);
    }
  );
  config.baseURL = JSON_SERVER_URL;
  return axios(config);
};
