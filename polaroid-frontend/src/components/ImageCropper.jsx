import React from "react";
import { ImageIcon } from "lucide-react";
import Cropper from "react-easy-crop";

export const ImageCropper = ({
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
}) => {
  return (
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
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          handleImageChange(e.target.files[0]);
        }}
        className="hidden"
        id="post-image-input"
      />

      <div className="relative w-full h-90 bg-gray-800/5 rounded-xl overflow-hidden">
        {!imagePreview ? (
          <label
            htmlFor="post-image-input"
            className="flex flex-col items-center justify-center h-full cursor-pointer"
          >
            <div className="flex flex-col items-center gap-2">
              <ImageIcon className="size-8 text-gray-500" />
              <span className="text-sm text-black/60">Select an image</span>
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
  );
};
