import { configureStore } from "@reduxjs/toolkit";
import jokeReducer from "../features/jokeSlice";

const store = configureStore({
  reducer: { jokes: jokeReducer },
});

export { store };
export default store;
