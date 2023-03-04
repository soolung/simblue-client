import { atom } from "recoil";
import { ROLE_ID, NAME, AUTHORITY, ACCESS_TOKEN, REFRESH_TOKEN } from '../constant/user.constant';

export const userState = atom({
  key: "user",
  default: {
    accessToken: localStorage.getItem(ACCESS_TOKEN),
    refreshToken: localStorage.getItem(REFRESH_TOKEN),
    authority: localStorage.getItem(AUTHORITY),
    name: localStorage.getItem(NAME),
    roleId: localStorage.getItem(ROLE_ID)
  },
});
