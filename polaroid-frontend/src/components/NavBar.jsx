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
                Profile
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
