import imageCompression from "browser-image-compression";

export const CompressImage = async (file) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 2000,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("Image compression failed:", error);
    return file;
  }
};
