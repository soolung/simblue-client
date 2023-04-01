import server from "../axios/server";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant/user.constant";
import { Storage } from "../storage/storage";

export const accessTokenExpired = async () => {
  localStorage.setItem(
    ACCESS_TOKEN,
    (
      await server.put("/auth", null, {
        headers: {
          "Refresh-Token": Storage.getItem(REFRESH_TOKEN),
        },
      })
    ).data.accessToken
  );
};
