import React from "react";
import { Heart, Pin } from "lucide-react";

export const PostGrid = ({posts, onPostClick}) => {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="cursor-pointer mb-4 break-inside-avoid relative group"
          onClick={() => onPostClick(post)}
        >
          <img
            src={post.post_image}
            alt="Post image"
            className="w-full rounded-lg"
          />

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-end justify-center text-white/90 pb-2">
            <div className="flex gap-1.5">
              <Heart className="size-5" />
              <span className="text-sm">{post.num_of_likes}</span>
            </div>
            <div className="flex gap-1.5 ml-8">
              <Pin className="size-5" />
              <span className="text-sm">{post.num_of_pins}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
