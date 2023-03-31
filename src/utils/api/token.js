import server from "../axios/server";
import { ACCESS_TOKEN } from '../constant/user.constant';

export const accessTokenExpired = async () => {
  try {
    localStorage.setItem(
      ACCESS_TOKEN,
      (
        await server.put("/auth", null, {
          headers: {
            "Refresh-Token": localStorage.refreshToken,
          },
        })
      ).data.accessToken
    );
  } catch {
    alert("다시 로그인 해주세요");
    window.location.href = "/login";
    localStorage.clear();
  }
};
