import React from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import WishList from "./components/WishList/WishList";
import { Provider } from "react-redux";
import { useState } from "react";
import store from "./redux/store/store";
import "./App.css";

export default function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  return (
    <Provider store={store}>
      <div className="App">
        <header>
          <h1>Book Store</h1>
        </header>
        <div className="container">
          <div>
            <SearchBar setSelectedBook={setSelectedBook} />
            <SearchResults book={selectedBook ? [selectedBook] : undefined} />
          </div>
          <WishList />
        </div>
      </div>
    </Provider>
  );
}
