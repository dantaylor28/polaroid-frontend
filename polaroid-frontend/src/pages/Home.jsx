import { useEffect, useState } from "react";
import { CreatePostBtn } from "../components/CreatePostBtn";
import { SideBar } from "../components/SideBar";
import { useAuth } from "../context/AuthContext";
import { CreatePostModal } from "../components/CreatePostModal";
import axiosInstance from "../api/axios";
import { PostDetailsModal } from "../components/PostDetailsModal";
import { PostGrid } from "../components/PostGrid";

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

  const handlePostUpdate = (updatedPost) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
    );
    setSelectedPost(updatedPost);
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

            <PostGrid posts={posts} onSelectPost={setSelectedPost} />

            {/* Modal */}
            {isCreateModalOpen && (
              <CreatePostModal
                onClose={() => setIsCreateModalOpen(false)}
                addPost={addPost}
              />
            )}

            {selectedPost && (
              <PostDetailsModal
                post={
                  posts.find((p) => p.id === selectedPost.id) || selectedPost
                }
                onClose={() => setSelectedPost(null)}
                onPostUpdate={handlePostUpdate}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
