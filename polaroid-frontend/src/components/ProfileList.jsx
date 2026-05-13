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
  const [openProfileCard, setOpenProfileCard] = useState(null);
  const [anchorRect, setAnchorRect] = useState(null);
  const { loading } = useProfiles();

  const displayProfiles = loading || searching ? [] : profilesToShow;
  return (
    <div>
      {loading || searching ? (
        <div className="flex items-center justify-center">
          <SidebarSkeleton rows={6} />
        </div>
      ) : (
        <ul>
          {displayProfiles.length === 0 &&
            debouncedQuery &&
            !searching &&
            !loading && (
              <li className="px-4 py-6 text-center text-sm text-black/50">
                No users found for "
                <span className="font-medium">{debouncedQuery}</span>"
              </li>
            )}

          {displayProfiles.map((profile) => (
            <Link
              to={`/profile/${profile.owner}`}
              key={profile.id}
              onClick={onProfileClick}
            >
              <li
                className="relative group flex items-center gap-3 px-3 py-2 mx-3 rounded-lg hover:bg-black/5 cursor-pointer transition"
                onMouseEnter={(e) => {
                  setOpenProfileCard(profile);
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
          ))}
        </ul>
      )}
      {/* Profile Hover Card */}
      {openProfileCard && anchorRect && (
        <ProfileHoverCard
          profile={openProfileCard}
          anchorRect={anchorRect}
          onClose={() => {
            setOpenProfileCard(null);
            setAnchorRect(null);
          }}
        />
      )}
    </div>
  );
};
