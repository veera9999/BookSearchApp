import React from "react";

export default function BookCard({ book, addToWishList }) {
  const { imageLinks, title, authors } = book.volumeInfo;

  return (
    <div
      className="book-card"
      onClick={() => {
        addToWishList(book);
      }}>
      <img src={imageLinks?.thumbnail} alt="" />
      <h4>Title : {title}</h4>
      <p>Author: {authors}</p>
    </div>
  );
}
