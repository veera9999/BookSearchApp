import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromWishList } from "../../redux/slices/SearchResultsSlice";

export default function WishList() {
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.books.wishList);

  return (
    <div className="wishList">
      <h1>WishList</h1>
      <ul>
        {wishList?.map((book) => (
          <div className="wishList-item" key={book.id}>
            <span>{book.volumeInfo.title}</span>
            <button
              onClick={() => {
                dispatch(deleteFromWishList(book.id));
              }}>
              Delete
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}
