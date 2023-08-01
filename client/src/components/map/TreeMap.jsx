import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import addTreemapModule from "highcharts/modules/treemap";
import Highcharts from "highcharts";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

addTreemapModule(Highcharts);

const TreeMap = ({ chartData, sector, fScoreData, sx }) => {
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
            borderColor: colors.primary[300],
            borderRadius: 6,
            borderWidth: 2,
            levels: [
              {
                level: 1,
                layoutAlgorithm: "strip",
                dataLabels: {
                  enabled: true,
                  align: "left",
                  backgroundColor: "#2a2a2b",
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
