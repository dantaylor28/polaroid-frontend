import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const GuestRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <div>Loading..</div>;

  if (currentUser) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};
