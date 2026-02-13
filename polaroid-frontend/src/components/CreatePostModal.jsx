import React, { useState, useEffect } from "react";
import { Image } from "lucide-react";

export const CreatePostModal = ({ onClose }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Image preview clean up
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

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
      <div className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl ring-1 ring-black/5">
        {/* Header */}
        <div className="relative px-5 py-4">
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
              <Image className="size-6 text-blue-600 group-hover:text-blue-700" />
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
        </div>

        {/* Body */}
        <div className="px-5 pb-4 space-y-4">
          {/* Image area */}
          <label className="block cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            <div className="relative aspect-square bg-gray-800/5 rounded-xl overflow-hidden flex items-center justify-center">
              {!imagePreview ? (
                <div className="flex flex-col items-center gap-2">
                  <Image className="size-8 text-gray-500" />
                  <span className="text-sm text-black/60">Select an image</span>
                </div>
              ) : (
                <>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />

                  {/* Change overlay */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                      Change
                    </span>
                  </div>
                </>
              )}
            </div>
          </label>

          {/* Caption */}
          <textarea
            placeholder="Write a caption..."
            rows={3}
            className="w-full resize-none rounded-xl bg-gray-800/5 px-4 py-3 text-sm
            placeholder:text-black/60
            focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />

          {imagePreview && (
            <button
              type="button"
              onClick={() => {
                URL.revokeObjectURL(imagePreview);
                setImagePreview(null);
                setImageFile(null);
              }}
              className="text-xs text-red-500 hover:underline"
            >
              Remove image
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 mx-5 border-t border-black/15">
          <button
            onClick={onClose}
            className="text-sm text-black/60 hover:text-black hover:cursor-pointer transition"
          >
            Cancel
          </button>

          <button
            disabled={!imagePreview}
            className="px-5 py-2 text-sm font-medium rounded-full
            bg-blue-600 text-white
            hover:bg-blue-700 hover:cursor-pointer
            disabled:opacity-40 disabled:cursor-not-allowed
            transition"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
