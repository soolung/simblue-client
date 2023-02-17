import { authorization } from '../config/authorization';
import server from '../axios/server';

export const replyApplication = async ({request}) => {
  return (await server.post(`/reply`, request, authorization())).data
}

export const cancelReply = async (id) => {
  return (await server.delete(`/reply/${id}`)).data
}
