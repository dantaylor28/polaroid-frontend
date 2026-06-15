import React from "react";
import axiosInstance from "../api/axios";

export const useToggleAction = (onPostUpdate) => {
  const toggleAction = async ({ post, endpoint, idField, countField }) => {
    try {
      if (post[idField]) {
        await axiosInstance.delete(`/${endpoint}/${post[idField]}`);

        onPostUpdate({
          ...post,
          [idField]: null,
          [countField]: post[countField] - 1,
        });
      } else {
        const { data } = await axiosInstance.post(`/${endpoint}/`, {
          post: post.id,
        });

        onPostUpdate({
          ...post,
          [idField]: data.id,
          [countField]: post[countField] + 1,
        });
      }
    } catch (error) {
      console.error(`Error updating ${endpoint}`, error);
    }
  };
  return { toggleAction };
};
