import { useAuth } from "../context/AuthContext";

export const Profile = () => {
  const { currentUser } = useAuth();
  return <div>Profile Page here.. protected route
    <div>
      {!currentUser ? <p>Not logged in</p> : <h1 className="text-blue-500">Welcome, {currentUser.username}</h1>}
    </div>
  </div>;
};
