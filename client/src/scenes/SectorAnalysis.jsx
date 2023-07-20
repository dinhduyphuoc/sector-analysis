import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  ListItem,
  ListItemText,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import RadarChart from "../components/charts/RadarChart";
import BasicTable from "../components/tables/BasicTable";
import {
  getSectorScore,
  getStockInfo,
  getStockLogo,
  getStockScore,
} from "../services/services";
import { useLoadingUpdate } from "../contexts/loadingContext";
import { roundNum } from "../utils/utils";
import PieScore from "../components/score/PieScore";

const fields = {
  liquidity_score: "Thanh khoản",
  growth_rate_score: "Tốc độ tăng trưởng",
  sustainable_management_score: "Quản trị bền vững",
  valuation_score: "Định giá doanh nghiệp",
  health_score: "Sức khoẻ tài chính",
};

const SectorAnalysis = ({ updateProgress }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [point, setPoint] = useState(null);
  const [criteria, setCriteria] = useState([]);
  const [chartCriteria, setChartCriteria] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [tickerInfo, setTickerInfo] = useState({});
  const { setProgress } = useLoadingUpdate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProgress(10);
        const tickerInfo = await getStockInfo(id);

        const [stockScorings] = await Promise.all([
          getStockScore(id),
          // getSectorScore(tickerInfo.sectorid),
        ]);

        const stockAverage = extractAverage(stockScorings);
        const stockPoint = roundNum(
          (stockAverage.liquidity_score +
            stockAverage.growth_rate_score +
            stockAverage.sustainable_management_score +
            stockAverage.valuation_score +
            stockAverage.health_score) /
            5,
          1
        );

        // const sectorAverage = extractAverage(sectorScorings);

        const criteria = Object.entries(fields).map(([key, value], index) => ({
          name: value,
          data: [
            {
              name: id,
              value: stockAverage[key],
            },
            // {
            //   name: tickerInfo.sectorname,
            //   value: sectorAverage[key],
            // },
            {
              name: "Toàn thị trường",
              value: index + 2,
            },
          ],
        }));

        const chartData = [
          {
            type: "line",
            name: id,
            data: Object.values(stockAverage),
          },
          // {
          //   type: "area",
          //   name: tickerInfo.sectorname,
          //   data: Object.values(sectorAverage),
          // },
          {
            type: "line",
            name: "Toàn thị trường",
            data: [2, 3, 4, 5, 6],
          },
        ];

        setProgress(30);
        setCriteria(criteria);
        setChartCriteria(chartData);
        setTickerInfo(tickerInfo);
        setPoint(stockPoint);
        setProgress(100);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const extractAverage = (scorings) => {
    const average = {};
    Object.keys(fields).forEach((field) => {
      average[field] = 0;
      scorings.forEach((item) => {
        average[field] += parseFloat(item[field]);
      });
      average[field] = roundNum((average[field] /= scorings.length));
    });

    return average;
  };

  return (
    loading || (
      <Box display="flex" flexDirection="column" gap="20px" alignItems="center">
        <Box
          width="1000px"
          display="flex"
          justifyContent="space-around"
          gap="20px"
        >
          <Box display="flex" gap="20px">
            <img
              style={{
                // make image fit the box above
                width: "85px",
                height: "85px",
                objectFit: "contain",
                padding: "6px",
                backgroundColor: "white",
                borderRadius: "50%",
              }}
              src={getStockLogo(id)}
              alt="logo"
            />
            <Box display="flex" gap="10px" flexDirection="column">
              <Typography variant="h3" width="400px" fontWeight="700">
                {tickerInfo.companyname} ({tickerInfo.exchangeid})
              </Typography>
              <Typography variant="h4" fontWeight="500">
                Mã cổ phiếu: {id}
              </Typography>
              {/* <Stack direction="row" spacing={1}>
                <Chip label={tickerInfo.sectorname} variant="outlined" />
              </Stack> */}
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          gap="10px"
          sx={{
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Card>
              <CardHeader
                sx={{
                  backgroundColor: "#1c1f27",
                  textAlign: "center",
                }}
                title="Đánh giá tổng thể"
              />
              <CardContent
                sx={{
                  backgroundColor: "#20232e",
                }}
              >
                <PieScore value={point} />
                <Box display="flex" justifyContent="center">
                  Cập nhật lần cuối: 01/06/2023*
                </Box>
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                sx={{
                  backgroundColor: "#1c1f27",
                  textAlign: "center",
                }}
                title="Bảng điểm chỉ số"
              />
              <CardContent
                sx={{
                  backgroundColor: "#20232e",
                }}
              >
                <BasicTable
                  head={[
                    "Chỉ số",
                    id,
                    // tickerInfo.sectorname,
                    "Toàn thị trường",
                  ]}
                  data={criteria}
                  // aggregate="sum"
                />
              </CardContent>
            </Card>
          </Box>
          <Box display="flex" flexDirection="column" gap="10px">
            <Card>
              <CardHeader
                sx={{
                  backgroundColor: "#1c1f27",
                  textAlign: "center",
                }}
                title="Biểu đồ đánh giá"
              />
              <CardContent
                sx={{
                  backgroundColor: "#20232e",
                  maxWidth: "500px",
                  height: "500px",
                }}
              >
                <RadarChart
                  categories={Object.values(fields)}
                  chartData={chartCriteria}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                sx={{
                  backgroundColor: "#1c1f27",
                  textAlign: "center",
                }}
                title="Thông tin tổng quan"
              />
              <CardContent
                sx={{
                  backgroundColor: "#20232e",
                  maxWidth: "500px",
                }}
              >
                <Tabs
                  value={tabIndex}
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {criteria.map((item, index) => (
                    <Tab
                      key={index}
                      label={
                        <Typography
                          sx={{
                            color: "#fff",
                            textTransform: "none",
                          }}
                        >
                          {item.name}
                        </Typography>
                      }
                    />
                  ))}
                </Tabs>
                <Box margin="10px 10px">
                  {criteria[tabIndex].data.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText>{item.name}</ListItemText>
                      <ListItemText
                        sx={{
                          textAlign: "right",
                        }}
                      >
                        {item.value}
                      </ListItemText>
                    </ListItem>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    )
  );
};

export default SectorAnalysis;
