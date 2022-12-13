import {atom} from "recoil";

export const userState = atom({
    key: 'user',
    default: {
        token: localStorage.getItem("token"),
        authority: localStorage.getItem("authority"),
        name: localStorage.getItem("name")
    },
});
