import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";

HighchartsMore(Highcharts);

const RadarChart = ({ categories, chartData }) => {
  const [chartOptions, setChartOptions] = useState({
    accessibility: {
      enabled: false,
    },
    chart: {
      polar: true,
      type: "line",
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

    colors: [
      "#058DC7",
      "#50B432",
      "#FF6361",
      "#DDDF00",
      "#24CBE5",
      "#64E572",
      "#FF9655",
      "#FFF263",
      "#6AF9C4",
    ],

    tooltip: {
      backgroundColor: "rgba(26, 35, 50, 1)",
      borderWidth: 0,
      outside: true,
      style: {
        color: "rgba(164, 177, 205)",
      },
      shared: true,
    },

    xAxis: {
      lineWidth: 0,
      tickmarkPlacement: "on",
      labels: {
        style: {
          color: "white",
        },
      },
    },

    yAxis: {
      gridLineColor: "rgba(164, 177, 205, 0.2)",
      alternateGridColor: "rgba(164, 177, 205, 0.05)",
      gridLineInterpolation: "polygon",
      style: {
        color: "white",
      },
      labels: {
        enabled: false,
      },
    },
  });

  useEffect(() => {
    setChartOptions({
      ...chartOptions,
      series: chartData,
      xAxis: {
        categories: categories,
      },
    });
  }, [chartData]);

  return (
    <HighchartsReact
      containerProps={{ style: { height: "100%" } }}
      highcharts={Highcharts}
      options={chartOptions}
    />
  );
};

export default RadarChart;
