import { atom } from "recoil";

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
