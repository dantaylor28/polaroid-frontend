import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { useDebounce } from "../hooks/useDebounce";
import axiosInstance from "../api/axios";
import { Link } from "react-router-dom";
import { PostGrid } from "../components/PostGrid";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setProfiles([]);
      setPosts([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);

      try {
        const [profilesRes, postsRes] = await Promise.all([
          axiosInstance.get(`/profiles/?search=${debouncedQuery}`),
          axiosInstance.get(`/posts/?search=${debouncedQuery}`),
        ]);

        setProfiles(profilesRes.data.results);
        setPosts(postsRes.data.results);
      } catch (error) {
        console.error("Error fetching search query", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);
  return (
    <div className="max-w-3xl mx-auto mt-32 px-6">
      <SearchBar
        placeholder="What are you searching for?"
        value={query}
        onChange={setQuery}
      />

      <div className="mt-6">
        {/* Users */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Users</h2>

          {profiles.length === 0 ? (
            <p className="text-sm text-black/50">No users found.</p>
          ) : (
            <div className="space-y-3">
              {profiles.map((profile) => (
                <Link
                  key={profile.id}
                  to={`/profile/${profile.owner}`}
                  className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50 transition"
                >
                  <img
                    src={profile.profile_image}
                    alt={profile.owner}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-medium">{profile.owner}</p>
                    <p className="text-sm text-black/50">
                      {profile.bio || "No bio"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Posts */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold mb-4">Posts</h2>

          {posts.length === 0 ? (
            <p className="text-sm text-black/50">No posts found.</p>
          ) : (
            <PostGrid posts={posts} onSelectPost={setSelectedPost} />
          )}
        </section>
      </div>
    </div>
  );
};
