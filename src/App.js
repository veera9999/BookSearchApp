import React from "react";
import { fetchBooks } from "./redux/slices/SearchResultsSlice";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import WishList from "./components/WishList/WishList";
import { useDispatch } from "react-redux";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store/store";

export default function App() {
  const dispatch = useDispatch();

  const handleSearch = (query) => {
    if (query.trim()) {
      dispatch(fetchBooks(query));
    }
  };

  return (
    <Provider store={store}>
      <div className="App">
        <header>
          <h1>Book Store</h1>
        </header>

        <div className="container">
          <div>
            <SearchBar onSearch={handleSearch} />
            <SearchResults />
          </div>
          <WishList />
        </div>
      </div>
    </Provider>
  );
}
