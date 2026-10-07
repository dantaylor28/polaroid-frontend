import React from "react";
import { useFollow } from "../hooks/useFollow";

interface Profile {
  id: number;
  name: string;
  location: string;
  bio: string;
  owner: string;
  is_profile_owner: boolean;
  created_at: string;
  updated_at: string;
  profile_image: string;
  following_id: number | null;
  num_of_posts: number;
  num_of_pinned_posts: number;
  num_of_liked_posts: number;
  num_of_followers: number;
  num_of_following: number;
}

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
