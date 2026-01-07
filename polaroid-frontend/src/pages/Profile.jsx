import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export const Profile = () => {
  const { username } = useParams();
  const { currentUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Determine whose profile is being viewed
  const profileUsername = username || currentUser?.username
  const isSelf = profileUsername === currentUser?.username
  return <div></div>;
};
