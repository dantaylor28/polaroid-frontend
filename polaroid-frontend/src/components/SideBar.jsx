import { useState } from "react";
import { ProfileHoverCard } from "../components/ProfileHoverCard";
import { useAuth } from "../context/AuthContext";
import { useProfiles } from "../context/ProfileContext";
import { ChevronRight } from "lucide-react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { SidebarSkeleton } from "./SidebarSkeleton";
import { useProfileSearch } from "../hooks/useProfileSearch";

export const SideBar = () => {
  const { currentUser } = useAuth();
  const { profiles, loading } = useProfiles();
  const [openProfileCard, setOpenProfileCard] = useState(null);
  const [anchorRect, setAnchorRect] = useState(null);

  const { query, setQuery, debouncedQuery, searching, profilesToShow } =
    useProfileSearch(profiles, currentUser);

  const displayProfiles = loading || searching ? [] : profilesToShow;

  return (
    <aside className="hidden md:flex flex-col md:min-w-64 lg:min-w-76 xl:min-w-84 border-r border-black/5">
      <h2 className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-black/60 text-center">
        Suggested Users
      </h2>
      {/* SearchBar */}
      <SearchBar value={query} onChange={setQuery} placeholder="Search Users" />

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
                No users found for “
                <span className="font-medium">{debouncedQuery}</span>”
              </li>
            )}

          {displayProfiles.map((profile) => (
            <Link to={`/profile/${profile.owner}`} key={profile.id}>
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
