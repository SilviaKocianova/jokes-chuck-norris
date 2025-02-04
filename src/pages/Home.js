// Home.js

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomJoke } from "../features/jokeSlice";
import JokeDisplay from "../components/organisms/JokeDisplay";
import CategorySelector from "../components/organisms/CategorySelector";
import MainLayout from "../components/templates/MainLayout";
import Button from "../components/atoms/Button";
import Header from "../components/atoms/Header";
import { Grid } from "@mui/material";

import ReadJokeButton from "../features/ReadJokeButton";

const Home = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.jokes.status);

  useEffect(() => {
    dispatch(fetchRandomJoke());
  }, [dispatch]);

  return (
    <MainLayout>
      <Header />
      <CategorySelector />
      <JokeDisplay />
      <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          <Button onClick={() => dispatch(fetchRandomJoke())} disabled={status === "loading"}>
            Další vtip
          </Button>
        </Grid>
        <Grid item>
          <ReadJokeButton />
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default Home;
