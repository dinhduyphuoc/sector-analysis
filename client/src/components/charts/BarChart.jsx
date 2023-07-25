import React, { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import "../../styles/SectorsAnalysis.css";

const BarChart = ({ chartData, sector, fScoreData, sx }) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      backgroundColor: "#20232E",
      type: "column",
      width: sx.width,
      height: sx.height,
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
      "#ED561B",
      "#DDDF00",
      "#24CBE5",
      "#64E572",
      "#FF9655",
      "#FFF263",
      "#6AF9C4",
    ],
    plotOptions: {
      column: {
        colorByPoint: true,
      },
    },
  });

  useEffect(() => {
    if (chartData && sector && fScoreData) {
      setChartOptions({
        ...chartOptions,
        series: [
          {
            borderColor: "#20232E",
            name: sector.name,
            data: chartData,
          },
        ],
        xAxis: {
          categories: fScoreData.map((f) => f.tickersymbol),
        },
        yAxis: {
          title: {
            text: "F-Score",
          },
        },
        tooltip: {
          useHTML: true,
          backgroundColor: "#20232E",
          borderColor: "black",
          formatter: function() {
            // Create the HTML table
            let tooltipHTML = "<table>";

            let f = fScoreData.find((f) => f.tickersymbol === this.x);
            tooltipHTML += `<tr><th colspan="2">${this.x +
              ": " +
              f.year}</th></tr>`;

            tooltipHTML +=
              "<tr><td style>ROA: </td><td>" + parseFloat(f.roa) + "</td></tr>";
            tooltipHTML +=
              "<tr><td>Operating cash flow: </td><td>" +
              parseFloat(f.operating_cash_flow) +
              "</td></tr>";
            tooltipHTML +=
              "<tr><td>Change in ROA: </td><td>" +
              parseFloat(f.change_in_roa) +
              "</td></tr>";
            tooltipHTML +=
              "<tr><td>Accruals: </td><td>" +
              parseFloat(f.accruals) +
              "</td></tr>";
            tooltipHTML +=
              "<tr><td>Change in leverage: </td><td>" +
              parseFloat(f.change_in_leverage) +
              "</td></tr>";
            tooltipHTML +=
              "<tr><td>Change in current ratio: </td><td>" +
              parseFloat(f.change_in_current_ratio) +
              "</td></tr>";
            tooltipHTML +=
              "<tr><td>Change in number of shares: </td><td>" +
              parseFloat(f.change_in_number_of_shares) +
              "</td></tr>";
            tooltipHTML +=
              "<tr><td>Change in gross margin: </td><td>" +
              parseFloat(f.change_in_gross_margin) +
              "</td></tr>";
            tooltipHTML +=
              "<tr><td>Change in asset turnover ratio: </td><td>" +
              parseFloat(f.change_in_asset_turnover_ratio) +
              "</td></tr>";
            tooltipHTML +=
              "<tr><td>Total: </td><td>" + parseFloat(f.f_score) + "</td></tr>";

            tooltipHTML += "</table>";
            return tooltipHTML;
          },
        },
      });
    }
  }, [chartData, sector, fScoreData]);

  return (
    <React.Fragment>
      {chartOptions ? (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      ) : null}
    </React.Fragment>
  );
};

export default BarChart;
