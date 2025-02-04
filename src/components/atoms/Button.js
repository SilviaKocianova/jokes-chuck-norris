import React from "react";
import { Button as MuiButton } from "@mui/material";

const Button = ({ children, onClick, disabled }) => {
  return (
    <MuiButton
      sx={{
        backgroundColor: "pink",
        margin: "2rem",
        padding: "10px 20px",
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

export default Button;
