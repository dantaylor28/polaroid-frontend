import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogoutBtn } from "./LogoutBtn";

export const NavBar = () => {
  const { currentUser } = useAuth();
  return (
    <nav className="w-full border-b bg-white">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Polaroid
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "font-semibold" : "text-gray-400"
            }
          >
            Home
          </NavLink>

          {currentUser ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "font-semibold" : "text-gray-400"
                }
              >
                <div className="flex items-center justify-center gap-1.5">
                  <img
                    src={currentUser.profile_image}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  {currentUser.username}
                </div>
              </NavLink>

              <LogoutBtn />
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "font-semibold" : "text-gray-400"
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? "font-semibold" : "text-gray-400"
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
