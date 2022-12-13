import axios from 'axios';

const server = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 10000
});

server.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        console.error('-------- request error!!!!')
        console.error(error.data)
        return Promise.reject(error);
    }
);

server.interceptors.response.use(
    function (response) {
        return response;
    },

    function (error) {
        console.error('-------- response error!!!!')
        console.error(error.data)
        return Promise.reject(error);
    }
);
export default server;
