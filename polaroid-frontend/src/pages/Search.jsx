import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { useDebounce } from "../hooks/useDebounce";

export const Search = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  return (
    <div className="max-w-3xl mx-auto mt-32 px-6">
      <SearchBar
        placeholder="What are you searching for?"
        value={query}
        onChange={setQuery}
      />
    </div>
  );
};
