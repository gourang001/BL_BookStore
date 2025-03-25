import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAllBooks } from "../Utils/API.js";


interface Book {
  _id: string;
  [key: string]: any; 
}

interface BookState {
  books: Book[];
  loading: boolean;
  error: string | null;
}


const initialState: BookState = {
  books: [],
  loading: false,
  error: null,
};


export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      const results = await getAllBooks();
      return results;
    } catch (error) {
      return rejectWithValue("Failed to fetch books");
    }
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bookSlice.reducer;