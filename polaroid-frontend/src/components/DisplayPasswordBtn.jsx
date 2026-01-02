import { Eye, EyeOff } from "lucide-react";
import React from "react";

export const DisplayPasswordBtn = ({ displayPassword, setDisplayPassword }) => {
  return (
    <button
      type="button"
      className="absolute right-0 mr-2 flex items-center justify-center"
      onClick={() => setDisplayPassword(!displayPassword)}
    >
      {displayPassword ? (
        <EyeOff className="size-5 text-black/45 hover:text-black/70 transition" />
      ) : (
        <Eye className="size-5 text-black/45 hover:text-black/70 transition" />
      )}
    </button>
  );
};
