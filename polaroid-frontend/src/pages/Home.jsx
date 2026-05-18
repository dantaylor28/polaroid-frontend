import { useEffect, useState } from "react";
import { CreatePostBtn } from "../components/CreatePostBtn";
import { SideBar } from "../components/SideBar";
import { useAuth } from "../context/AuthContext";
import { CreatePostModal } from "../components/CreatePostModal";
import axiosInstance from "../api/axios";
import { PostDetailsModal } from "../components/PostDetailsModal";

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
                <div key={post.id} className="mb-4 break-inside-avoid">
                  <img
                    src={post.post_image}
                    alt="Post image"
                    className="w-full rounded-lg cursor-pointer"
                    onClick={() => {
                      setSelectedPost(post);
                    }}
                  />
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
