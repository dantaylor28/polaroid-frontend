import { useAuth } from "../context/AuthContext";

export const Home = () => {
  const { currentUser } = useAuth();
  return (
    <div>
      Home page.. Landing page
      <div>
        {!currentUser ? (
          <p>Not logged in</p>
        ) : (
          <h1 className="text-blue-500">Welcome, {currentUser.username}</h1>
        )}
      </div>
    </div>
  );
};
