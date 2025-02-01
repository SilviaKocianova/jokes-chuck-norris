import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://api.chucknorris.io/jokes";

export const fetchRandomJoke = createAsyncThunk("jokes/fetchRandomJoke", async () => {
  const response = await fetch(`${API_URL}/random`);
  return response.json();
});

export const fetchJokeByCategory = createAsyncThunk("jokes/fetchJokeByCategory", async (category) => {
  const response = await fetch(`${API_URL}/random?category=${category}`);
  return response.json();
});

const jokeSlice = createSlice({
  name: "jokes",
  initialState: { joke: null, status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomJoke.pending, (state) => { state.status = "loading"; })
      .addCase(fetchRandomJoke.fulfilled, (state, action) => {
        state.joke = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchJokeByCategory.fulfilled, (state, action) => {
        state.joke = action.payload;
      });
  },
});

export default jokeSlice.reducer;
