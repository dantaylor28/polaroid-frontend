import React, { useState, useEffect } from "react";
import { Image } from "lucide-react";
import { ConfirmModal } from "../utils/ConfirmModal";
import Cropper from "react-easy-crop";

export const CreatePostModal = ({ onClose }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [openDiscardPostConfirm, setOpenDiscardPostConfirm] = useState(false);

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const MAX_TAG_LENGTH = 30;
  const MAX_TAGS = 8;

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Tag helper functions
  const addTag = (value) => {
    const trimmed = value.trim().replace(/^#/, ""); // Remove whitespace and hashtag from start of tag

    if (!trimmed) return; // Tag is empty
    if (trimmed.length > MAX_TAG_LENGTH) return; // Longer than max length
    if (tags.includes(trimmed.toLowerCase())) return; // Tag already exists (in any form react, React, REACT etc)
    if (tags.length > MAX_TAGS) return; // Too many tags on one post

    setTags((prev) => [...prev, trimmed.toLowerCase()]); // Add new tag to state
    setTagInput(""); // Clear tag input
  };

  const removeTag = (tagToRemove) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
    }

    // Remove last tag using backspace if input is empty
    if (e.key === "Backspace" && !tagInput && tags.length) {
      e.preventDefault();
      removeTag(tags[tags.length - 1]);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Confirm modal close while data exists in form
  const hasUnsavedData = Boolean(imagePreview) || caption;
  const handleCloseAttempt = () => {
    if (!hasUnsavedData) {
      onClose();
    } else {
      setOpenDiscardPostConfirm(true);
    }
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
      if (e.key === "Escape") handleCloseAttempt();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [handleCloseAttempt]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleCloseAttempt}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="relative px-5 py-4">
          <button
            onClick={handleCloseAttempt}
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
          <div className="relative">
            {imagePreview && (
              <button
                type="button"
                onClick={() => {
                  URL.revokeObjectURL(imagePreview);
                  setImagePreview(null);
                  setImageFile(null);
                }}
                className="absolute top-1 right-3 z-50 size-7 rounded-full flex items-center justify-center
                text-black/70 hover:text-black hover:bg-black/15 transition hover:cursor-pointer"
              >
                ×
              </button>
            )}
            <label className="block cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 bg-gray-800/5 rounded-xl overflow-hidden flex items-center justify-center">
                {!imagePreview ? (
                  <div className="flex flex-col items-center gap-2">
                    <Image className="size-8 text-gray-500" />
                    <span className="text-sm text-black/60">
                      Select an image
                    </span>
                  </div>
                ) : (
                  <>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />

                    {/* Change overlay */}
                    <div className="absolute bottom-3 right-3">
                      <span className="bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                        Change
                      </span>
                    </div>
                  </>
                )}
              </div>
            </label>
          </div>
          {/* Caption */}
          <textarea
            placeholder="Write a caption..."
            rows={3}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full resize-none rounded-xl bg-gray-800/5 px-4 py-3 text-sm
            placeholder:text-black/60
            focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-sm text-black/70">Tags</label>

            <div
              className="flex flex-wrap items-center gap-2 rounded-xl bg-gray-800/5 px-3 py-2
            focus-within:ring-2 focus-within:ring-blue-500/20"
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 bg-blue-100 text-blue-700
                text-xs px-3 py-1 rounded-full"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              ))}

              <input
                type="text"
                value={tagInput}
                onChange={(e) => {
                  if (e.target.value.length <= MAX_TAG_LENGTH) {
                    setTagInput(e.target.value);
                  }
                }}
                onKeyDown={handleTagKeyDown}
                placeholder={
                  tags.length >= MAX_TAGS ? "Max tags reached" : "Add a tag.."
                }
                disabled={tags.length >= MAX_TAGS}
                className="flex-1 min-w-30 bg-transparent text-sm
                focus:outline-none placeholder:text-black/50"
              />
            </div>

            <p className="text-sm text-black/50">
              Press Enter or Comma to add a tag (Max {MAX_TAG_LENGTH}{" "}
              characters)
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 mx-5 border-t border-black/15">
          <button
            onClick={handleCloseAttempt}
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
      <ConfirmModal
        open={openDiscardPostConfirm}
        title="Discard this post?"
        description="All of your changes will be lost."
        confirmText="Discard"
        cancelText="Keep editing"
        onConfirm={() => {
          setOpenDiscardPostConfirm(false);
          onClose();
        }}
        onCancel={() => {
          setOpenDiscardPostConfirm(false);
        }}
        variant="danger"
      />
    </div>
  );
};
