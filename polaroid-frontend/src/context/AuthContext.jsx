import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axiosInstance, { clearTokens, setTokens } from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp > now) {
        const fetchUser = async () => {
          try {
            const { data } = await axiosInstance.get("dj-rest-auth/user/");
            setCurrentUser(data);
          } catch (error) {
            clearTokens();
          }
        };
        fetchUser();
      } else {
        clearTokens();
      }
    }
  }, []);

  const login = (access, refresh, userData) => {
    setTokens(access, refresh);
    setCurrentUser(userData);
  };

  const logout = () => {
    clearTokens();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
