import axios from "axios";

// Use environment variable if available, otherwise fallback to relative path
const baseURL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: baseURL,
});

// Attach token automatically if user is logged in
api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
