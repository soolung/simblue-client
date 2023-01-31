import axios from "axios";
import { accessTokenExpired } from "../api/token";

const server = axios.create({
  baseURL: "http://15.164.60.153:8080",
  timeout: 10000,
});

server.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

server.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error.response.data.message);
    if (error.response.status === 401) {
      accessTokenExpired();
    }
    return Promise.reject(error);
  }
);
export default server;
