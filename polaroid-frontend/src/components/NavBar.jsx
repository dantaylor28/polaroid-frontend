import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogoutBtn } from "./LogoutBtn";
import { House } from "lucide-react";

export const NavBar = () => {
  const { currentUser } = useAuth();
  return (
    <nav className="w-full pb-6 border-b bg-white">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-700">
          Polaroid
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3.5 py-1.5 rounded-full transition
     ${
       isActive
         ? "bg-gray-100 text-blue-800"
         : "text-blue-700 hover:bg-gray-50 hover:text-blue-800"
     }`
            }
          >
            <House />
          </NavLink>

          {currentUser ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-1 rounded-full transition font-medium
     ${
       isActive
         ? "bg-gray-100 text-black"
         : "text-gray-700 hover:bg-gray-50 hover:text-black"
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

              <LogoutBtn />
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-full transition font-medium
     ${
       isActive
         ? "bg-blue-600 text-white font-semibold"
         : "text-gray-700 hover:bg-blue-50 hover:text-black"
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
       isActive
         ? "bg-blue-600 text-white font-semibold"
         : "text-gray-700 hover:bg-blue-50 hover:text-black"
     }`
                }
              >
                Signup
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
