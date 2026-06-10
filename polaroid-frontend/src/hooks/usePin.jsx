import React from "react";
import axiosInstance from "../api/axios";

export const usePin = (onPostUpdate) => {
  const togglePin = async (post) => {
    try {
      if (post.pinned_id) {
        await axiosInstance.delete(`/pins/${post.pinned_id}`);

        onPostUpdate({
          ...post,
          pinned_id: null,
          num_of_pins: post.num_of_pins - 1,
        });
      } else {
        const { data } = await axiosInstance.post("/pins/", {
          post: post.id,
        });

        onPostUpdate({
          ...post,
          pinned_id: data.id,
          num_of_pins: post.num_of_pins + 1,
        });
      }
    } catch (error) {
      console.error("Error updating pin", error);
    }
  };

  return { togglePin };
};
