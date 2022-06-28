import axios from "axios";
import authService from "./authService";

const API_URL = import.meta.env.VITE_API_URL;

const instance = axios.create({
  // headers: {
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  //   "Content-Type": "application/json",
  // },
  withCredentials: true,
  baseURL: API_URL,
});

// instance.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
//   return config;
// });

instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest.url.includes("/auth/refresh")
    ) {
      localStorage.removeItem('isAuth')
      return Promise.reject(error);
    } else if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await authService.refresh();
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default instance;
