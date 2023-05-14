import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Button, Stack, Tab, Tabs, Typography } from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import sectorsStore from "../../stores/sectorStore";

const LineChart = ({ sectorData }) => {
  const sectors = sectorsStore((state) => state.sectors);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      backgroundColor: "#20232E",
    },
    title: {
      text: "",
    },
    legend: {
      itemStyle: {
        color: "white",
      },
    },
    tooltip: {
      xDateFormat: "%d/%m/%Y",
    },

    xAxis: {
      type: "datetime",
      tickInterval: 2 * 7 * 24 * 3600 * 1000,
      labels: {
        format: "{value:%d/%m/%y}",
        style: {
          color: "white",
        },
      },
    },
    yAxis: {
      title: {
        text: "Price",
        style: {
          color: "white",
        },
      },
      labels: {
        style: {
          color: "white",
        },
      },
    },
  });

  useEffect(() => {
    if (sectorData) {
      setChartOptions({
        series: sectorData.map((sector) => {
          return {
            name: sectors.find((s) => s.id === sector.sectorid).name,
            data: sector.data,
          };
        }),
      });
    }
  }, [sectorData]);

  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ padding: "24px" }}
      >
        <Typography variant="h6" fontWeight="700">
          Test
        </Typography>
        <Stack direction="row">
          <Button variant="contained">1Y</Button>
          <Button variant="text">3Y</Button>
          <Button variant="text">5Y</Button>
        </Stack>
      </Box>
      <HighchartsReact
        containerProps={{ style: { height: "100%" } }}
        highcharts={Highcharts}
        options={chartOptions}
      />
    </Box>
  );
};

export default LineChart;
