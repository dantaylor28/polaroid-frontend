import { useEffect, useState } from "react";
import { CreatePostBtn } from "../components/CreatePostBtn";
import { SideBar } from "../components/SideBar";
import { useAuth } from "../context/AuthContext";
import { CreatePostModal } from "../components/CreatePostModal";
import axiosInstance from "../api/axios";

export const Home = () => {
  const { currentUser } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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
    <div className="mt-30 flex">
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

            {/* Map posts */}
            <div className="mt-6 space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 bg-white rounded-xl shadow-sm border"
                >
                  <img
                    src={post.post_image}
                    alt="post"
                    className="w-full rounded-lg mb-2"
                  />
                  <p>{post.caption}</p>
                  <div className="flex gap-2 mt-2">
                    {post.tags_display?.map((tag, i) => (
                      <span key={i} className="text-sm text-blue-500">
                        #{tag}
                      </span>
                    ))}
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
          </div>
        )}
      </div>
    </div>
  );
};
