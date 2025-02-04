import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://api.chucknorris.io/jokes";

// Náhodný vtip
export const fetchRandomJoke = createAsyncThunk("jokes/fetchRandomJoke", async () => {
  const response = await fetch(`${API_URL}/random`);
  return response.json();
});

// Vtip podle kategorie
export const fetchJokeByCategory = createAsyncThunk("jokes/fetchJokeByCategory", async (category) => {
  const response = await fetch(`${API_URL}/random?category=${category}`);
  return response.json();
});

// Vyhledání vtipu podle zadaného řetězce
export const fetchJokeBySearch = createAsyncThunk(
  "jokes/fetchJokeBySearch",
  async (query, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/search?query=${query}`);
      const data = await response.json();

      if (data.total === 0) {
        return rejectWithValue("Žádný vtip neodpovídá vašemu hledání.");
      }

      
      const randomJoke = data.result[Math.floor(Math.random() * data.result.length)];
      return randomJoke;
    } catch (error) {
      return rejectWithValue("Chyba při načítání vtipu.");
    }
  }
);

const jokeSlice = createSlice({
  name: "jokes",
  initialState: { joke: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchRandomJoke.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRandomJoke.fulfilled, (state, action) => {
        state.joke = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchRandomJoke.rejected, (state) => {
        state.status = "failed";
        state.error = "Nepodařilo se načíst vtip.";
      })


      .addCase(fetchJokeByCategory.fulfilled, (state, action) => {
        state.joke = action.payload;
        state.error = null;
      })
      .addCase(fetchJokeByCategory.rejected, (state) => {
        state.error = "Nepodařilo se načíst vtip z kategorie.";
      })

    
      .addCase(fetchJokeBySearch.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchJokeBySearch.fulfilled, (state, action) => {
        state.joke = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchJokeBySearch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Uloží chybovou zprávu
      });
  },
});

export default jokeSlice.reducer;
