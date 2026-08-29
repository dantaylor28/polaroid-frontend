import { useAuth } from "../context/AuthContext";
import { useProfiles } from "../context/ProfileContext";
import SearchBar from "./SearchBar";
import { useProfileSearch } from "../hooks/useProfileSearch";
import { ProfileList } from "./ProfileList";
import { useState } from "react";

export const SideBar = () => {
  const { currentUser } = useAuth();
  const { profiles } = useProfiles();
  const [activeTab, setActiveTab] = useState("suggested");

  const { query, setQuery, debouncedQuery, searching, profilesToShow } =
    useProfileSearch(profiles, currentUser);

  const suggestedProfiles = profilesToShow.filter(
    (profile) => !profile.following_id,
  );

  const followingProfiles = profilesToShow.filter(
    (profile) => profile.following_id,
  );

  const displayedProfiles =
    activeTab === "suggested" ? suggestedProfiles : followingProfiles;

  return (
    <aside className="hidden md:flex flex-col md:min-w-64 lg:min-w-76 xl:min-w-84 border-r border-black/5">

      {/* SearchBar */}
      <SearchBar value={query} onChange={setQuery} placeholder="Search Users" />

      <div className="relative flex mb-6 mt-2 mx-4">
        <button
          onClick={() => setActiveTab("suggested")}
          className={`flex-1 py-3 text-sm hover:text-black cursor-pointer transition ${
            activeTab === "suggested" ? "text-black" : "text-black/40"
          }`}
        >
          Suggested
        </button>

        <button
          onClick={() => setActiveTab("following")}
          className={`flex-1 py-3 text-sm hover:text-black cursor-pointer transition ${
            activeTab === "following" ? "text-black" : "text-black/40"
          }`}
        >
          Following
        </button>

        <span
          className={`absolute bottom-0 h-px w-1/2 bg-black/30 transition-all duration-300 ${
            activeTab === "suggested" ? "left-0" : "left-1/2"
          }`}
        />
      </div>

      <ProfileList
        debouncedQuery={debouncedQuery}
        searching={searching}
        profilesToShow={displayedProfiles}
        activeTab={activeTab}
      />
    </aside>
  );
};
