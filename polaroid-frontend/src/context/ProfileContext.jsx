import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { useAuth } from "./AuthContext";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { currentUser, loading: authLoading } = useAuth();

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait until AuthContext has finished determining
    // whether someone is logged in.
    if (authLoading) return;

    // Clear profiles whenever authentication state changes
    setProfiles([]);

    const fetchProfiles = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get("/profiles/");
        setProfiles(data.results);
      } catch (error) {
        console.error("Failed to fetch profiles", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, [currentUser, authLoading]);

  const updateProfile = (profileId, updates) => {
    setProfiles((previous) =>
      previous.map((profile) =>
        profile.id === profileId
          ? {
              ...profile,
              ...updates,
            }
          : profile,
      ),
    );
  };

  return (
    <ProfileContext.Provider value={{ profiles, loading, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfiles = () => useContext(ProfileContext);
