import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { useDebounce } from "../hooks/useDebounce";
import axiosInstance from "../api/axios";
import { Link, useSearchParams } from "react-router-dom";
import { PostGrid } from "../components/PostGrid";
import { LayoutDashboard, Search as SearchIcon, Users } from "lucide-react";
import { PostDetailsModal } from "../components/PostDetailsModal";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  const [activeTab, setActiveTab] = useState("profiles");

  const [searchParams] = useSearchParams();

  // Read search info from the url
  const urlSearchType = searchParams.get("type");
  const urlTab = searchParams.get("tab");

  // A tag search can come from either a user typing #something or clicking a tag, which gives us "?type=tag"
  const isTagSearch =
    urlSearchType === "tag" || debouncedQuery.trim().startsWith("#");
  // Check if search term contains a # & remove if so
  const searchTerm = debouncedQuery.trim().startsWith("#")
    ? debouncedQuery.trim().slice(1).trim()
    : debouncedQuery.trim();

  // Set initial search query from url
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  // Set active tab from url
  useEffect(() => {
    if (urlTab === "posts" || urlTab === "profiles") {
      setActiveTab(urlTab);
    }
  }, [urlTab]);

  // Automatically switch to posts if searching for a tag
  useEffect(() => {
    if (isTagSearch) {
      setActiveTab("posts");
    }
  }, [isTagSearch]);

  // Instant clearing of search results
  useEffect(() => {
    if (!query.trim()) {
      setProfiles([]);
      setPosts([]);
      setSelectedPost(null);
    }
  }, [query]);

  // Fetch search results
  useEffect(() => {
    if (!debouncedQuery.trim() || !searchTerm) {
      return;
    }

    const fetchResults = async () => {
      setLoading(true);

      try {
        if (isTagSearch) {
          // Tag search so only fetch posts
          const { data } = await axiosInstance.get(
            `/posts/?tag=${encodeURIComponent(searchTerm)}`,
          );

          setPosts(data.results);
          setProfiles([]);
        } else {
          const [profilesRes, postsRes] = await Promise.all([
            axiosInstance.get(
              `/profiles/?search=${encodeURIComponent(searchTerm)}`,
            ),
            axiosInstance.get(
              `/posts/?search=${encodeURIComponent(searchTerm)}`,
            ),
          ]);

          setProfiles(profilesRes.data.results);
          setPosts(postsRes.data.results);
        }
      } catch (error) {
        console.error("Error fetching search query", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery, isTagSearch, searchTerm]);

  const handlePostUpdate = (updatedPost) => {
    setSelectedPost(updatedPost);
    setPosts((prev) =>
      prev.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
    );
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="max-w-3xl mx-auto mt-32 px-6">
      <SearchBar
        placeholder="Search for something"
        value={query}
        onChange={setQuery}
      />

      {!debouncedQuery ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <SearchIcon className="size-12 text-gray-300 mb-4" />
          <h2 className="text-lg font-medium text-black/80">
            What are you searching for?
          </h2>
          <p className="mt-2 text-sm text-black/50 max-w-sm">
            Start typing a username, caption or tag to discover people and
            posts.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-6">
            <div className="relative flex items-center justify-center mt-8">
              <button
                onClick={() => handleTabChange("profiles")}
                className={`flex-1 flex justify-center py-3 cursor-pointer ${activeTab === "profiles" ? "text-black" : "text-black/40"}`}
                disabled={isTagSearch}
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

            {loading ? (
              <div className="flex justify-center py-16">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
              </div>
            ) : activeTab === "profiles" && !isTagSearch ? (
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
