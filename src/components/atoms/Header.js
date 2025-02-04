import React from "react";
import { Typography } from "@mui/material";


const Header = () => {
    return (
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontFamily: "'Kanit', sans-serif",
            color: "white",
            fontWeight: "200",
            fontSize: "50px",
            textTransform: "uppercase",
            letterSpacing: "8px",
            paddingTop: "2em",
            paddingBottom: "2em",
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
            background: "linear-gradient(to right, #ff7e5f, #feb47b)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
          }}
        >
          Chuckles with Chuck
        </Typography>
      );
    };

export default Header;
