import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// interceptor JWT (UNUL SINGUR)
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    console.log("🔥 INTERCEPTOR CALLED | url =", config.url);
  console.log("🔥 INTERCEPTOR TOKEN =", token);
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const followUser = async (username: string) => {
  await api.post(`/follow/${username}`);
};

export const unfollowUser = async (username: string) => {
  await api.delete(`/follow/unfollow/${username}`);
};

