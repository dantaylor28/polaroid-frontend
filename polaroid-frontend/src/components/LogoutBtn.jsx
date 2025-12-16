import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ConfirmLogoutModal } from "../utils/ConfirmLogoutModal";
import toast from "react-hot-toast";
import { useState } from "react";

export const LogoutBtn = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const confirmLogout = () => {
    logout();
    toast("Logged out successfully", {
      icon: "👋",
    });
    navigate("/login");
    setOpen(false);
  };
  return (
    <>
      <button onClick={() => setOpen(true)} className="text-red-500">
        Logout
      </button>

      <ConfirmLogoutModal
        open={open}
        onConfirm={confirmLogout}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};
