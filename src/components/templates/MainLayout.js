import React from "react";
import { Container } from "@mui/material";

import "../../styles/General.css";

const MainLayout = ({ children }) => {
  return <Container>{children}</Container>;
};

export default MainLayout;
