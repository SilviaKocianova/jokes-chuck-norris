import React from "react";
import { Card, CardContent, Typography } from "@mui/material";


const JokeCard = ({ joke }) => {
  return (
    <Card class="jokecard">
      <CardContent>
        <Typography>{joke}</Typography>
      </CardContent>
    </Card>
  );
};

export default JokeCard;