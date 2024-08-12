import React from "react";
import { useState, useEffect, useCallback } from "react";
import _ from "lodash";
export default function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const debouncedOnSearch = useCallback(_.debounce(onSearch, 1000), [onSearch]);

  useEffect(() => {
    debouncedOnSearch(inputValue);
  }, [inputValue]);

  return (
    <div className="search-bar">
      <input
        value={inputValue}
        onChange={handleInputChange}
        type="text"
        placeholder="Search for a Book"
      />
      <span>
        <button
          onClick={() => {
            onSearch(inputValue);
          }}>
          Search
        </button>
      </span>
    </div>
  );
}
