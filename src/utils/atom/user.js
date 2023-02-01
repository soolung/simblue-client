import { atom } from "recoil";

export const userState = atom({
  key: "user",
  default: {
    accessToken: localStorage.getItem("access-token"),
    refreshToken: localStorage.getItem("refresh-token"),
    authority: localStorage.getItem("authority"),
    name: localStorage.getItem("name"),
  },
});
