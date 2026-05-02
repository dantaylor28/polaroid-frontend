import { Menu, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export const MobileSidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const sidebarRef = useRef(null);

  //   Close sidebar when a profile is clicked
  const handleSidebarClick = () => {
    setExpanded(false);
  };

  //   Close sidebar when a user clicks outside it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <button
        className="md:hidden flex items-center z-30 text-2xl"
        onClick={() => setExpanded((prev) => !prev)}
      >
        {expanded ? <X /> : <Menu />}
      </button>

      {expanded && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-10"
          onClick={() => setExpanded(false)}
        />
      )}

      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 w-[60vw] h-full bg-white transform transition-transform z-20 ease-in-out duration-700 ${
          expanded ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-end p-4">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-700"
            onClick={() => setExpanded(false)}
          >
            Polaroid
          </Link>
        </div>
        {/* Rest of sidebar content here */}
      </div>
    </>
  );
};
