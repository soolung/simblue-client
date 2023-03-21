import server from "../axios/server";
import { authorization } from "../config/authorization";

export const getMyBanner = async () => {
  return (await server.get(`/banner/my`, authorization())).data;
};

export const makeMyBanner = async () => {
  return (await server.post("/banner", authorization())).data;
};

export const getBanner = async () => {
  return (await server.get("/banner")).data;
};
