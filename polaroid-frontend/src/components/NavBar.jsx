import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogoutBtn } from "./LogoutBtn";
import { House } from "lucide-react";
import { ConfirmModal } from "../utils/ConfirmModal";
import toast from "react-hot-toast";
import { MobileSidebar } from "./MobileSidebar";

export const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const { pathname } = useLocation();
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);
  const navigate = useNavigate();

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
      <nav className="fixed top-0 left-0 w-full z-50 bg-transparent">
        {/* Centered container */}
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <MobileSidebar />
            {/* Logo */}
            <Link to="/" className="hidden md:flex text-2xl font-bold text-blue-700 px-3.5">
              Polaroid
            </Link>

            {/* Nav Links */}
            <div
              className={`flex items-center gap-4 rounded-full px-4 py-2 shadow-sm backdrop-blur-lg ${isAuthPage ? "bg-white/10 border border-white/10" : "bg-white/60 border border-white/30"} `}
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-full transition ${
                    isAuthPage
                      ? isActive
                        ? "text-white bg-white/30"
                        : "text-white/50 bg-white/10 hover:text-white hover:bg-white/20"
                      : isActive
                        ? "bg-gray-100 text-black shadow-sm"
                        : "text-gray-700 hover:bg-gray-100 hover:text-black"
                  }`
                }
              >
                <House />
              </NavLink>

              {currentUser ? (
                <>
                  <NavLink
                    to="/profile"
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-1 rounded-full transition font-medium ${
                        isActive
                          ? "bg-gray-100 text-black shadow-sm"
                          : "text-gray-700 hover:bg-gray-100 hover:text-black"
                      }`
                    }
                  >
                    <img
                      src={currentUser.profile_image}
                      alt="Profile"
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    {currentUser.username}
                  </NavLink>

                  <LogoutBtn onClick={() => setOpenLogoutConfirm(true)} />
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `px-3.5 py-1.5 rounded-full transition font-medium 
                    ${
                      isAuthPage
                        ? isActive
                          ? "text-white bg-white/30"
                          : "text-white/50 bg-white/10 hover:text-white hover:bg-white/20"
                        : isActive
                          ? "bg-white text-black shadow-sm"
                          : "text-gray-700 hover:bg-gray-50 hover:text-black"
                    }`
                    }
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      `px-3.5 py-1.5 rounded-full transition font-medium
                  ${
                    isAuthPage
                      ? isActive
                        ? "text-white bg-white/30"
                        : "text-white/50 bg-white/10 hover:text-white hover:bg-white/20"
                      : isActive
                        ? "bg-white text-black shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 hover:text-black"
                  }`
                    }
                  >
                    Signup
                  </NavLink>
                </>
              )}
            </div>
          </div>

          {isAuthPage && (
            <div className="mx-auto h-px mt-5 bg-[linear-gradient(to_right,black_50%,white_50%)] opacity-20" />
          )}
        </div>
      </nav>
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
