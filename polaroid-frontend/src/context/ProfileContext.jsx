import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axios";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
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
  }, []);

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
