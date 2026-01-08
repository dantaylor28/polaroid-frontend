import { useState } from "react";
import { ProfileHoverCard } from "../components/ProfileHoverCard";
import { useAuth } from "../context/AuthContext";
import { useProfiles } from "../context/ProfileContext";
import { ChevronRight } from "lucide-react";

export const SideBar = () => {
  const { currentUser } = useAuth();
  const { profiles, loading } = useProfiles();
  const [openProfileCard, setOpenProfileCard] = useState(null);
  const [anchorRect, setAnchorRect] = useState(null);
  return (
    <aside className="w-64 border-r border-black/5">
      <h2 className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-black/60 text-center">
        Suggested Users
      </h2>
      <div className="flex items-center justify-center">
        {loading && (
          <div className="flex items-center gap-2 px-4 py-2 text-sm text-black/50">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
            Loading users…
          </div>
        )}
      </div>
      <ul>
        {profiles
          .filter((profile) => profile.owner !== currentUser?.username)
          .map((profile) => (
            <li
              key={profile.id}
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
          ))}
      </ul>
      {/* Profile Hover Card */}
      {openProfileCard && anchorRect && (
        <ProfileHoverCard
          profile={openProfileCard}
          anchorRect={anchorRect}
          onMouseEnter={() => setIsCardHovered(true)}
          onClose={() => {
            setOpenProfileCard(null);
            setAnchorRect(null);
          }}
        />
      )}
    </aside>
  );
};
