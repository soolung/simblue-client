import server from "../axios/server";
import {authorization} from "../config/authorization";

export const getAllEmoji = async () => {
    return (await server.get('/emoji', authorization())).data;
}
