import { Eye, EyeOff } from "lucide-react";

export const DisplayPasswordBtn = ({ displayPassword, setDisplayPassword }) => {
  return (
    <button
      type="button"
      className="absolute right-0 mr-2 flex items-center justify-center"
      onClick={() => setDisplayPassword(!displayPassword)}
    >
      {displayPassword ? (
        <EyeOff className="size-5 text-black/45 hover:text-black/70 transition cursor-pointer" />
      ) : (
        <Eye className="size-5 text-black/45 hover:text-black/70 transition cursor-pointer" />
      )}
    </button>
  );
};

export const DisplayConfirmPasswordBtn = ({ displayConfirmPassword, setDisplayConfirmPassword }) => {
  return (
    <button
      type="button"
      className="absolute right-0 mr-2 flex items-center justify-center"
      onClick={() => setDisplayConfirmPassword(!displayConfirmPassword)}
    >
      {displayConfirmPassword ? (
        <EyeOff className="size-5 text-black/45 hover:text-black/70 transition cursor-pointer" />
      ) : (
        <Eye className="size-5 text-black/45 hover:text-black/70 transition cursor-pointer" />
      )}
    </button>
  );
};
