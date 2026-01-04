import React from "react";

export const ProfileHoverCard = ({ profile }) => {
  return (
    <div
      className="absolute left-full top-1/2 -translate-y-1/2 ml-3 w-64 rounded-b-lg bg-white border border-black/10
    shadow-lg opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
    transition-all duration-200 z-50"
    >
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={profile.profile_image || "/avatar-placeholder.png"}
            alt={profile.owner}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium">{profile.owner}</p>
            <p className="text-xs text-black/60">
              {profile.location || "No location"}
            </p>
          </div>
        </div>
        <p className="text-sm text-black/70 mb-3 line-clamp-2">
          {profile.bio || "No bio yet"}
        </p>
        {!profile.is_profile_owner && (
          <button
            className="
              w-full py-1.5 rounded-md text-sm font-medium
              bg-blue-600 text-white hover:bg-blue-700 transition
            "
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};
