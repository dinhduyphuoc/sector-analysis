import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import addTreemapModule from "highcharts/modules/treemap";
import Highcharts from "highcharts";

addTreemapModule(Highcharts);

const TreeMap = ({ chartData, sector, fScoreData, sx }) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      backgroundColor: "#20232E",
      width: sx.width,
      height: sx.height,
    },
    title: {
      text: "",
    },
  });

  useEffect(() => {
    if (chartData) {
      setChartOptions({
        ...chartOptions,
        series: [
          {
            type: "treemap",
            layoutAlgorithm: "squarified",

            alternateStartingDirection: true,
            borderColor: "#20232E",
            borderRadius: 6,
            borderWidth: 2,
            levels: [
              {
                level: 1,
                layoutAlgorithm: "strip",
                dataLabels: {
                  enabled: true,
                  align: "left",
                  backgroundColor: "#20232E",
                  borderRadius: 5,
                  verticalAlign: "top",
                  style: {
                    fontSize: "10px",
                    color: "white",
                    opacity: 0.7,
                  },
                },
              },
            ],
            alternateStartingDirection: true,
            dataLabels: {
              style: {
                textOutline: "none",
              },
            },
            data: chartData,
          },
        ],
      });
    }
  }, [chartData]);
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default TreeMap;
