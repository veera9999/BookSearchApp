import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchBooks } from "../../redux/slices/SearchResultsSlice";
import _ from "lodash";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const debouncedOnSearch = useCallback(
    _.debounce((query) => dispatch(fetchBooks(query)), 1000),
    [dispatch]
  );

  useEffect(() => {
    debouncedOnSearch(inputValue);
  }, [inputValue, debouncedOnSearch]);

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
            dispatch(fetchBooks(inputValue));
          }}>
          Search
        </button>
      </span>
    </div>
  );
}
