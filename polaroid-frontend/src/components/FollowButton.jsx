import React from "react";
import { useFollow } from "../hooks/useFollow";

export const FollowButton = ({ profile, setLocalProfile, className }) => {
  const { toggleFollow } = useFollow();
  return (
    <button
      className={className}
      onClick={() => toggleFollow(profile, setLocalProfile)}
    >
      {profile.following_id ? "Unfollow" : "Follow"}
    </button>
  );
};
