import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getBooks = createAsyncThunk("book/getBooks", async (_, thunkAPI) => {
  
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
  initialState: { book: null },
  reducers: {},
  extraReducers: { 
  [getBooks.pending]  : (state, action) => {
    console.log("pending: ", action);
  },
  [getBooks.fulfilled]: (state, action) => {
    console.log("fulfilled: ", action);
    //state.book = action.payload;
  },
  [getBooks.rejected] : (state, action) => {
    console.log("rejected: ", action);
  },
}
});

export default bookSlice.reducer;
