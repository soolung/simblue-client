import server from "../axios/server";
import { authorization } from "../config/authorization";

export const getMyBanner = async () => {
  return (await server.get(`/banner/my`, authorization())).data;
};

export const registerBanner = async ({ request }) => {
  return (await server.post("/banner", request, authorization())).data;
};

export const updateBanner = async ({ id, request }) => {
  return (await server.put(`/banner/${id}`, request, authorization())).data;
};

export const deleteBanner = async (id) => {
  return (await server.delete(`/banner/${id}`, authorization())).data;
};

export const getBanner = async () => {
  return (await server.get("/banner")).data;
};

export const uploadBannerImage = async (form) => {
  return (
    await server.post("/banner/image", form, {
      headers: {
        Authorization: `Bearer ${localStorage.accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
  ).data;
};


