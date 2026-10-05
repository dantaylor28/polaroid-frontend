import { LogOut } from "lucide-react";
import type { MouseEventHandler } from "react";

interface LogoutBtnProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const LogoutBtn = ({ onClick }: LogoutBtnProps) => {
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
