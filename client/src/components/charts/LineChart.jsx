import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Button, Stack, Typography } from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import SelectSmall from "../select/SelectSmall";
import { useSectorUpdate } from "../../contexts/sectorContext";

// Chart states
const ratioOptions = [
  { value: 10, label: "P/E" },
  { value: 20, label: "P/B" },
  { value: 30, label: "EPS" },
  { value: 40, label: "ROE" },
  { value: 50, label: "ROA" },
];

const LineChart = ({ sectors, sectorData }) => {
  // const [interval, setInterval] = useState("Q");
  const { updateSectorsData } = useSectorUpdate();
  const [index, setRatio] = useState(10);
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
    if (sectorData && sectors) {
      setChartOptions({
        series: sectorData.map((sector) => {
          return {
            name: sectors.find((s) => s.id === sector.sectorid).name,
            data: sector.data,
          };
        }),
      });
    }
  }, [sectorData, sectors]);

  const handleSelectionChange = (e) => {
    switch (e.target.value) {
      case 10:
        updateSectorsData("pe");
        break;
      case 20:
        updateSectorsData("pb");
        break;
      case 30:
        updateSectorsData("eps");
        break;
      case 40:
        updateSectorsData("roe");
        break;
      case 50:
        updateSectorsData("roa");
        break;
      default:
        break;
    }
    setRatio(e.target.value);
  };

  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ padding: "24px" }}
      >
        <Typography variant="h6" fontWeight="700">
          Biểu đồ theo:
        </Typography>
        <Stack direction="row">
          <SelectSmall
            options={ratioOptions}
            option={index}
            onChange={handleSelectionChange}
          />
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
