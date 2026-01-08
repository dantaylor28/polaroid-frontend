import { SideBar } from "../components/SideBar";
import { useAuth } from "../context/AuthContext";

export const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="mt-30 flex">
      <SideBar />
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
