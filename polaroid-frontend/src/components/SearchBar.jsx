

const SearchBar = ({value, onChange, placeholder = "Search"}) => {
  return (
    <div className="px-3 pb-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 
          focus:ring-blue-500/30 placeholder:text-black/40"
      />
    </div>
  );
};

export default SearchBar;
