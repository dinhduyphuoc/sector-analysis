import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Stack, Typography } from "@mui/material";
import Highcharts from "highcharts";
import stock from "highcharts/modules/stock";
import HighchartsReact from "highcharts-react-official";
import SelectSmall from "../select/SelectSmall";
import GridLoader from "react-spinners/GridLoader";
import { ratioList, ratioOptionsAPI, sectorsList } from "../../common/common";
import MultiSelect from "../select/MultiSelect";
import {
  getDailyChartFundamentalData,
  getStocksList,
} from "../../services/services";
import { roundNum } from "../../utils/utils";
import { useLoadingUpdate } from "../../contexts/loadingContext";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

stock(Highcharts);

const LineChart = ({ sector, isSector }) => {
  const { setProgress } = useLoadingUpdate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [ratio, setRatio] = useState(10);
  const [loading, setLoading] = useState(true);
  const [multiSelectLabel] = useState("Chọn cổ phiếu");
  const [tickers, setTickers] = useState();
  const [tickerData, setTickerData] = useState();
  const [sectorData, setSectorData] = useState();
  const [optionsSelected, setOptionsSelected] = useState();
  const [chartOptions, setChartOptions] = useState({
    chart: {
      backgroundColor: colors.primary[400],
    },
    title: {
      text: "",
    },
    legend: {
      itemStyle: {
        color: colors.text,
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
    xAxis: {
      type: "datetime",
      tickInterval: 2 * 7 * 24 * 3600 * 1000,
      labels: {
        format: "{value:%d/%m/%y}",
        style: {
          color: colors.text,
        },
      },
    },
  });

  useEffect(() => {
    const fetchSectorsData = async () => {
      let sectorData;
      if (sector instanceof Array) {
        sectorData = await getBatchSectorData(sector);
      } else {
        sectorData = await getSectorData(sector.id, ratio);
      }

      const curSectorChartData = sectorData.map((sectorItem) => {
        let name =
          sector instanceof Array
            ? sectorsList.find((s) => s.id === sectorItem.id).name
            : sector.name;

        if (sectorItem.interval === "quarterly") {
          sectorItem.data = formatQuarterlyData(sectorItem.data);
        }
        return {
          data: sectorItem.data,
          name,
        };
      });

      const tickers = await getStocksList(sector.id);

      setTickers(tickers);
      setSectorData(curSectorChartData);
    };

    fetchSectorsData();
    setProgress(60);
  }, [sector, ratio]);

  useEffect(() => {
    if (sectorData) {
      setChartOptions({
        ...chartOptions,
        series: sectorData,
        tooltip: {
          xDateFormat: "%d/%m/%Y",
          split: true,
        },
        yAxis: {
          // set yAxis to percentage
          labels: {
            formatter: function() {
              return formatNumber(this.value);
            },
          },
        },
      });
      setLoading(false);
      setProgress(100);
    }
  }, [sectorData, theme.palette.mode]);

  useEffect(() => {
    setChartOptions({
      ...chartOptions,
      xAxis: {
        ...chartOptions.xAxis,
        labels: {
          ...chartOptions.xAxis.labels,
          style: {
            color: colors.text,
          },
        },
      },
      chart: {
        backgroundColor: colors.primary[400],
      },
    });
  }, [theme.palette.mode]);

  useEffect(() => {
    if (sectorData && tickerData) {
      const tmp = sectorData;
      setChartOptions({
        ...chartOptions,
        series: tmp.concat(tickerData),
      });
      setLoading(false);
    }
  }, [tickerData, sectorData]);

  const formatNumber = (num) => {
    switch (ratio) {
      case 10:
      case 20:
      case 40:
        return num;
      case 30:
        if (num < 1000) {
          return num.toLocaleString();
        } else if (num >= 1000 && num < 1000000) {
          return (num / 1000).toFixed(1) + "k";
        } else if (num >= 1000000 && num < 1000000000) {
          return (num / 1000000).toFixed(1) + "m";
        } else {
          return (num / 1000000000).toFixed(1) + "b";
        }
      case 50:
      case 60:
        return num * 100 + "%";
      default:
        break;
    }
  };

  const formatQuarterlyData = (data) => {
    const formattedData = data.map((point) => {
      const timestamp = new Date(point[0], (point[1] - 1) * 3, 1).getTime();
      return [timestamp, parseFloat(roundNum(point[2]))];
    });
    return formattedData;
  };

  const getBatchTickerData = async (tickers) => {
    const tickerData = [];
    for (let i = 0; i < tickers.length; i++) {
      const data = await getDailyChartFundamentalData(
        tickers[i],
        "ticker",
        ratioOptionsAPI[ratio].ratio,
        ratioOptionsAPI[ratio].interval
      );
      tickerData.push(data);
    }
    return tickerData;
  };

  const getBatchSectorData = async (sectors) => {
    const sectorData = [];
    for (let i = 0; i < sectors.length; i++) {
      const data = await getDailyChartFundamentalData(
        sectors[i].id,
        "sector",
        ratioOptionsAPI[ratio].ratio,
        ratioOptionsAPI[ratio].interval
      );

      sectorData.push(data);
    }
    return sectorData;
  };

  const getSectorData = async (sectorid, ratio) => {
    const sectorData = await getDailyChartFundamentalData(
      sectorid,
      "sector",
      ratioOptionsAPI[ratio].ratio,
      ratioOptionsAPI[ratio].interval
    );
    return [sectorData];
  };

  const handleSectorChangeOption = (option) => {
    setRatio(option);
  };

  const handleOnChange = async (e, newValue) => {
    if (newValue) {
      setLoading(true);
      let tickerData = await getBatchTickerData(newValue);
      tickerData = tickerData.map((ticker) => {
        if (ticker.interval === "quarterly") {
          ticker.data = formatQuarterlyData(ticker.data);
        }
        return {
          data: ticker.data,
          name: ticker.id,
        };
      });
      setOptionsSelected(newValue);
      setTickerData(tickerData);
    }
  };

  const handleInput = (e) => {
    e.target.value = e.target.value.toUpperCase();
  };

  const handleSelectionChange = (e) => {
    setLoading(true);
    switch (e.target.value) {
      case 10:
        handleSectorChangeOption("pe");
        break;
      case 20:
        handleSectorChangeOption("pb");
        break;
      case 30:
        handleSectorChangeOption("market_cap");
        break;
      case 40:
        handleSectorChangeOption("eps");
        break;
      case 50:
        handleSectorChangeOption("roe");
      case 60:
        handleSectorChangeOption("roa");
        break;
      default:
        break;
    }
    setRatio(e.target.value);
  };

  const renderMultiSelect = () => {
    if (tickers) {
      return (
        isSector && (
          <MultiSelect
            options={tickers.map((ticker) => ticker.tickersymbol)}
            selected={optionsSelected}
            onInput={handleInput}
            onChange={handleOnChange}
            label={multiSelectLabel}
            sx={{
              width: "500px",
              margin: "0 5px",
            }}
          />
        )
      );
    }
  };

  return (
    <Box display="flex" flexDirection="column">
      {loading ? (
        <Box
          sx={{
            bgcolor: colors.primary[400],
            margin: "20px 0",
            height: "400px",
          }}
        >
          <Box
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <GridLoader color="#36d7b7" />
          </Box>
        </Box>
      ) : (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{ padding: "24px" }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {sector instanceof Array ? "Toàn thị trường" : sector.name} |
              VNINDEX
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <Stack direction="row">
                <SelectSmall
                  options={ratioList}
                  option={ratio}
                  label={"Chỉ số"}
                  onChange={handleSelectionChange}
                />
                {renderMultiSelect()}
              </Stack>
            </Box>
          </Box>
          {chartOptions ? (
            <HighchartsReact
              constructorType="stockChart"
              highcharts={Highcharts}
              options={chartOptions}
            />
          ) : null}
        </>
      )}
    </Box>
  );
};

export default LineChart;
