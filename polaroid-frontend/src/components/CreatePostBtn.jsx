import { Plus } from "lucide-react";
import React from "react";

export const CreatePostBtn = ({ onClick }) => {
  return (
    <button
      className="flex gap-1 fixed bottom-10 left-1/2 -translate-x-1/2
    z-50 px-5 py-2.5 rounded-full bg-blue-600/85 hover:bg-blue-600
    text-white font-medium tracking-wider shadow-lg hover:cursor-pointer
    transition"
      onClick={onClick}
      aria-label="Create new post"
      title="Create post"
    >
      <Plus />
      Create post
    </button>
  );
};
