import server from "../axios/server";
import {authorization} from "../config/authorization";

export const getGoogleAuthLink = async () => {
    return (await server.get('/auth/google')).data
}

export const getAccessTokenByGoogle = async (code) => {
    return (await server.post(`/auth/google/callback?code=${code}`)).data;
}

export const loginUser = async ({email, password}) => {
    return (await server.post('/auth', {
        email: email,
        password: password
    })).data;
}
