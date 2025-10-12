import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getBooks = createAsyncThunk("book/getBooks", async (_, thunkAPI) => {
  try {
    const response = await fetch("http://localhost:3009/books");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    //return thunkAPI.rejectWithValue("something went wrong");
  }
});

const bookSlice = createSlice({
  name: "book",
  initialState: { book: null, isLoading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state, action) => {
        state.isLoading = true;
        console.log("pending: ", action);
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("fulfilled: ", action);
        //state.book = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isLoading = false;
        console.log("rejected: ", action);
      });
  },
});

export default bookSlice.reducer;
