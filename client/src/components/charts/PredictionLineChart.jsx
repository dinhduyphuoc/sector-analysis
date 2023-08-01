import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const PredictionLineChart = ({ actualData, testData, label, sx }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      backgroundColor: colors.primary[400],
      width: sx.width,
      height: sx.height,
    },
    title: {
      text: "",
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
      itemStyle: {
        color: colors.text,
      },
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: false,
            },
          },
        },
      },
    },
    colors: [
      "#058DC7",
      "#50B432",
      "#ED561B",
      "#DDDF00",
      "#24CBE5",
      "#64E572",
      "#FF9655",
      "#FFF263",
      "#6AF9C4",
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    if (actualData && testData && label) {
      setChartOptions({
        ...chartOptions,
        series: [
          {
            name: label[0],
            data: actualData,
          },
          {
            name: label[1],
            data: testData,
          },
        ],
        chart: {
          ...chartOptions.chart,
          backgroundColor: colors.primary[400],
        },
        legend: {
          ...chartOptions.legend,
          itemStyle: {
            ...chartOptions.legend.itemStyle,
            color: colors.text,
          },
        },
      });
    }
  }, [actualData, testData, label, theme.palette.mode]);

  return (
    <Box>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </Box>
  );
};

export default PredictionLineChart;
