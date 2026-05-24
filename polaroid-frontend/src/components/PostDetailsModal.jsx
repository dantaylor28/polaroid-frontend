import React, { useEffect } from "react";
import { Image as ImageIcon } from "lucide-react";

export const PostDetailsModal = ({ post, onClose }) => {
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
        <div className="flex-1 bg-black flex items-center justify-center">
          <img
            src={post.post_image}
            alt="post"
            className="max-h-[80vh] object-contain"
          />
        </div>

        {/* Right side */}
        <div className="w-100 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <span className="font-medium">{post.owner}</span>
            <button
              onClick={onClose}
              className="size-8 rounded-full flex items-center justify-center
            text-black/50 hover:text-black hover:bg-black/5 transition hover:cursor-pointer"
              aria-label="Close modal"
            >
              ×
            </button>
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
            {/* Like button */}
            <button className="text-xl">❤️</button>

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
