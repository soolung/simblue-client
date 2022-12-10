import server from "../axios/server";

export const getGoogleAuthLink = async () => {
    return (await server.get('/auth/google')).data
}

export const getAccessTokenByGoogle = async (code) => {
    return (await server.post(`/auth/google/callback?code=${code}`)).data;
}
