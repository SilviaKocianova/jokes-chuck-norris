import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomJoke } from "../features/jokeSlice";
import JokeDisplay from "../components/organisms/JokeDisplay";
import CategorySelector from "../components/organisms/CategorySelector";
import MainLayout from "../components/templates/MainLayout";
import Button from "../components/atoms/Button";
import { Container, Typography } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.jokes.status);

  useEffect(() => {
    dispatch(fetchRandomJoke());
  }, [dispatch]);

  return (
    <MainLayout>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Chuck Norris Metaverse
        </Typography>
        <CategorySelector />
        <JokeDisplay />
        <Button onClick={() => dispatch(fetchRandomJoke())} disabled={status === "loading"}>
          Další vtip
        </Button>
      </Container>
    </MainLayout>
  );
};

export default Home;