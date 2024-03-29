import server from "../axios/server";
import { authorization } from "../config/authorization";

export const joinStudent = async ({
  admissionYear,
  name,
  password,
  studentNumber,
}) => {
  return await server.post(
    "/user/student",
    {
      admissionYear: admissionYear,
      name: name,
      password: password,
      studentNumber: studentNumber,
    },
    authorization()
  );
};

export const joinTeacher = async ({ name, password }) => {
  return await server.post(
    "/user/teacher",
    {
      name: name,
      password: password,
    },
    authorization()
  );
};

export const searchUser = async ({ q, authority }) => {
  return (await server.get(
    `/user/search`,
    {
      ...authorization(),
      params: {
        q: q,
        authority: authority
      }
    }
  )).data;
}

export const getUserInfo = async () => {
  return (await server.get("/user", authorization())).data;
};
