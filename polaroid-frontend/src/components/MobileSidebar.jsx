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
      {expanded ? (
        <button
          className="md:hidden flex z-20 text-2xl"
          onClick={() => setExpanded(!expanded)}
        >
          <X />
        </button>
      ) : (
        <button
          className="md:hidden flex items-center z-20 text-2xl"
          onClick={() => setExpanded(!expanded)}
        >
          <Menu />
        </button>
      )}
      <div
        ref={sidebarRef}
        className={`flex md:hidden top-0 left-0 w-[60vw] fixed h-full bg-red-500 z-10 ease-in-out duration-700 ${
          expanded ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link
          to="/"
          className="flex md:hidden text-2xl font-bold text-blue-700 px-3.5"
        >
          Polaroid
        </Link>
      </div>
    </>
  );
};
