import { X } from "lucide-react";

const SearchBar = ({ value, onChange, placeholder = "Search" }) => {
  return (
    <div className="flex items-center pb-2 relative px-3">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-black/10 px-3 pr-10 py-2 text-sm focus:outline-none focus:ring-2 
          focus:ring-blue-500/20 placeholder:text-black/40"
      />
      {value && (
        <button
          type="button"
          className="absolute right-5 mr-2 flex items-center justify-center"
          onClick={() => onChange("")}
        >
          <X className="size-5 text-black/30 hover:text-black/60 transition cursor-pointer" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
