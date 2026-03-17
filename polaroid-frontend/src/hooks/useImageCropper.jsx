import React, { useCallback, useState } from "react";
import { CompressImage } from "../utils/CompressImage";

export const useImageCropper = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1); // Default 1:1
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedPreview, setCroppedPreview] = useState(null);

  const [isEditing, setIsEditing] = useState(true); // Default start in editing mode

  const handleImageChange = async (file) => {
    if (!file) return;

    const compressedFile = await CompressImage(file);
    const previewUrl = URL.createObjectURL(compressedFile);

    setImageFile(compressedFile);
    setImagePreview(previewUrl);
    setCroppedPreview(null);
    setIsEditing(true);
  };

  const resetImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    if (croppedPreview) URL.revokeObjectURL(croppedPreview);

    setImagePreview(null);
    setImageFile(null);
    setCroppedPreview(null);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    setCroppedAreaPixels(null);
    setIsEditing(true);
  };

  const completeCrop = useCallback(async () => {
    if (!croppedAreaPixels || !imagePreview) return;

    const croppedBlob = await getCroppedImg(imagePreview, croppedAreaPixels);
    const previewUrl = URL.createObjectURL(croppedBlob);

    setCroppedPreview(previewUrl);
  }, [croppedAreaPixels, imagePreview]);

  const toggleEdit = async () => {
    if (isEditing) {
      await completeCrop();
    }

    setIsEditing((prev) => !prev);
  };
  return {
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
  };
};

// Cropper helpers

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new window.Image();
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
