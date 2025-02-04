import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomJoke } from "../features/jokeSlice";
import { Grid } from "@mui/material";

import JokeDisplay from "../components/organisms/JokeDisplay";
import CategorySelector from "../components/organisms/CategorySelector";
import MainLayout from "../components/templates/MainLayout";
import Button from "../components/atoms/Button";
import Header from "../components/atoms/Header";


const Home = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.jokes.status);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakJoke, setSpeakJoke] = useState(() => () => {});

  useEffect(() => {
    dispatch(fetchRandomJoke());
  }, [dispatch]);

  return (
    <MainLayout>
      <Header />
      <CategorySelector />
      <JokeDisplay isSpeaking={isSpeaking} setIsSpeaking={setIsSpeaking} setSpeakJoke={setSpeakJoke} />

      <Grid container justifyContent="center" spacing={2} sx={{ marginTop: 2 }}>
        <Grid item>
          <Button onClick={() => dispatch(fetchRandomJoke())} disabled={status === "loading"}>
            Next Joke
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={speakJoke} disabled={isSpeaking}>
            📢 Read Joke
          </Button>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default Home;