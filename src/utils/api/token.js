import server from "../axios/server";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant/user.constant";
import { Storage } from "../storage/storage";

export const accessTokenExpired = async () => {
  try {
    const { data } = await server.put("/auth", null, {
      headers: {
        "Refresh-Token": Storage.getItem(REFRESH_TOKEN),
      },
    });
    Storage.setItem(ACCESS_TOKEN, data.accessToken);
  } catch {
    alert("다시 로그인 해주세요");
    window.location.href = "/login";
    localStorage.clear();
  }
};
