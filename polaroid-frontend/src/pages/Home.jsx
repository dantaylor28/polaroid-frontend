import { useAuth } from "../context/AuthContext";
import { useProfiles } from "../context/ProfileContext";

export const Home = () => {
  const { currentUser } = useAuth();
  const { profiles, loading } = useProfiles();

  return (
    <div className="mt-30 flex">
      <aside className="w-56 border-r border-black/10">
        <h2 className="px-4 py-3 font-semibold">Users</h2>
        {loading ? <p className="px-4 text-sm">Loading users…</p> : ""}
        <ul>
          {profiles
            .filter((profile) => profile.owner !== currentUser?.username)
            .map((profile) => (
              <li
                key={profile.id}
                className="flex items-center gap-3 px-4 py-2 hover:bg-black/5 cursor-pointer"
              >
                <img
                  src={profile.profile_image || "/avatar-placeholder.png"}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm">{profile.owner}</span>
              </li>
            ))}
        </ul>
      </aside>
      <div>
        {!currentUser ? (
          <p>Not logged in</p>
        ) : (
          <div>
            <h1 className="text-blue-500">Welcome, {currentUser.username}</h1>
          </div>
        )}
      </div>
    </div>
  );
};
