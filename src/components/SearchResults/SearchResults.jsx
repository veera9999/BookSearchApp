import React from "react";
import BookCard from "./BookCard";
import { addToWishList } from "../../redux/slices/SearchResultsSlice";
import { useSelector, useDispatch } from "react-redux";
export default function SearchResults() {
  const { books, status } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  if (status === "loading") {
    return <div>Loading......</div>;
  }
  return (
    <div>
      <h2>Search Results:</h2>
      <ul>
        {books?.map((book) => (
          <BookCard
            book={book}
            addToWishList={() => dispatch(addToWishList(book))}
            key={book.id}
          />
        ))}
      </ul>
    </div>
  );
}
