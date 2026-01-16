import React from "react";

export const SidebarSkeleton = ({ rows = 6 }) => {
  return (
    <ul className="px-3">
      {Array.from({ length: rows }).map((_, i) => (
        <li
          key={i}
          className="flex items-center gap-3 px-3 py-2 mx-3 mb-2 rounded-lg"
        >
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-black/10 animate-pulse" />

          {/* Username */}
          <div className="h-3 w-32 rounded-lg bg-black/10 animate-pulse" />
        </li>
      ))}
    </ul>
  );
};
