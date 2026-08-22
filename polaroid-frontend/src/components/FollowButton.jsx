import React from "react";
import { useFollow } from "../hooks/useFollow";

export const FollowButton = ({
  profile,
  setLocalProfile,
  className,
  onUnfollow,
}) => {
  const { toggleFollow } = useFollow();

  const handleClick = () => {
    if (profile.following_id && onUnfollow) {
      onUnfollow();
      return;
    }
    toggleFollow(profile, setLocalProfile);
  };
  return (
    <button className={className} onClick={handleClick}>
      {profile.following_id ? "Unfollow" : "Follow"}
    </button>
  );
};
