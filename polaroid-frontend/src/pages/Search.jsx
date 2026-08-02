import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { useDebounce } from "../hooks/useDebounce";
import axiosInstance from "../api/axios";
import { Link } from "react-router-dom";
import { PostGrid } from "../components/PostGrid";
import { LayoutDashboard, Users } from "lucide-react";
import { PostDetailsModal } from "../components/PostDetailsModal";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  const [activeTab, setActiveTab] = useState("profiles");

  const handlePostUpdate = (updatedPost) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
    );
  };

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

  const handleTabChange = async (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="max-w-3xl mx-auto mt-32 px-6">
      <SearchBar
        placeholder="What are you searching for?"
        value={query}
        onChange={setQuery}
      />

      {debouncedQuery && (
        <>
          <div className="mt-6">
            <div className="relative flex items-center justify-center mt-8">
              <button
                onClick={() => handleTabChange("profiles")}
                className={`flex-1 flex justify-center py-3 cursor-pointer ${activeTab === "profiles" ? "text-black" : "text-black/40"}`}
              >
                <Users className="hover:text-black/70" />
              </button>

              <button
                onClick={() => handleTabChange("posts")}
                className={`flex-1 flex justify-center py-3 cursor-pointer ${activeTab === "posts" ? "text-black" : "text-black/40"}`}
              >
                <LayoutDashboard className="hover:text-black/70" />
              </button>

              <span
                className={`absolute bottom-0 h-px w-1/2 transition-all bg-black/30 duration-400 ${activeTab === "profiles" ? "left-0" : "left-1/2"}`}
              />
            </div>

            {activeTab === "profiles" ? (
              profiles.length === 0 ? (
                <p className="py-12 text-center text-sm text-black/50">
                  No users found.
                </p>
              ) : (
                <div className="space-y-3 mt-6">
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
                          {profile.bio || "No Bio"}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )
            ) : posts.length === 0 ? (
              <p className="py-12 text-center text-sm text-black/50">
                No posts found.
              </p>
            ) : (
              <PostGrid posts={posts} onSelectPost={setSelectedPost} />
            )}
          </div>
        </>
      )}

      {selectedPost && (
        <PostDetailsModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onPostUpdate={handlePostUpdate}
        />
      )}
    </div>
  );
};
