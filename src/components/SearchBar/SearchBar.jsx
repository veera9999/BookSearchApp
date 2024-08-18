import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../redux/slices/SearchResultsSlice";
import _ from "lodash";

export default function SearchBar({ setSelectedBook }) {
  const [inputValue, setInputValue] = useState("");
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [activeOption, setActiveOption] = useState(0);
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);
  const searchElRef = useRef(null);
  // const autoCompleteBooks = books ? books.slice(0, 5) : [];
  const handleShowAutocomplete = () => {
    setShowAutoComplete(true);
  };

  const handleHideAutocomplete = () => {
    setShowAutoComplete(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const debouncedOnSearch = useCallback(
    _.debounce((query) => dispatch(fetchBooks(query)), 1000),
    [dispatch]
  );

  const handleClick = (e, book) => {
    const selectedBookTitle = e.target.textContent;
    setSelectedBook(book);
    handleHideAutocomplete();
  };

  const handleClickOutside = (e) => {
    if (searchElRef.current && !searchElRef.current.contains(e.target)) {
      handleHideAutocomplete();
    }
  };

  const haandleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveOption((prev) => {
        return prev < books.length - 1 ? prev + 1 : prev;
      });
    } else if (e.key === "ArrowUP") {
      setActiveOption((prev) => {
        return prev > 0 ? prev - 1 : prev;
      });
    } else if (e.key === "Enter") {
      setSelectedBook(books[activeOption]);
      handleHideAutocomplete();
    } else if (e.key === "Escape") {
      handleHideAutocomplete();
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    debouncedOnSearch(inputValue);
    return () => {
      debouncedOnSearch.cancel(); // Cancel debounced function on cleanup
    };
  }, [inputValue, debouncedOnSearch]);

  return (
    <div className="search-bar-container">
      <div className="search-bar" ref={searchElRef}>
        <input
          value={inputValue}
          onClick={handleShowAutocomplete}
          onChange={handleInputChange}
          onKeyDown={haandleKeyDown}
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
        {showAutoComplete ? (
          <div className="auto-search">
            <ul>
              {books?.map((book, index) => (
                <li
                  className={`option ${
                    index === activeOption ? "active-option" : ""
                  }`}
                  key={book.id}
                  onClick={(e) => handleClick(e, book)}>
                  {book.volumeInfo.title}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
