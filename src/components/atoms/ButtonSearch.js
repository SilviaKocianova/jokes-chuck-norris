import React from "react";
import { Button as MuiButton } from "@mui/material";

const ButtonSearch = ({ children, onClick, disabled }) => {
  return (
    <MuiButton
      sx={{
        backgroundColor: "pink",
        marginBottom: "1rem",
        padding: "15px 20px",
        borderRadius: "10px",
        color: "black",
        "&:hover": { backgroundColor: "lightpink" },
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </MuiButton>
  );
};

export default ButtonSearch;
