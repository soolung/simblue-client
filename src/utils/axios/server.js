import axios from "axios";

const server = axios.create({
  baseURL: "http://15.164.60.153:8080",
  timeout: 10000,
});

server.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

server.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    if (error.response && error.response.status) {
      console.error(error.response.data);
      // switch (error.response.status) {
      //     case 401:
      //         break;
      //     default:
      //         return Promise.reject(error);
      // }
    }

    return Promise.reject(error);
  }
);
export default server;
