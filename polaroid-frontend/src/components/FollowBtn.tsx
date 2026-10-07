import React from "react";
import { useFollow } from "../hooks/useFollow";
import type { Profile } from "../types/profile";
interface FollowButtonProps {
  profile: Profile;
  setLocalProfile?: React.Dispatch<React.SetStateAction<Profile>>;
  className: string;
  onUnfollow?: () => void;
}

export const FollowButton = ({
  profile,
  setLocalProfile,
  className,
  onUnfollow,
}: FollowButtonProps) => {
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
