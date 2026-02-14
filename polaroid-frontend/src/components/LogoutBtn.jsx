import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ConfirmLogoutModal } from "../utils/ConfirmModal";
import toast from "react-hot-toast";
import { useState } from "react";
import { LogOut } from "lucide-react";

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
      <button
        onClick={() => setOpen(true)}
        className="px-3.5 py-1.5 rounded-full transition text-black hover:bg-red-500 hover:text-white hover:cursor-pointer"
      >
        <LogOut />
      </button>

      <ConfirmLogoutModal
        open={open}
        onConfirm={confirmLogout}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};
