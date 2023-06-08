import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { ColorModeContext, tokens } from "../../theme";
import SearchBar from "../../components/search/SearchBar";
import { getStocksList } from "../../services/services";

const items = [
  {
    name: "Fundamental",
    path: "/fundamental",
  },
  {
    name: "Sector Analysis",
    path: "/sector-analysis",
  },
  {
    name: "Stocks",
    path: "/stocks",
  },
];

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [tickers, setTickers] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const tickers = await getStocksList();
      const mapped = tickers.map((stock) => ({
        name: stock.tickersymbol,
        sectorid: stock.sectorid,
      }));

      setTickers(mapped);
    })();
  }, []);

  const handleOnChange = (e, newValue) => {
    if (newValue) {
      e.preventDefault();
      navigate(`/sector-analysis/${newValue.name}`);
    }
  };

  const handleOnKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      e.target.value &&
      tickers.find((ticker) => ticker.name === e.target.value)
    ) {
      e.preventDefault();
      navigate(`/sector-analysis/${e.target.value}`);
    }
  };

  const handleInput = (e) => {
    e.target.value = e.target.value.toUpperCase();
  };

  return (
    <Box
      display="flex"
      margin="0px 57px"
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
      {/* ICONS */}
      <Box display="flex" marginLeft="auto">
        <SearchBar
          options={tickers}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          onInput={handleInput}
          label="Nhập mã cổ phiếu"
        />
      </Box>
    </Box>
  );
};

export default Topbar;
