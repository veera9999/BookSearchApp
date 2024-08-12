import { configureStore } from "@reduxjs/toolkit";
import searchResultReducer from "../slices/SearchResultsSlice";

export const store = configureStore({
  reducer: {
    books: searchResultReducer,
  },
});

export default store;
