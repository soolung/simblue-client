import server from "../axios/server";
import { authorization } from "../config/authorization";

export const getApplications = async (type) => {
  return (await server.get(`/application?type=${type}`)).data;
};

export const getFourLatestApplications = async () => {
  return (await server.get("/application/paging")).data;
};

export const getMyApplications = async () => {
  return (await server.get(`/application/my`, authorization())).data;
};

export const getApplicationDetail = async (id) => {
  return (await server.get(`/application/${id}`)).data;
};

export const getApplicationResult = async (id) => {
  return (await server.post(`/application/${id}/result`, {}, authorization())).data;
};

export const createApplicationForm = async ({ request }) => {
  return (await server.post("/application", request, authorization())).data;
};

export const updateApplicationForm = async ({ request, id }) => {
  return (await server.put(`/application/${id}`, request, authorization()))
    .data;
};

export const getApplicationForm = async (id) => {
  return (await server.get(`/application/${id}/form`, authorization())).data;
};

export const deleteApplicationForm = async (id) => {
  return (await server.delete(`/application/${id}`, authorization())).data;
};
