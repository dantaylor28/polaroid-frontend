import { useAuth } from "../context/AuthContext";
import { useProfiles } from "../context/ProfileContext";
import SearchBar from "./SearchBar";
import { useProfileSearch } from "../hooks/useProfileSearch";
import { ProfileList } from "./ProfileList";

export const SideBar = () => {
  const { currentUser } = useAuth();
  const { profiles } = useProfiles();

  const { query, setQuery, debouncedQuery, searching, profilesToShow } =
    useProfileSearch(profiles, currentUser);

  return (
    <aside className="hidden md:flex flex-col md:min-w-64 lg:min-w-76 xl:min-w-84 border-r border-black/5">
      <h2 className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-black/60 text-center">
        Suggested Users
      </h2>
      {/* SearchBar */}
      <SearchBar value={query} onChange={setQuery} placeholder="Search Users" />
      <ProfileList
        debouncedQuery={debouncedQuery}
        searching={searching}
        profilesToShow={profilesToShow}
      />
    </aside>
  );
};
