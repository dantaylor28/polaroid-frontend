import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ConfirmLogoutToast } from "../utils/ConfirmLogoutToast";

export const LogoutBtn = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    ConfirmLogoutToast(() => {
      logout();
      navigate("/login");
    });
  };
  return (
    <button onClick={handleLogout} className="text-red-500">
      Logout
    </button>
  );
};
