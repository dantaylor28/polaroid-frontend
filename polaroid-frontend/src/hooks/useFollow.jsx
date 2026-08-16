import React from "react";
import { useProfiles } from "../context/ProfileContext";
import axiosInstance from "../api/axios";

export const useFollow = () => {
  const { updateProfile } = useProfiles();

  const toggleFollow = async (profile, setLocalProfile) => {
    try {
      if (profile.following_id) {
        await axiosInstance.delete(`/followers/${profile.following_id}`);

        const updates = {
          following_id: null,
          num_of_followers: profile.num_of_followers - 1,
        };

        updateProfile(profile.id, updates);

        if (setLocalProfile) {
          setLocalProfile((previous) => ({
            ...previous,
            ...updates,
          }));
        }
      } else {
        const { data } = await axiosInstance.post("/followers/", {
          followed: profile.id,
        });

        const updates = {
          following_id: data.id,
          num_of_followers: profile.num_of_followers + 1,
        };

        updateProfile(profile.id, updates);

        if (setLocalProfile) {
          setLocalProfile((previous) => ({
            ...previous,
            ...updates,
          }));
        }
      }
    } catch (error) {
      console.error("Error updating following state", error);
    }
  };
  return { toggleFollow };
};
