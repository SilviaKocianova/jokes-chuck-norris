import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomJoke } from "../features/jokeSlice";
import JokeDisplay from "../components/organisms/JokeDisplay";
import CategorySelector from "../components/organisms/CategorySelector";
import MainLayout from "../components/templates/MainLayout";
import Button from "../components/atoms/Button";
import { Container, Typography } from "@mui/material";

import "../styles/Buttons.css"
import "../styles/General.css"


const Home = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.jokes.status);

  useEffect(() => {
    dispatch(fetchRandomJoke());
  }, [dispatch]);

  return (
    <MainLayout>
      <Container>
        <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
                color: "white",
                fontWeight: "bold",
            }}
            >
          Chuck Norris Metaverse
        </Typography>
        <CategorySelector />
        <JokeDisplay />
        <div class="button-container">
        <Button class="next-joke-button" onClick={() => dispatch(fetchRandomJoke())} disabled={status === "loading"}>
          Další vtip
        </Button>
        </div>
      </Container>
    </MainLayout>
  );
};

export default Home;