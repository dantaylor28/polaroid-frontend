import React from "react";
import { useEffect } from "react";
import { Image } from "lucide-react";

export const CreatePostModal = ({ onClose }) => {
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
      <div className="relative w-full max-w-lg mx-4 bg-white rounded-xl shadow-xl">
        {/* Header */}
        <div className="relative px-5 py-4">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-5 top-4 text-black/50 hover:text-black text-xl leading-none hover:cursor-pointer"
            aria-label="Close modal"
          >
            ×
          </button>
          <div className="flex w-full items-center justify-center mb-5 gap-3">
            {/* Logo */}
            <div className="size-10 rounded-xl flex items-center justify-center bg-blue-400/30 mb-2 mt-2 group hover:bg-blue-400/35">
              <Image className="size-6 text-blue-600 group-hover:text-blue-700" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-md capitalize font-medium text-black tracking-wider">
                Upload a post
              </h1>

              <p className="font-light text-black/70 text-sm">
                Fill in the form to create a post
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-4">
          {/* Caption */}
          <textarea
            placeholder="What's on your mind?"
            rows={4}
            className="w-full resize-none rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Image upload (placeholder UI) */}
          <div className="flex items-center justify-between rounded-md border px-3 py-2 text-sm text-black/60">
            <span>Add image</span>
            <button className="text-blue-600 hover:underline">Upload</button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-5 py-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md border"
          >
            Cancel
          </button>

          <button
            disabled
            className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white opacity-60 cursor-not-allowed"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
