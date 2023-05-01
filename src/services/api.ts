import axios from "axios";
import Token from "./token";
import { API_URI } from "./../utils/env";

const production = false;

let baseURL;

if (production) {
  baseURL = API_URI;
} else {
  baseURL = API_URI;
}

const api = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config: any) => {
    const token = Token.getLocalAccessToken();

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const apiFormData = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

apiFormData.interceptors.request.use(
  async (config: any) => {
    const token = Token.getLocalAccessToken();

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api, apiFormData };
