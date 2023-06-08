import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";

HighchartsMore(Highcharts);

const RadarChart = ({ sectors, sectorData }) => {
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

    pane: {
      startAngle: 0,
      endAngle: 360,
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

    xAxis: {
      tickInterval: 72,
      min: 0,
      max: 360,
      lineWidth: 0,
      tickmarkPlacement: "on",
      labels: {
        style: {
          color: "white",
        },
        formatter: function () {
          let label;
          switch (this.value) {
            case 0:
              label = "Tốc độ tăng trưởng";
              break;
            case 72:
              label = "Định giá";
              break;
            case 144:
              label = "Hiệu suất hoạt động";
              break;
            case 216:
              label = "Thanh khoản";
              break;
            case 288:
              label = "Khả năng quản lý";
              break;
          }
          return label;
        },
      },
    },

    yAxis: {
      min: 0,
      gridLineInterpolation: "polygon",
      style: {
        color: "white",
      },
      labels: {
        style: {
          color: "white",
        },
      },
    },

    plotOptions: {
      series: {
        pointStart: 0,
        pointInterval: 72,
      },
      column: {
        pointPadding: 0,
        groupPadding: 0,
      },
    },

    series: [
      {
        type: "line",
        name: "NVL",
        data: [1, 2, 3, 4, 5, 6, 7, 8],
      },
      {
        type: "area",
        name: "Ngành BĐS",
        data: [8, 7, 6, 5, 4, 3, 2, 1],
        pointPlacement: "between",
      },
      {
        type: "area",
        name: "Toàn Thị Trường",
        data: [1, 8, 2, 7, 3, 6, 4, 5],
      },
    ],
  });

  return (
    <HighchartsReact
      containerProps={{ style: { height: "100%" } }}
      highcharts={Highcharts}
      options={chartOptions}
    />
  );
};

export default RadarChart;
