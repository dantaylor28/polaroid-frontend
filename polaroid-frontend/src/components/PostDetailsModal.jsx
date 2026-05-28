import React, { useEffect, useState } from "react";
import { Image as ImageIcon, Heart, Pin } from "lucide-react";
import { Link } from "react-router-dom";

export const PostDetailsModal = ({ post, onClose }) => {
  const [liked, setLiked] = useState(false);
  const [pinned, setPinned] = useState(false);
  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="flex relative w-full max-w-5xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] ring-1 ring-black/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {/* <div className="relative px-5 py-4">
          <button
            onClick={onClose}
            className="absolute right-5 top-4 size-8 rounded-full flex items-center justify-center
           text-black/50 hover:text-black hover:bg-black/5 transition hover:cursor-pointer"
            aria-label="Close modal"
          >
            ×
          </button>
          <div className="flex w-full items-center justify-center gap-3">
            <div className="size-10 rounded-xl flex items-center justify-center bg-blue-400/30 mb-2 mt-2 group hover:bg-blue-400/35">
              <ImageIcon className="size-6 text-blue-600 group-hover:text-blue-700" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-md capitalize font-medium text-black tracking-wider">
                Share a post
              </h1>
              <p className="font-light text-black/70 text-sm">
                Fill in the form to create a post
              </p>
            </div>
          </div>
        </div> */}

        {/* Left side */}
        <div className="w-full h-full object-contain max-h-[95vh] flex-1 bg-black flex items-center justify-center">
          <img
            src={post.post_image}
            alt="post"
            className="max-h-[80vh] object-contain"
          />
        </div>

        {/* Right side */}
        <div className="w-100 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4">
            <Link
              to={`/profile/${post.owner}`}
              className="flex items-center gap-2"
            >
              <img
                src={post.profile_image || "/avatar-placeholder.png"}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-black/5"
              />
              <span className="text-sm font-medium text-black/70 capitalize group-hover:text-black">
                {post.owner}
              </span>
            </Link>
            <button
              onClick={onClose}
              className="size-8 rounded-full flex items-center justify-center
            text-black/50 hover:text-black hover:bg-black/5 transition hover:cursor-pointer"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
          <div className="border-b mx-5 border-black/10" />
          <div className="flex items-center px-4 py-4 gap-4">
            {/* Like button */}
            <div className="flex items-center gap-1">
              <button
                className={`${liked ? "text-red-500" : "text-gray-300"} cursor-pointer ${!liked ? "hover:text-red-500/80" : ""} transition`}
                onClick={() => setLiked((prev) => !prev)}
              >
                <Heart
                  className="size-6.5"
                  fill={liked ? "currentColor" : "none"}
                />
              </button>
              <span className="text-sm">0</span>
            </div>
            {/* Pin button */}
            <div className="flex items-center gap-1 text-sm">
              <button
                className={`${pinned ? "text-blue-600" : "text-gray-300"} cursor-pointer ${!pinned ? "hover:text-blue-600/80" : ""} transition`}
                onClick={() => setPinned((prev) => !prev)}
              >
                <Pin
                  className="size-6.5"
                  fill={pinned ? "currentColor" : "none"}
                />
              </button>
              <span className="text-sm">{post.num_of_pins}</span>
            </div>
          </div>

          {/* Caption/Tags */}
          <div className="px-4 py-3 space-y-2 border-b">
            <p className="text-sm">{post.caption}</p>

            <div className="flex flex-wrap gap-2">
              {post.tags_display.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-200 px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
            {/* Replace with actual comments later */}
            <p className="text-sm text-gray-500">No comments yet..</p>
          </div>

          {/* Actions */}
          <div className="border-t px-4 py-3 space-y-2">
            {/* Add comment */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 text-sm border rounded-full px-3 py-1"
              />
              <button className="text-blue-500 text-sm">Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
