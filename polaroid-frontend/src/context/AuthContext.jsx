import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance, { clearTokens, setTokens } from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const access = localStorage.getItem("access_token");
    const refresh = localStorage.getItem("refresh_token");

    // No tokens at all → user not logged in
    if (!access || !refresh) {
      setLoading(false);
      return;
    }

    // Always attempt to get the user.
    // If access token is expired, axios interceptor will refresh it.
    const fetchUser = async () => {
      try {
        const { data } = await axiosInstance.get("/dj-rest-auth/user/");
        setCurrentUser(data);
      } catch (error) {
        clearTokens();
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (access, refresh) => {
    setTokens(access, refresh);

    try {
    //   console.log("Fetching user after login..");
      const { data } = await axiosInstance.get("/dj-rest-auth/user/");
    //   console.log("Logged in user:", data);
      setCurrentUser(data);
    } catch (error) {
      console.log("Failed to fetch user after login", error.response?.data);
      clearTokens();
    }
  };

  const logout = () => {
    clearTokens();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        login,
        logout,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
