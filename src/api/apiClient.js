import axios from "axios";
import { getToken } from "../auth/authService";

const apiClient = axios.create({
  baseURL: "http://localhost:4002/api/helphub/",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default apiClient;
