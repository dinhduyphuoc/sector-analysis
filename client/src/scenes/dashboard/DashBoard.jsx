import React from "react";
import { Box } from "@mui/material";
import { Line } from "react-chartjs-2";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";

const DashBoard = () => {
  return (
    <Box m="20px">
      <Box
        sx={{ height: "100%", width: "50%" }}
        margin="auto"
        padding={2}
        border={{ md: "1px solid #faaf70" }}
      >
        <LineChart />
        <BarChart />
      </Box>
    </Box>
  );
};
export default DashBoard;
