import React from "react";
import { Button as MuiButton } from "@mui/material";

import "../../styles/General.css";
import "../../styles/Buttons.css"


const Button = ({ children, onClick, disabled }) => {
  return (
    <MuiButton class="next-joke-button" onClick={onClick} disabled={disabled}>
      {children}
    </MuiButton>
  );
};

export default Button;