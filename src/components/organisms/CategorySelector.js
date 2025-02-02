import React from "react";
import { useDispatch } from "react-redux";
import { fetchJokeByCategory } from "../../features/jokeSlice";
import { MenuItem, Select } from "@mui/material";

import "../../styles/General.css";


const categories = ["animal", "career", "celebrity", "dev"];

const CategorySelector = () => {
  const dispatch = useDispatch();

  return (
    <Select onChange={(e) => dispatch(fetchJokeByCategory(e.target.value))}>
      {categories.map((cat) => (
        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
      ))}
    </Select>
  );
};

export default CategorySelector;