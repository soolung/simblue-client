import server from "../axios/server";
import {authorization} from "../config/authorization";

export const getApplications = async (type) => {
    return (await server.get(`/application?type=${type}`)).data
}
export const getMyApplications = async () => {
    return (await server.get(`/application/my`, authorization())).data
}

export const getApplicationDetail = async (id) => {
    return (await server.get(`/application/${id}`, authorization())).data;
}
