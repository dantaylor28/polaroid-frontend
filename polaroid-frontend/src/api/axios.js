import axios from "axios";
import jwtDecode from "jwt-decode";

const BASE_URL = "add live api url here when deployed through render";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

