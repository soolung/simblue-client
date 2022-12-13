import server from "../axios/server";
import {authorization} from "../config/authorization";

export const createNotice = async ({applicationId, notice}) => {
    return (await server.post('/application/notice', {
        applicationId: applicationId,
        notice: notice
    }, authorization()));
}

export const pinNotice = async (id) => {
    return (await server.put(`/application/notice/${id}/pinned`, {}, authorization())).data
}
