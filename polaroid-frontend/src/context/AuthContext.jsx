import { React, createContext, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { clearTokens } from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  //   Load currentUser from existing tokens
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUser({
          username: decoded.username,
          id: decoded.user_id,
        });
      } catch (error) {
        clearTokens();
      }
    }
  }, []);
};
