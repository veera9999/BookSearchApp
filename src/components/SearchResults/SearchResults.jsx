import React from "react";
import BookCard from "./BookCard";
import { addToWishList } from "../../redux/slices/SearchResultsSlice";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Loader";

export default function SearchResults({ book }) {
  const { status } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  if (status === "loading") {
    return <Loader />;
  }
  return (
    <div>
      <h2>Search Results:</h2>
      <ul>
        {book?.map((book) => (
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
