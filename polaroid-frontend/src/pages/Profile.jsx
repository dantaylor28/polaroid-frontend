import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { ProfileSkeleton } from "../components/ProfileSkeleton";
import { PostGrid } from "../components/PostGrid";
import { PostDetailsModal } from "../components/PostDetailsModal";
import { LayoutDashboard, Pin, Images } from "lucide-react";

export const Profile = () => {
  const { username } = useParams();
  const { currentUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [pinnedPosts, setPinnedPosts] = useState([]);
  const [hasFetchedPinnedPosts, setHasFetchedPinnedPosts] = useState(false);

  const [selectedPost, setSelectedPost] = useState(null);
  const displayedPosts = activeTab === "posts" ? posts : pinnedPosts;

  const handlePostUpdate = (updatedPost) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
    );

    setPinnedPosts((prev) =>
      prev.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
    );
    setSelectedPost(updatedPost);
  };

  // Determine whose profile is being viewed
  const profileUsername = username || currentUser?.username;
  const isSelf = profileUsername === currentUser?.username;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/profiles/${profileUsername}/`,
        );
        setProfile(data);
      } catch (error) {
        console.log("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    };

    if (profileUsername) {
      fetchProfile();
    }
  }, [profileUsername]);

  useEffect(() => {
    if (!profile) return;

    const fetchPosts = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/posts/?owner__profile=${profile.id}`,
        );
        setPosts(data.results);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };

    fetchPosts();
  }, [profile?.id]);

  const fetchPinnedPosts = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/posts/?pins__owner__profile=${profile.id}`,
      );
      setPinnedPosts(data.results);
    } catch (error) {
      console.error("Error fetching pinned posts", error);
    }
  };

  const handleTabChange = async (tab) => {
    setActiveTab(tab);

    if (tab === "pinned" && !hasFetchedPinnedPosts && profile) {
      await fetchPinnedPosts(profile.id);
      setHasFetchedPinnedPosts(true);
    }
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!profile) {
    return (
      <p className="flex justify-center mx-auto mt-32 px-6 py-4 text-sm">
        Profile not found
      </p>
    );
  }
  return (
    <div className="max-w-3xl mx-auto mt-32 px-6">
      {/* Header */}
      <div className="flex items-center gap-6 mb-6">
        <img
          src={profile.profile_image}
          alt={profile.owner}
          className="w-24 h-24 rounded-full object-cover"
        />

        <div>
          <h1 className="text-2xl font-semibold">{profile.owner}</h1>
          <p className="text-sm text-black/60">
            {profile.location || "No location"}
          </p>

          <div className="flex gap-4 mt-2 text-sm text-black/70">
            <span>{profile.num_of_posts} posts</span>
            <span>{profile.num_of_followers} followers</span>
            <span>{profile.num_of_following} following</span>
          </div>
        </div>

        {/* Actions */}
        <div className="ml-auto">
          {isSelf ? (
            <button className="px-4 py-2 text-sm rounded-md border">
              Edit profile
            </button>
          ) : (
            <button className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">
              Follow
            </button>
          )}
        </div>
      </div>

      <div className="bg-white border border-black/10 rounded-lg p-4">
        <h2 className="font-medium mb-2">Bio</h2>
        <p className="text-sm text-black/70">
          {profile.bio || "This user hasn’t written a bio yet."}
        </p>
      </div>
      <div className="relative flex items-center justify-center mt-8">
        <button
          onClick={() => handleTabChange("posts")}
          className={`flex-1 flex justify-center py-3 cursor-pointer ${activeTab === "posts" ? "text-black" : "text-black/40"}`}
        >
          <LayoutDashboard className="hover:text-black/70" />
        </button>

        <button
          onClick={() => handleTabChange("pinned")}
          className={`flex-1 flex justify-center py-3 cursor-pointer ${activeTab === "pinned" ? "text-black" : "text-black/40"}`}
        >
          <Pin className="hover:text-black/70" />
        </button>

        <span
          className={`absolute bottom-0 h-px w-1/2 transition-all bg-black/30 duration-400 ${activeTab === "posts" ? "left-0" : "left-1/2"}`}
        />
      </div>
      {displayedPosts.length === 0 ? (
        <div className="py-12 text-center text-sm text-black/70">
          {activeTab === "posts" ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <Images className="size-12 text-gray-400" />
              <p>
                <span className="capitalize">{profile.owner}</span> doesn't have
                any posts yet.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4">
              <Images className="size-12 text-gray-400" />
              <p>
                <span className="capitalize">{profile.owner}</span> doesn't have
                any pinned posts yet.
              </p>
            </div>
          )}
        </div>
      ) : (
        <PostGrid posts={displayedPosts} onSelectPost={setSelectedPost} />
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
