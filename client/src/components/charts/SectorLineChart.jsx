import React from "react";
import { Box, Stack } from "@mui/system";
import { Button, Typography } from "@mui/material";
import LineChart from "../LineChart";

const SectorLineChart = ({ sector, stockData }) => {
  return (
    <Box
      sx={{
        bgcolor: "#20232E",
        border: "1px solid #3D3D3D",
        borderRadius: "5px",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          margin: "24px",
        }}
      >
        <Box>
          <Box>
            <Typography variant="h6" fontWeight="700">
              {sector}
            </Typography>
          </Box>
        </Box>
        <Stack direction="row">
          <Button variant="contained">1Y</Button>
          <Button variant="text">3Y</Button>
          <Button variant="text">5Y</Button>
        </Stack>
      </Box>
      <Box>
        <LineChart
          stockData={stockData.data}
          stockNameData={stockData.ticker}
        />
      </Box>
    </Box>
  );
};

export default SectorLineChart;
