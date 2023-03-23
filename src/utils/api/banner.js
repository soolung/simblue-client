import server from "../axios/server";
import { authorization } from "../config/authorization";

export const getMyBanner = async () => {
  return (await server.get(`/banner/my`, authorization())).data;
};

export const createBanner = async ({request}) => {
  return (await server.post("/banner",request, authorization())).data;
};

export const getBanner = async () => {
  return (await server.get("/banner")).data;
};

export const createBannerImage = async () => {
    return(await server.post("/banner/image",authorization())).data;
}