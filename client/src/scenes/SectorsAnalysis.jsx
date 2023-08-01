import React, { useEffect, useState } from "react";
import { getFScore } from "../services/services";
import { sectorsList } from "../common/common";
import BarChart from "../components/charts/BarChart";
import { Box, Typography, useTheme } from "@mui/material";
import Header from "../components/Header";
import GridLoader from "react-spinners/GridLoader";
import TreeMap from "../components/map/TreeMap";
import InfoTooltip from "../components/common/InfoTooltip";
import "../styles/SectorsAnalysis.css";
import ItemTabs from "../components/loaders/ItemTabs";
import { tokens } from "../theme";

const SectorsAnalysis = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [sectors] = useState(sectorsList);
  const [fScores, setFScore] = useState([]);
  const [fScoreBarChart, setFScoreBarChart] = useState([{}]);
  const [fScoreHeatMap, setFScoreHeatMap] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(2022);
  const [years, setYears] = useState([2020, 2021, 2022]);

  useEffect(() => {
    const fetchFScores = async () => {
      setLoading(true);

      document.title = "CoffeeStock - Phân Tích Ngành - Năm " + year;

      const tickerFScoreList = await Promise.all(
        sectors.map(async (sector) => {
          const fScores = await getFScore(sector.id, year);
          return fScores;
        })
      );

      const fScoreBarChart = extractFscoreBarChart(tickerFScoreList);
      const fScoreHeatMap = extractFscoreHeatMap(tickerFScoreList);

      setFScore(fScores);
      setFScoreBarChart(fScoreBarChart);
      setFScoreHeatMap(fScoreHeatMap);
      setLoading(false);
    };

    fetchFScores();
  }, [year]);

  const handleYearChange = (e, newValue) => {
    setYear(years[newValue]);
  };

  const extractFscoreBarChart = (tickerFScoreList) => {
    const fScoreChart = [];
    tickerFScoreList.map((fs) => {
      const sectorFscore = [];
      fs.map((f) => {
        sectorFscore.push({
          y: f.f_score,
          color: f.f_score >= 7 ? "green" : f.f_score >= 4 ? "yellow" : "red",
        });
      });
      sectorFscore.sort((a, b) => a.y - b.y);
      const fsData = fs.sort((a, b) => a.f_score - b.f_score);
      fScoreChart.push({
        sector: sectors.find((s) => s.id === fs[0].sectorid),
        chartData: sectorFscore,
        fScoreData: fsData,
      });
    });

    return fScoreChart;
  };

  const extractFscoreHeatMap = (tickerFScoreList) => {
    const fScoreHeatMap = [];
    tickerFScoreList.map((fs) => {
      fScoreHeatMap.push({
        id: "" + fs[0].sectorid,
        name: sectorsList.find((s) => s.id === fs[0].sectorid).name,
      });
      fs.map((f) => {
        fScoreHeatMap.push({
          name: f.tickersymbol,
          parent: "" + f.sectorid,
          value: f.f_score,
          color: f.f_score >= 7 ? "green" : f.f_score >= 4 ? "yellow" : "red",
        });
      });
    });

    return fScoreHeatMap;
  };

  const renderTreeMap = () => {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="30px 0"
      >
        <Header title="F-Score - Toàn Thị Trường" />
        <TreeMap sx={{ width: 900, height: 600 }} chartData={fScoreHeatMap} />
      </Box>
    );
  };

  const renderBarChart = () => {
    return (
      <Box>
        <Header
          title="F-Score - Chi Tiết Ngành"
          sx={{ display: "flex", justifyContent: "center" }}
        />
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {fScoreBarChart.map((f) => {
            return (
              <Box sx={{ margin: "10px" }}>
                <BarChart
                  chartData={f.chartData}
                  sector={f.sector}
                  fScoreData={f.fScoreData}
                  sx={{ width: 550, height: 350 }}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  };

  const renderTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Khả năng sinh lời</th>
            <th>Cơ cấu vốn - Tính thanh khoản</th>
            <th>Hiệu quả hoạt động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Net income &gt; 0&nbsp;</td>
            <td>Long-term Debt to Assets &lt; 0&nbsp;</td>
            <td>&nbsp;Gross Margin &gt; 0</td>
          </tr>
          <tr>
            <td>&nbsp;Net operation Cash flow &gt; 0</td>
            <td>
              Current Ratio &gt; 0<br />
            </td>
            <td>Assets Turnover &gt; 0&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;Return on Assets &gt; 0</td>
            <td>Shares Outstanding&nbsp; &lt; 0</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>Operating Cash Flow &gt; Net income&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
    >
      <Header
        title="Phân Tích Các Nhóm Ngành Chứng Khoán Việt Nam"
        subtitle="Công cụ tham chiếu: Piotroski F-score. Dữ liệu lần cuối cập nhật: 03/2023"
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
          textAlign: "center",
        }}
      >
        Bảng điểm Piotroski F-Score lần đầu được giới thiệu vào năm 2000 bởi
        giáo sư Toán học Joseph D. Piotroski, Đại học Chicago (Hiện là giảng
        viên ở Đại học Stanford). <br />
        Bằng cách xác định 9 hệ số trong báo cáo tài chính theo danh sách được
        chỉ định trong bảng F-Score
        <InfoTooltip title={renderTable()} /> theo thang điểm từ 0-1, chúng ta
        có thể dễ dàng tham khảo và đánh giá sức khoẻ tài chính về tỷ suất lợi
        nhuận, hiệu quả hoạt động cơ cấu vốn và tính thanh khoản của từng doanh
        nghiệp. <br /> <br />
        Chúng tôi lựa chọn 10 doanh nghiệp tiêu biểu nhất trong mỗi ngành (dựa
        trên vốn hoá thị trường) để trình bày, đánh giá và so sánh trong 1 năm
        hoạt động. <br /> Lưu ý: Thông tin chỉ mang tính chất tham khảo, không
        có hàm ý hay chủ đích khen, chê hoặc đánh giá bất kỳ doanh nghiệp nào
        cũng như không phản ánh toàn bộ thị trường chứng khoán Việt Nam. <br />
      </Typography>
      <Typography variant="h3" textAlign="center">
        {" "}
      </Typography>
      <Box display="flex" justifyContent="center">
        <ItemTabs option={year} options={years} onChange={handleYearChange} />
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
        <Box>
          {renderTreeMap()}
          {renderBarChart()}
        </Box>
      )}
    </Box>
  );
};

export default SectorsAnalysis;
