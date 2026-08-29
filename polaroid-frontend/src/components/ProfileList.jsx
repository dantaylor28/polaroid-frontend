import { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarSkeleton } from "./SidebarSkeleton";
import { ChevronRight } from "lucide-react";
import { ProfileHoverCard } from "../components/ProfileHoverCard";
import { useProfiles } from "../context/ProfileContext";

export const ProfileList = ({
  debouncedQuery,
  searching,
  profilesToShow,
  onProfileClick,
}) => {
  const [openProfileId, setOpenProfileId] = useState(null);
  const [anchorRect, setAnchorRect] = useState(null);
  const { profiles, loading } = useProfiles();

  const displayProfiles = loading || searching ? [] : profilesToShow;

  const selectedProfile = profiles.find(
    (profile) => profile.id === openProfileId,
  );

  const showEmptyState = !loading && !searching && displayProfiles.length === 0;
  return (
    <div>
      {loading || searching ? (
        <div className="flex items-center justify-center">
          <SidebarSkeleton rows={6} />
        </div>
      ) : (
        <ul>
          {showEmptyState ? (
            <li className="px-4 py-8 text-center text-sm text-black/50">
              {debouncedQuery ? (
                <>
                  No users found for "
                  <span className="font-medium">{debouncedQuery}</span>"
                </>
              ) : (
                <span>No users to display.</span>
              )}
            </li>
          ) : (
            displayProfiles.map((profile) => (
              <Link
                to={`/profile/${profile.owner}`}
                key={profile.id}
                onClick={onProfileClick}
              >
                <li
                  className="relative group flex items-center gap-3 px-3 py-2 mx-3 rounded-lg hover:bg-black/5 cursor-pointer transition"
                  onMouseEnter={(e) => {
                    setOpenProfileId(profile.id);
                    setAnchorRect(e.currentTarget.getBoundingClientRect());
                  }}
                >
                  <img
                    src={profile.profile_image || "/avatar-placeholder.png"}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-black/5"
                  />
                  <span className="text-sm font-medium text-black/70 capitalize group-hover:text-black">
                    {profile.owner}
                  </span>
                  <div className="absolute right-2 text-black/15 group-hover:text-black/30 transition">
                    <ChevronRight />
                  </div>
                </li>
              </Link>
            ))
          )}
        </ul>
      )}
      {/* Profile Hover Card */}
      {selectedProfile && anchorRect && (
        <ProfileHoverCard
          profile={selectedProfile}
          anchorRect={anchorRect}
          onClose={() => {
            setOpenProfileId(null);
            setAnchorRect(null);
          }}
        />
      )}
    </div>
  );
};
