import { Hamburger, HamburgerIcon, LucideHamburger, Menu, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

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
          className="md:hidden flex fixed top-5 left-6 z-20 text-2xl"
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
    </>
  );
};
