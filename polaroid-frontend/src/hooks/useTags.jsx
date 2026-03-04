import React, { useState } from "react";

export const useTags = (maxTags = 8, maxLength = 30) => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  // Tag helper functions
  const addTag = (value) => {
    const trimmed = value.trim().replace(/^#/, ""); // Remove whitespace and hashtag from start of tag

    if (!trimmed) return; // Tag is empty
    if (trimmed.length > maxLength) return; // Longer than max length
    if (tags.includes(trimmed.toLowerCase())) return; // Tag already exists (in any form react, React, REACT etc)
    if (tags.length >= maxTags) return; // Too many tags on one post

    setTags((prev) => [...prev, trimmed.toLowerCase()]); // Add new tag to state
    setTagInput(""); // Clear tag input
  };

  const removeTag = (tagToRemove) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
    }

    // Remove last tag using backspace if input is empty
    if (e.key === "Backspace" && !tagInput && tags.length) {
      e.preventDefault();
      removeTag(tags[tags.length - 1]);
    }
  };
  return {
    tags,
    tagInput,
    setTagInput,
    addTag,
    removeTag,
    handleTagKeyDown,
    maxTags,
    maxLength,
  };
};
