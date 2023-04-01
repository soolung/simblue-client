import { atom } from "recoil";

export const userEmpty = {
  authority: "",
  email: "",
  name: "",
  roleId: 0,
};

export const userState = atom({
  key: "user",
  default: userEmpty,
});
