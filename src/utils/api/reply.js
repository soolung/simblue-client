import { authorization } from '../config/authorization';
import server from '../axios/server';

export const replyApplication = async ({request}) => {
  return (await server.post(`/reply`, request, authorization())).data
}

export const getReply = async (id) => {
  return (await server.get(`/reply/${id}`, authorization())).data
}

export const updateReply = async ({id, request}) => {
  return (await server.put(`/reply/${id}`, request, authorization())).data;
}

export const cancelReply = async (id) => {
  return (await server.delete(`/reply/${id}`, authorization())).data
}
