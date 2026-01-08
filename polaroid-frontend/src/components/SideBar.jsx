import { useState } from "react";
import { ProfileHoverCard } from "../components/ProfileHoverCard";
import { useAuth } from "../context/AuthContext";
import { useProfiles } from "../context/ProfileContext";

export const SideBar = () => {
  const { currentUser } = useAuth();
  const { profiles, loading } = useProfiles();
  const [openProfileCard, setOpenProfileCard] = useState(null);
  const [anchorRect, setAnchorRect] = useState(null);
  return (
    <aside className="w-56 border-r border-black/10">
      <h2 className="px-4 py-3 font-semibold">Users</h2>
      <div className="flex items-center justify-center">
        {loading ? (
          <div className="h-7 w-7 animate-spin rounded-full border-3 border-black/40 border-t-black" />
        ) : (
          ""
        )}
      </div>
      <ul>
        {profiles
          .filter((profile) => profile.owner !== currentUser?.username)
          .map((profile) => (
            <li
              key={profile.id}
              className="relative group flex items-center gap-3 px-4 py-2 hover:bg-black/5 cursor-pointer"
              onMouseEnter={(e) => {
                setOpenProfileCard(profile);
                setAnchorRect(e.currentTarget.getBoundingClientRect());
              }}
            >
              <img
                src={profile.profile_image || "/avatar-placeholder.png"}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-sm">{profile.owner}</span>
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
