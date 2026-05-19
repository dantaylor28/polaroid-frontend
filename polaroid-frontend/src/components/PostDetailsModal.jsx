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
      <div className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 max-h-[95vh] overflow-y-auto">
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
      </div>
    </div>
  );
};
