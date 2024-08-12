import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (query, thunkAPI) => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=0&maxResults=20`
    );
    const data = await response.json();
    return data.items;
  }
);

const searchResultsSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    wishList: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    addToWishList: (state, action) => {
      if (!state.wishList.find((item) => item.id === action.payload.id)) {
        state.wishList.push(action.payload);
      }
    },
    deleteFromWishList: (state, action) => {
      state.wishList = state.wishList.filter(
        (item) => item.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        // Fixed typo
        state.status = "succeeded";
        state.books = action.payload; // Store books in state.books
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addToWishList, deleteFromWishList } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;
