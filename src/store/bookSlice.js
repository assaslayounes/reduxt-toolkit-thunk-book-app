import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logInsert } from './reportSlice';

//getBooks
export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch("http://localhost:3009/books");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
      //return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

//insertBook
export const insertBook = createAsyncThunk(
  "book/insertBook",
  async (bookData, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    try {
      bookData.userName = getState().auth.name;
      const response = await fetch("http://localhost:3009/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(bookData),
      });
      const data = await response.json();
      dispatch(logInsert({name:'insertBook',status:'success'}));
      return data;
    } catch (error) {
      dispatch(logInsert({name:'insertBook',status:'failed'}));
      return rejectWithValue(error.message);
      //return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

//DeleteBook
export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (book, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
       await fetch(`http://localhost:3009/books/${book.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
      // return book => action.payload= book , if : return id => action.payload=id
      return book;
    } catch (error) {
      return rejectWithValue(error.message);
      //return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

//getBookById
export const getBookById = createAsyncThunk(
  "book/getBookById",
  async (book, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
       await fetch(`http://localhost:3009/books/${book.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
      // return book => action.payload= book , if : return id => action.payload=id
      return book;
    } catch (error) {
      return rejectWithValue(error.message);
      //return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: { book: [], isLoading: false, error: null, bookInfo: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.book = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(insertBook.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(insertBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.book.push(action.payload);
      })
      .addCase(insertBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }).addCase(deleteBook.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.book = state.book.filter((book) => book.id !== action.payload.id);
        console.log(action.payload);
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }).addCase(getBookById.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBookById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookInfo = action.payload;
      })
      .addCase(getBookById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default bookSlice.reducer;
