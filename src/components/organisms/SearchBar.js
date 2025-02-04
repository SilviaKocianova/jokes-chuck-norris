import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchJokeBySearch } from "../../features/jokeSlice";
import { TextField, Grid, Typography } from "@mui/material";
import ButtonSearch from "../atoms/ButtonSearch";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      setError("Zadejte text pro vyhledání vtipu.");
      return;
    }

    setError(""); // Resetuje chybu při validním vstupu
    dispatch(fetchJokeBySearch(searchTerm));
  };

  return (
    <Grid container justifyContent="center" spacing={2} sx={{ my: 2 }}>
      <Grid item>
        <TextField
          label="Joke finder"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: "250px" }}
          error={!!error}
          helperText={error}
        />
      </Grid>
      <Grid item>
        <ButtonSearch onClick={handleSearch}>🔍</ButtonSearch>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
