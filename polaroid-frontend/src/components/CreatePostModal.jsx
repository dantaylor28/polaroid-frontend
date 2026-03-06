import React, { useState, useEffect } from "react";
import { Image as ImageIcon } from "lucide-react";
import { ConfirmModal } from "../utils/ConfirmModal";
import Cropper from "react-easy-crop";
import { useTags } from "../hooks/useTags";
import { useImageCropper } from "../hooks/useImageCropper";

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
          <div className="relative">
            {imagePreview && (
              <button
                type="button"
                onClick={resetImage}
                className={`absolute top-1 right-3 z-50 size-7 rounded-full flex items-center justify-center
              text-white px-3 py-1 cursor-pointer transition ${isEditing ? "hover:bg-black/40" : "hover:bg-white/25"}`}
              >
                ×
              </button>
            )}

            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  handleImageChange(e.target.files[0]);
                }}
                className="hidden"
                id="post-image-input"
              />
            </div>

            <div className="relative w-full h-90 bg-gray-800/5 rounded-xl overflow-hidden">
              {!imagePreview ? (
                <label
                  htmlFor="post-image-input"
                  className="flex flex-col items-center justify-center h-full cursor-pointer"
                >
                  <div className="flex flex-col items-center gap-2">
                    <ImageIcon className="size-8 text-gray-500" />
                    <span className="text-sm text-black/60">
                      Select an image
                    </span>
                  </div>
                </label>
              ) : isEditing ? (
                <>
                  <Cropper
                    image={imagePreview}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspect}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={(croppedArea, croppedAreaPixels) => {
                      setCroppedAreaPixels(croppedAreaPixels);
                    }}
                    style={{
                      containerStyle: {
                        backgroundColor: "rgba(0,0,0,0.45)",
                      },
                    }}
                  />

                  {/* Aspect ratio toggle buttons */}
                  {isEditing && (
                    <div className="absolute bottom-10 right-3 left-3 flex gap-2">
                      <button
                        onClick={() => {
                          setAspect(1);
                          setCrop({ x: 0, y: 0 });
                          setZoom(1);
                        }}
                        className={`px-2 py-1 text-xs rounded cursor-pointer ${
                          aspect === 1
                            ? "bg-blue-600 text-white"
                            : "bg-black/60 text-white hover:bg-black/75"
                        }`}
                      >
                        1:1
                      </button>

                      <button
                        onClick={() => {
                          setAspect(4 / 5);
                          setCrop({ x: 0, y: 0 });
                          setZoom(1);
                        }}
                        className={`px-2 py-1 text-xs rounded cursor-pointer ${
                          aspect === 4 / 5
                            ? "bg-blue-600 text-white"
                            : "bg-black/60 text-white hover:bg-black/75"
                        }`}
                      >
                        4:5
                      </button>

                      <button
                        onClick={() => {
                          setAspect(16 / 9);
                          setCrop({ x: 0, y: 0 });
                          setZoom(1);
                        }}
                        className={`px-2 py-1 text-xs rounded cursor-pointer ${
                          aspect === 16 / 9
                            ? "bg-blue-600 text-white"
                            : "bg-black/60 text-white hover:bg-black/75"
                        }`}
                      >
                        16:9
                      </button>
                    </div>
                  )}

                  {/* Zoom slider */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={0.1}
                      value={zoom}
                      onChange={(e) => setZoom(Number(e.target.value))}
                      className="w-full cursor-pointer"
                    />
                  </div>

                  {/* Change overlay */}
                  <label
                    htmlFor="post-image-input"
                    className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/75 text-white text-xs px-3 py-1 rounded-full cursor-pointer"
                  >
                    Change
                  </label>
                </>
              ) : (
                <img
                  src={croppedPreview || imagePreview}
                  alt="Image Preview"
                  className="w-full h-full object-contain bg-black"
                />
              )}
              {/* Edit toggle button */}
              {imagePreview && (
                <button
                  type="button"
                  onClick={toggleEdit}
                  className={`absolute top-3 left-3 text-white text-xs px-3 py-1 rounded-full cursor-pointer transition ${isEditing ? "bg-black/60 hover:bg-black/75" : "bg-white/25 hover:bg-white/35"}`}
                >
                  {isEditing ? "Done" : "Edit"}
                </button>
              )}
            </div>
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

            <p className="text-sm text-black/50">
              Press Enter or Comma to add a tag (Max {maxLength} characters)
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
