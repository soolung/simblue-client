import server from "../axios/server";
import { ACCESS_TOKEN } from '../constant/user.constant';

export const accessTokenExpired = async () => {
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
};
