import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import LineChart from "../components/charts/LineChart";
import Header from "../components/Header";
import { getSectorsList } from "../services/services";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";

const SectorsFundamental = () => {
  const [sectors] = useState(getSectorsList());
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    document.title = "CoffeeStock - Tổng Quan Thị Trường";
  }, []);

  const renderChart = (sector, index) => {
    const random = Math.floor(Math.random() * 1000);
    return <LineChart key={sector + index} sector={sector} isSector={true} />;
  };

  return (
    <Box margin="0 40px">
      <Header
        title="Toàn Cảnh Thị Trường Việt Nam: Các Nhóm Ngành"
        subtitle="Chỉ số tham chiếu: VNINDEX. Dữ liệu lần cuối cập nhật: 03/2023"
        sx={{
          backgroundColor: colors.primary[400],
          padding: "10px 20px",
          textAlign: "center",
        }}
      />
      {sectors.map((sector, index) => (
        <Box
          key={sector.id}
          sx={{
            bgcolor: colors.primary[400],
            margin: "20px 0",
            height: "500px",
          }}
        >
          {renderChart(sector, index)}
        </Box>
      ))}
      <Box
        sx={{
          bgcolor: colors.primary[400],
          height: "100%",
        }}
      >
        <LineChart sector={sectors} />
      </Box>
      <Box
        sx={{
          bgcolor: colors.primary[400],
          marginTop: "12px",
          height: "100%",
        }}
      >
      </Box>
    </Box>
  );
};
export default SectorsFundamental;
