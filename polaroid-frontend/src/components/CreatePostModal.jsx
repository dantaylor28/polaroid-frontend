import React, { useState, useEffect } from "react";
import { Image as ImageIcon } from "lucide-react";
import { ConfirmModal } from "../utils/ConfirmModal";
import { useTags } from "../hooks/useTags";
import { useImageCropper } from "../hooks/useImageCropper";
import { ImageCropper } from "./ImageCropper";
import axiosInstance from "../api/axios";

export const CreatePostModal = ({ onClose }) => {
  const [caption, setCaption] = useState("");
  const [openDiscardPostConfirm, setOpenDiscardPostConfirm] = useState(false);

  const {
    tags,
    tagInput,
    setTagInput,
    removeTag,
    handleTagKeyDown,
    maxTags,
    maxLength,
  } = useTags(8, 30);

  const {
    imageFile,
    imagePreview,
    croppedPreview,
    crop,
    zoom,
    aspect,
    isEditing,
    croppedAreaPixels,
    setCrop,
    setZoom,
    setAspect,
    setCroppedAreaPixels,
    handleImageChange,
    resetImage,
    toggleEdit,
  } = useImageCropper();

  // Confirm modal close while data exists in form
  const hasUnsavedData = Boolean(imagePreview) || caption || tags.length > 0;
  const handleCloseAttempt = () => {
    if (!hasUnsavedData) {
      onClose();
    } else {
      setOpenDiscardPostConfirm(true);
    }
  };

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
  }, [caption, tags, imagePreview]);

  const handleSubmitPost = async () => {
    try {
      if (!imagePreview) return;

      const formData = new FormData();
      let imageToUpload;

      if (croppedAreaPixels) {
        imageToUpload = await getCroppedImg(imagePreview, croppedAreaPixels);
      } else {
        imageToUpload = imageFile;
      }

      // Append image
      formData.append("post_image", imageToUpload, "post.jpg");

      // Append text fields
      formData.append("caption", caption);

      // Append tags (not JSON)
      tags.forEach((tag) => {
        formData.append("tags", tag);
      });

      // Send request
      await axiosInstance.post("/posts/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onClose();
    } catch (error) {
      console.error("Post upload error:", error.response?.data || error);
      console.log("ERROR RESPONSE:", error.response?.data);
    }
  };

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
      <div className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 max-h-[95vh] overflow-y-auto">
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
        </div>

        {/* Body */}
        <div className="px-5 pb-4 space-y-4">
          {/* Image area */}
          <ImageCropper
            imagePreview={imagePreview}
            croppedPreview={croppedPreview}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            isEditing={isEditing}
            setCrop={setCrop}
            setZoom={setZoom}
            setAspect={setAspect}
            setCroppedAreaPixels={setCroppedAreaPixels}
            handleImageChange={handleImageChange}
            resetImage={resetImage}
            toggleEdit={toggleEdit}
          />

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
            <label className="text-sm text-black/70">
              Tags (Max {maxLength} characters)
            </label>

            <div
              className="flex flex-wrap items-center gap-2 rounded-xl bg-gray-800/5 px-3 py-2
            focus-within:ring-2 focus-within:ring-blue-500/20 mt-0.5"
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 bg-blue-700 text-white/90
                text-xs px-3 py-1 rounded-full"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-white cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))}

              <input
                type="text"
                value={tagInput}
                onChange={(e) => {
                  if (e.target.value.length <= maxLength) {
                    setTagInput(e.target.value);
                  }
                }}
                onKeyDown={handleTagKeyDown}
                placeholder={
                  tags.length >= maxTags ? "Max tags reached" : "Add a tag.."
                }
                disabled={tags.length >= maxTags}
                className="flex-1 min-w-30 bg-transparent text-sm
                focus:outline-none placeholder:text-black/50"
              />
            </div>
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
            onClick={handleSubmitPost}
            disabled={!imagePreview || isEditing}
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
