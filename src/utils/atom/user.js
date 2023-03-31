import { atom } from "recoil";
import { ROLE_ID, NAME, AUTHORITY, ACCESS_TOKEN, REFRESH_TOKEN } from '../constant/user.constant';

export const emptyUser = {
  authority: "",
  email: "",
  name: "",
  roleId: 0,
};

export const userState = atom({
  key: "user",
  default: emptyUser,
});
