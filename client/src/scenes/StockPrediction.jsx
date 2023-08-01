import React, { useEffect, useState } from "react";
import PredictionLineChart from "../components/charts/PredictionLineChart";
import { getStockPrediction, getStocksList } from "../services/services";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Stack, TextField, Typography, useTheme } from "@mui/material";
import GridLoader from "react-spinners/GridLoader";
import Header from "../components/Header";
import { tokens } from "../theme";
import SelectSmall from "../components/select/SelectSmall";

const StockPrediction = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { tickersymbol } = useParams();
  const [tickers, setTickers] = useState();
  const [predictData, setPredictData] = useState();
  const [loading, setLoading] = useState(true);
  const [defaultRange, setDefaultRange] = useState(100);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getStockPrediction(tickersymbol, defaultRange);

      let tickers = await getStocksList();
      tickers = tickers.map((ticker) => ({
        label: ticker.tickersymbol,
        value: ticker.tickersymbol,
      }));

      setTickers(tickers);
      setPredictData(response);
      setLoading(false);
    };
    fetchData();
  }, [defaultRange, tickersymbol]);

  const renderForm = () => {
    return (
      <Stack
        component="form"
        sx={{
          width: "50px",
          display: "inline-block",
        }}
        spacing={2}
        noValidate
        autoComplete="off"
      >
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          variant="filled"
          size="small"
          defaultValue={defaultRange}
          onBlur={(e) => {
            setDefaultRange(e.target.value);
          }}
        />
      </Stack>
    );
  };

  const handleOnChange = (e) => {
    navigate(`/prediction/${e.target.value}`);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Header
        title="Dự Đoán Xu Hướng Của Cổ Phiếu Thị Trường Chứng Khoán Việt Nam"
        subtitle="Dữ liệu lần cuối cập nhật: 03/2023"
        sx={{
          backgroundColor: colors.primary[400],
          padding: "10px 20px",
          textAlign: "center",
        }}
      />
      <Typography
        sx={{
          margin: "0 150px 20px",
          fontSize: "1rem",
          display: "inline-block",
        }}
      >
        Mô hình được chúng tôi xây dựng và huấn luyện dựa trên giá lịch sử của
        phiếu kể từ 2017, nhằm dự đoán xu hướng của phiếu ở khoảng thời gian
        nhất định trong tương lai. <br />
        Lưu ý: Mô hình đang ở giai đoạn tiếp cận sơ khai, chưa thích hợp để sử
        dụng đầu tư thực tế. Hãy cân nhắc trước khi ra bất kỳ quyết định đầu tư
        nào.
      </Typography>
      <Box>
        <Typography
          sx={{
            fontSize: "2rem",
            fontWeight: 700,
            display: "inline-block",
          }}
        >
          Cổ phiếu dự đoán:&nbsp;
        </Typography>
        {tickers ? (
          <SelectSmall
            options={tickers}
            option={tickersymbol}
            label={"Cổ phiếu"}
            onChange={handleOnChange}
          />
        ) : null}
      </Box>
      {loading ? (
        <Box
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <GridLoader color="#36d7b7" />
        </Box>
      ) : (
        <Box margin="10px">
          <Box display="flex" margin="20px" padding="20px">
            <PredictionLineChart
              actualData={predictData["actual"]}
              testData={predictData["test"]}
              label={["Thực Tế", "Huấn luyện"]}
              sx={{ width: 950, height: 500 }}
            />{" "}
            <Box
              margin="0 40px"
              flexDirection="column"
              display="flex"
              justifyContent="center"
            >
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 700,
                }}
              >
                Dữ Liệu Huấn Luyện
              </Typography>
              <Typography variant="h5">
                Mô hình học máy được huấn luyện dựa trên giá lịch sử của phiếu
                kể từ 2017. Mô hình được huấn luyện sẽ dùng để đối chiếu lại với
                dữ liệu thực tế.
              </Typography>
            </Box>
          </Box>
          <Box display="flex" margin="20px" padding="20px">
            <Box
              margin="0 40px"
              flexDirection="column"
              display="flex"
              justifyContent="center"
            >
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 700,
                }}
              >
                Dự Đoán Xu Hướng
              </Typography>
              <Typography variant="h5" lineHeight="30px">
                Mô hình học máy sẽ dự đoán xu hướng của phiếu trong <br />{" "}
                {renderForm()} ngày tới. Lưu ý: Mô hình đang trong quá trình
                phát triển, hãy cân nhắc kỹ trước khi đưa ra quyết định đầu tư.
              </Typography>
            </Box>
            <PredictionLineChart
              actualData={predictData["actual"]}
              testData={predictData["predict"]}
              label={["Thực Tế", "Dự Đoán"]}
              sx={{ width: 950, height: 500 }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default StockPrediction;
