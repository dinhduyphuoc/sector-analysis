import React, { useState, useContext, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const items = [
  {
    name: "Tổng quan ngành",
    path: "/fundamental",
  },
  {
    name: "Phân tích ngành",
    path: "/analysis",
  },
  {
    name: "Dự đoán xu hướng",
    path: "/prediction",
  },
];

const Topbar = () => {
  const location = useLocation();
  const theme = useTheme();
  const colors = tokens(theme);
  const colorMode = useContext(ColorModeContext);
  const [textColor, setTextColor] = useState(colors.text);

  return (
    <Box
      display="flex"
      margin="25px 57px"
      padding="10px 44px"
      alignItems="center"
    >
      <Typography variant="h3" fontWeight="700" mr={4}>
        CoffeeStock
      </Typography>
      {items.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          style={{
            textDecoration: "none",
          }}
        >
          <Typography
            style={{
              color: location.pathname.includes(item.path) ? "red" : null,
              margin: "0 12px",
            }}
          >
            {item.name}
          </Typography>
        </Link>
      ))}
      <Box display="flex" marginLeft="auto">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon sx={{ fill: "#000" }} />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
