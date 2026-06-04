import { useEffect, useState } from "react";
import { CreatePostBtn } from "../components/CreatePostBtn";
import { SideBar } from "../components/SideBar";
import { useAuth } from "../context/AuthContext";
import { CreatePostModal } from "../components/CreatePostModal";
import axiosInstance from "../api/axios";
import { PostDetailsModal } from "../components/PostDetailsModal";
import { Heart, Pin } from "lucide-react";

export const Home = () => {
  const { currentUser } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosInstance.get("/posts/");
        setPosts(data.results);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };

    fetchPosts();
  }, []);

  const addPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div className="pt-32 flex">
      <SideBar />
      <div>
        {!currentUser ? (
          <p>Not logged in</p>
        ) : (
          <div className="pb-28">
            <h1 className="text-blue-500">Welcome, {currentUser.username}</h1>
            <CreatePostBtn
              onClick={() => {
                setIsCreateModalOpen(true);
              }}
            />

            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="cursor-pointer mb-4 break-inside-avoid relative group"
                  onClick={() => {
                    setSelectedPost(post);
                  }}
                >
                  <img
                    src={post.post_image}
                    alt="Post image"
                    className="w-full rounded-lg"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-end justify-center text-white/90 pb-2">
                    <div className="flex gap-1.5">
                      <Heart className="size-5" />
                      <span className="text-sm">0</span>
                    </div>
                    <div className="flex gap-1.5 ml-8">
                      <Pin className="size-5" />
                      <span className="text-sm">0</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal */}
            {isCreateModalOpen && (
              <CreatePostModal
                onClose={() => setIsCreateModalOpen(false)}
                addPost={addPost}
              />
            )}

            {selectedPost && (
              <PostDetailsModal
                post={selectedPost}
                onClose={() => setSelectedPost(null)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
