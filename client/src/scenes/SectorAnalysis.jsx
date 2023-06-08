import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  getStockInfo,
  getStockLogo,
  getStocksList,
} from "../services/services";
import SearchBar from "../components/search/SearchBar";
import LoadingBar from "react-top-loading-bar";
import { useLayoutEffect } from "react";
import { useLoadingUpdate } from "../contexts/loadingContext";

const criteria = [
  {
    name: "Tốc độ tăng trưởng",
    fakeData: [
      {
        name: "NVL",
        value: 123,
      },
      {
        name: "Ngành BĐS",
        value: 9,
      },
      {
        name: "Toàn thị trường",
        value: 16,
      },
    ],
  },
  {
    name: "Định giá",
    fakeData: [
      {
        name: "NVL",
        value: 456,
      },
      {
        name: "Ngành BĐS",
        value: 9,
      },
      {
        name: "Toàn thị trường",
        value: 16,
      },
    ],
  },
  {
    name: "Hiệu suất hoạt động",
    fakeData: [
      {
        name: "NVL",
        value: 6,
      },
      {
        name: "Ngành BĐS",
        value: 9,
      },
      {
        name: "Toàn thị trường",
        value: 16,
      },
    ],
  },
  {
    name: "Thanh khoản",
    fakeData: [
      {
        name: "NVL",
        value: 6,
      },
      {
        name: "Ngành BĐS",
        value: 9,
      },
      {
        name: "Toàn thị trường",
        value: 16,
      },
    ],
  },
  {
    name: "Khả năng quản lý",
    fakeData: [
      {
        name: "NVL",
        value: 6,
      },
      {
        name: "Ngành BĐS",
        value: 9,
      },
      {
        name: "Toàn thị trường",
        value: 16,
      },
    ],
  },
];

const SectorAnalysis = ({ updateProgress }) => {
  const { id } = useParams();
  const [point, setPoint] = useState(4);
  const [tabIndex, setTabIndex] = useState(0);
  const [tickers, setTickers] = useState([]);
  const [tickerInfo, setTickerInfo] = useState({});
  const { setProgress } = useLoadingUpdate();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const tickerInfo = await getStockInfo(id);
      setProgress(30);

      setTickerInfo(tickerInfo);
      setProgress(100);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setProgress(30);
      const tickerInfo = await getStockInfo(id);
      setProgress(70);
      setTickerInfo(tickerInfo);
      setProgress(100);
    })();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
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
          />
          <Box display="flex" gap="10px" flexDirection="column">
            <Typography variant="h3" width="400px" fontWeight="700">
              {tickerInfo.companyname} ({tickerInfo.exchangeid})
            </Typography>
            <Typography variant="h4" fontWeight="500">
              Mã cổ phiếu: {id}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip label={tickerInfo.sectorname} variant="outlined" />
            </Stack>
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
              <Box
                sx={{
                  color:
                    point >= 7 ? "#66bb6a" : point >= 5 ? "#ffc107" : "#eb1d24",
                  width: "220px",
                  height: "220px",
                  // draw background based on point
                  backgroundImage: `conic-gradient(
                  ${
                    point >= 7 ? "#66bb6a" : point >= 5 ? "#ffc107" : "#eb1d24"
                  } 0% ${point * 10}%,
                  #20232e ${point * 10}% 
                )`,
                  boxShadow: `0 0 15px ${
                    point >= 7 ? "#66bb6a" : point >= 5 ? "#ffc107" : "#eb1d24"
                  }`,
                  userSelect: "none",
                  borderRadius: "50%",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  margin: "45px auto 30px",
                  fontSize: "50px",
                  fontWeight: "700",
                }}
              >
                <Box zIndex="1">{point}&nbsp;/&nbsp;10</Box>
              </Box>
              <Box display="flex" justifyContent="center">
                Cập nhật lần cuối: 01/06/2023*
              </Box>
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <ListItemText>Chất lượng doanh nghiệp</ListItemText>
                <ListItemText>Rủi ro</ListItemText>
                <ListItemText>Định giá</ListItemText>
              </ListItem>
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
              <BasicTable />
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
              <RadarChart />
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
                {criteria[tabIndex].fakeData.map((item, index) => (
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
  );
};

export default SectorAnalysis;
