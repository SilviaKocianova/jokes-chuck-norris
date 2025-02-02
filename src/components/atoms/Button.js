import React from "react";
import { Button as MuiButton } from "@mui/material";

const Button = ({ children, onClick, disabled }) => {
  return (
    <MuiButton variant="contained" color="primary" onClick={onClick} disabled={disabled}>
      {children}
    </MuiButton>
  );
};

export default Button;