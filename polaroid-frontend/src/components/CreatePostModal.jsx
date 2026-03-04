import React, { useState, useEffect } from "react";
import { Image as ImageIcon } from "lucide-react";
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
  const [aspect, setAspect] = useState(1); // Default 1:1
  const [isEditing, setIsEditing] = useState(true); // Default start in editing mode
  const [croppedPreview, setCroppedPreview] = useState(null);

  // Tag helper functions
  const addTag = (value) => {
    const trimmed = value.trim().replace(/^#/, ""); // Remove whitespace and hashtag from start of tag

    if (!trimmed) return; // Tag is empty
    if (trimmed.length > MAX_TAG_LENGTH) return; // Longer than max length
    if (tags.includes(trimmed.toLowerCase())) return; // Tag already exists (in any form react, React, REACT etc)
    if (tags.length >= MAX_TAGS) return; // Too many tags on one post

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
    setCroppedPreview(null);
    setIsEditing(true);
  };

  // Confirm modal close while data exists in form
  const hasUnsavedData = Boolean(imagePreview) || caption || tags.length > 0;
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
                onClick={() => {
                  if (croppedPreview) {
                    URL.revokeObjectURL(croppedPreview);
                  }
                  URL.revokeObjectURL(imagePreview);
                  setImagePreview(null);
                  setImageFile(null);
                  setCroppedPreview(null);
                  setZoom(1);
                  setCrop({ x: 0, y: 0 });
                  setCroppedAreaPixels(null);
                  setIsEditing(true);
                }}
                className={`absolute top-1 right-3 z-50 size-7 rounded-full flex items-center justify-center
              text-white px-3 py-1 cursor-pointer transition ${isEditing ? "hover:bg-black/35" : "hover:bg-white/25"}`}
              >
                ×
              </button>
            )}

            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
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
                            : "bg-black/60 text-white"
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
                            : "bg-black/60 text-white"
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
                            : "bg-black/60 text-white"
                        }`}
                      >
                        16:9
                      </button>
                    </div>
                  )}

                  {/* zoom slider */}
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
                    className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full cursor-pointer"
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
                  onClick={async () => {
                    if (isEditing && croppedAreaPixels) {
                      const croppedBlob = await getCroppedImg(
                        imagePreview,
                        croppedAreaPixels,
                      );

                      const previewUrl = URL.createObjectURL(croppedBlob);
                      setCroppedPreview(previewUrl);
                    }

                    setIsEditing((prev) => !prev);
                  }}
                  className={`absolute top-3 left-3 text-white text-xs px-3 py-1 rounded-full cursor-pointer transition ${isEditing ? "bg-black/60" : "hover:bg-white/25"}`}
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

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

const getCroppedImg = async (imageSrc, cropPixels) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = cropPixels.width;
  canvas.height = cropPixels.height;

  ctx.drawImage(
    image,
    cropPixels.x,
    cropPixels.y,
    cropPixels.width,
    cropPixels.height,
    0,
    0,
    cropPixels.width,
    cropPixels.height,
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, "image/jpeg");
  });
};
