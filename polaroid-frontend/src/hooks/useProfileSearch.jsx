import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { useDebounce } from "./useDebounce";

export const useProfileSearch = (profiles, currentUser) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery) {
      setSearchResults([]);
      return;
    }

    const fetchSearchResults = async () => {
      setSearching(true);
      try {
        const { data } = await axiosInstance.get(
          `/profiles/?search=${debouncedQuery}`,
        );
        setSearchResults(data.results ?? []);
      } catch (error) {
        console.log("Search Failed:", error);
      } finally {
        setSearching(false);
      }
    };
    fetchSearchResults();
  }, [debouncedQuery]);

  const profilesToShow = (debouncedQuery ? searchResults : profiles).filter(
    (p) => p.owner !== currentUser?.username,
  );
  return {
    query,
    setQuery,
    debouncedQuery,
    searching,
    profilesToShow,
  };
};
