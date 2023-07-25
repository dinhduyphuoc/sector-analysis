import React from "react";
import { Typography, Box } from "@mui/material";

const Header = ({ title, subtitle, sx }) => {
  return (
    <Box mb="30px" sx={sx}>
      <Typography variant="h2" fontWeight="bold" sx={{ m: "0 0 5px 0" }}>
        {title}
      </Typography>
      <Typography variant="h5">{subtitle}</Typography>
    </Box>
  );
};

export default Header;
