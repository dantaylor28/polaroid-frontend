import React from "react";

export const ProfileSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto mt-32 px-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-6 mb-6">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-black/10" />

        {/* User info */}
        <div className="flex-1">
          {/* Username */}
          <div className="h-6 w-40 bg-black/10 rounded mb-2" />

          {/* Location */}
          <div className="h-4 w-32 bg-black/10 rounded mb-3" />

          {/* Stats */}
          <div className="flex gap-4">
            <div className="h-4 w-16 bg-black/10 rounded" />
            <div className="h-4 w-20 bg-black/10 rounded" />
            <div className="h-4 w-20 bg-black/10 rounded" />
          </div>
        </div>
      </div>
      {/* Bio */}
      <div className="flex flex-col gap-4 mt-10">
        <div className="h-3 w-132 rounded-lg bg-black/10 animate-pulse" />
        <div className="h-3 w-132 rounded-lg bg-black/10 animate-pulse" />
      </div>
    </div>
  );
};
