import React from "react";

export default function BookCard({ book, addToWishList }) {
  if (!book || !book.volumeInfo) {
    return null;
  }

  const { imageLinks, title, authors } = book.volumeInfo;

  return (
    <div
      className="book-card"
      onClick={() => {
        addToWishList(book);
      }}>
      {imageLinks?.thumbnail ? (
        <img src={imageLinks.thumbnail} alt={title} />
      ) : (
        <div>No Image Available</div>
      )}
      <h4>Title: {title || "Title Not Available"}</h4>
      <p>Author: {authors?.join(", ") || "Author Not Available"}</p>
    </div>
  );
}
