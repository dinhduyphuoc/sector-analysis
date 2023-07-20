import React, { useState } from "react";
import { Box } from "@mui/system";
import LineChart from "../components/charts/LineChart";
import Header from "../components/Header";
import { getSectorsList } from "../services/services";

const SectorsFundamental = () => {
  const [sectors] = useState(getSectorsList());

  const renderChart = (sector, index) => {
    const random = Math.floor(Math.random() * 1000);
    return <LineChart key={sector + index} sector={sector} isSector={true} />;
  };

  return (
    <Box margin="0 40px">
      <Header
        title="Toàn Cảnh Thị Trường Việt Nam: Các Nhóm Ngành"
        subtitle="Chỉ số tham chiếu: VNINDEX"
        sx={{
          backgroundColor: "#20232E",
          padding: "10px 20px",
          textAlign: "center",
        }}
      />
      {sectors.map((sector, index) => (
        <Box
          key={sector.id}
          sx={{
            bgcolor: "#20232E",
            margin: "20px 0",
            height: "500px",
          }}
        >
          {renderChart(sector, index)}
        </Box>
      ))}
      <Box
        sx={{
          bgcolor: "#20232E",
          height: "100%",
        }}
      >
        <LineChart sector={sectors} />
      </Box>
      <Box
        sx={{
          bgcolor: "#20232E",
          marginTop: "12px",
          height: "100%",
        }}
      >
        {/* <EnhancedTable
          sectors={sectors}
          sectorsState={sectorsState}
          onSectorOptionChange={handleSectorChangeOption}
        /> */}
      </Box>
    </Box>
  );
};
export default SectorsFundamental;
