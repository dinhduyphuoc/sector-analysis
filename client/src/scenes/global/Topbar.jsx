import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
// import { ColorModeContext, tokens } from "../../theme";
import SearchBar from "../../components/search/SearchBar";
import { getStocksList } from "../../services/services";

const items = [
  {
    name: "Tổng quan ngành",
    path: "/fundamental",
  },
  {
    name: "Phân tích ngành",
    path: "/analysis",
  },
];

const Topbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
            color: location.pathname.includes(item.path) ? "red" : "white",
            margin: "0 12px",
          }}
        >
          {item.name}
        </Link>
      ))}
      {/* ICONS
      <Box display="flex" marginLeft="auto">
        <SearchBar
          options={tickers}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          onInput={handleInput}
          label="Nhập mã cổ phiếu"
        />
      </Box> */}
    </Box>
  );
};

export default Topbar;
