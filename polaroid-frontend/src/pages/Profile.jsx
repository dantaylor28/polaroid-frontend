import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

export const Profile = () => {
  const { username } = useParams();
  const { currentUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Determine whose profile is being viewed
  const profileUsername = username || currentUser?.username;
  const isSelf = profileUsername === currentUser?.username;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/profiles/${profileUsername}/`
        );
        setProfile(data);
      } catch (error) {
        console.log("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    };

    if (profileUsername) {
      fetchProfile();
    }
  }, [profileUsername]);

  if (loading) {
    return <p className="px-6 py-4 text-sm">Loading Profile...</p>;
  }

  if (!profile) {
    return <p className="px-6 py-4 text-sm">Profile not found</p>;
  }
  return <div></div>;
};
