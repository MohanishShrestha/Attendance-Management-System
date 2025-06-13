import axios from "axios";
import { url } from "../constant";

const API = axios.create({
  baseURL: `${url}`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Authorization Token to Requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle Global Errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
