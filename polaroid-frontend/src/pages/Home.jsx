import { useState } from "react";
import { CreatePostBtn } from "../components/CreatePostBtn";
import { SideBar } from "../components/SideBar";
import { useAuth } from "../context/AuthContext";
import { CreatePostModal } from "../components/CreatePostModal";

export const Home = () => {
  const { currentUser } = useAuth();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

            {/* Modal */}
            {isCreateModalOpen && (
              <CreatePostModal onClose={() => setIsCreateModalOpen(false)} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
