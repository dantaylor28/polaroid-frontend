import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "../utils/ConfirmModal";
import toast from "react-hot-toast";
import { useState } from "react";
import { LogOut } from "lucide-react";

export const LogoutBtn = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);

  const confirmLogout = () => {
    logout();
    toast("Logged out successfully", {
      icon: "👋",
    });
    navigate("/login");
    setOpenLogoutConfirm(false);
  };
  return (
    <>
      <button
        onClick={() => setOpenLogoutConfirm(true)}
        className="px-3.5 py-1.5 rounded-full transition text-black hover:bg-red-500 hover:text-white hover:cursor-pointer"
      >
        <LogOut />
      </button>

      <ConfirmModal
        open={openLogoutConfirm}
        title="Are you sure you want to log out?"
        description="You'll need to log back in to access your account."
        confirmText="Logout"
        onConfirm={confirmLogout}
        onCancel={() => setOpenLogoutConfirm(false)}
        variant="danger"
      />
    </>
  );
};
