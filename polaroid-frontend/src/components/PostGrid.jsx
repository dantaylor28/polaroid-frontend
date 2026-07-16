import React from "react";
import { PostCard } from "./PostCard";

export const PostGrid = ({ posts, onSelectPost }) => {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onClick={() => onSelectPost(post)} />
      ))}
    </div>
  );
};
