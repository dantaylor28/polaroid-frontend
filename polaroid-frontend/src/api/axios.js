import axios from "axios";

const BASE_URL = "https://social-media-api-9cgk.onrender.com";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // required for cross-origin requests if cookies are used
});

// Token Utilities
const getAccessToken = () => localStorage.getItem("access_token");
const getRefreshToken = () => localStorage.getItem("refresh_token");

export const setTokens = (access, refresh) => {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
};

export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

// Token Refresh Queue
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) promise.reject(error);
    else promise.resolve(token);
  });
  failedQueue = [];
};

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const skipAuth = [
      "/dj-rest-auth/login",
      "/dj-rest-auth/registration",
      "/dj-rest-auth/token/refresh",
    ];

    if (skipAuth.some((url) => config.url.includes(url))) {
      return config;
    }

    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log(
      //   "➡️ REQUEST INTERCEPTOR — sending:",
      //   config.url,
      //   "with token"
      // );
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only handle 401 once
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch(Promise.reject);
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token available");

        // console.log("Refreshing token using:", refreshToken);

        const { data } = await axios.post(
          `${BASE_URL}/dj-rest-auth/token/refresh/`,
          {
            refresh: refreshToken,
          }
        );

        // console.log("Received new tokens:", data);

        const newAccess = data.access;
        const newRefresh = data.refresh || refreshToken; // Fallback if server doesn't rotate
        setTokens(newAccess, newRefresh);

        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccess}`;
        processQueue(null, newAccess);

        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        clearTokens();

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
