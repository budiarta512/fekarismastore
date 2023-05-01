import { getToken } from "../utils/auth";
import { api } from "./api";
import { ILogin, IRegister } from "../utils/types";

const fetchUser = async (options: string | undefined) => {
  return await api.get("v1/user" + options !== undefined ? "/" + options : "");
};

const registerUser = async (data: IRegister) => {
  return await api.post("v1/user/register", data);
};

const loginUser = async (data: ILogin) => {
  const login = await api.post("v1/user/login", data);
  return login;
};

const verify = async (options: string | undefined) => {
  return await api.post(
    "v1/user/verify" + options !== undefined ? "/" + options : ""
  );
};

const logoutUser = async () => {
  return await api.post("v1/user/logout", {
    headers: {
      Authorization: "Bearer" + getToken(),
    },
  });
};

const showUser = async (id: string) => {
  return await api.get("v1/user/show" + id);
};

export default {
  fetchUser,
  showUser,
  registerUser,
  loginUser,
  verify,
  logoutUser,
};
