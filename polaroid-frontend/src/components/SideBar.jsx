import { useAuth } from "../context/AuthContext";
import { useProfiles } from "../context/ProfileContext";
import SearchBar from "./SearchBar";
import { useProfileSearch } from "../hooks/useProfileSearch";
import { ProfileList } from "./ProfileList";
import { useState } from "react";
import { ProfileListHeading } from "./ProfileListHeading";

export const SideBar = () => {
  const { currentUser } = useAuth();
  const { profiles } = useProfiles();
  const [activeTab, setActiveTab] = useState("suggested");

  const {
    query,
    setQuery,
    debouncedQuery,
    searching,
    profilesToShow,
    suggestedProfiles,
    followingProfiles,
  } = useProfileSearch(profiles, currentUser);

  const displayedProfiles = currentUser
    ? activeTab === "suggested"
      ? suggestedProfiles
      : followingProfiles
    : profilesToShow;

  return (
    // <aside
    //   className={`hidden ${!currentUser && "md:hidden"} md:flex flex-col md:min-w-64 lg:min-w-76 xl:min-w-84 border-r border-black/5`}
    // >
    <aside
      className={`hidden md:flex flex-col md:min-w-64 lg:min-w-76 xl:min-w-84 border-r border-black/5`}
    >
      {/* SearchBar */}
      <SearchBar value={query} onChange={setQuery} placeholder="Search Users" />

      {currentUser && (
        <ProfileListHeading
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}

      <ProfileList
        debouncedQuery={debouncedQuery}
        searching={searching}
        profilesToShow={displayedProfiles}
        activeTab={currentUser ? activeTab : null}
      />
    </aside>
  );
};
