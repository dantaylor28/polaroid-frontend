import { LogOut } from "lucide-react";

export const LogoutBtn = ({ onClick }) => {
  return (
    <>
      <button
        className="px-3.5 py-1.5 rounded-full transition text-black hover:bg-red-500 hover:text-white hover:cursor-pointer"
        onClick={onClick}
      >
        <LogOut />
      </button>
    </>
  );
};
