import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Button, Tab, Tabs, Typography, useTheme } from "@mui/material";
import LineChart from "../../components/charts/LineChart";
import { convertISO8601ToMilliseconds } from "../../utils/timeUtils";
import EnhancedTable from "../../components/tables/EnhancedTable";
import sectorsStore from "../../stores/sectorStore";
import http from "../../utils/httpUtils";
import { ColorModeContext, tokens } from "../../theme";
import { useContext } from "react";
import { getSectorsList } from "../../services/services";

const DashBoard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const sectors = sectorsStore((state) => state.sectors);
  const sectorsState = sectorsStore((state) => state.sectorsState);
  const sectorsData = sectorsStore((state) => state.sectorsData);
  const initSectors = sectorsStore((state) => state.initSectors);

  const [sectorData, setSector] = useState([]);

  useEffect(() => {
    initSectors([10, 15, 20]);
  }, []);

  useEffect(() => {
    const removed = sectorsData.filter((sector) => {
      return !sectorsState.includes(parseInt(sector.sectorid));
    });
  }, [sectorsState]);

  useEffect(() => {
    const chartData = sectorsData.map((sector) => {
      const processed = sector.price.map((price, i) => {
        return [
          convertISO8601ToMilliseconds(sector.date[i], 7),
          parseFloat(price),
        ];
      });
      return {
        data: processed,
        sectorid: parseInt(sector.sectorid),
      };
    });

    setSector(chartData);
  }, [sectorsData]);

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "#20232E",
          height: "100%",
          margin: "12px",
        }}
      >
        <Box
          display="flex"
          sx={{
            border: "1px solid #3D3D3D",
            borderRadius: "5px",
          }}
        >
          <Box flex="5">
            <LineChart sectorData={sectorData} />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            flex="1"
            sx={{
              bgcolor: "#20232E",
            }}
          >
            <Box
              sx={{
                margin: "24px 24px 12px",
              }}
            >
              <Typography align="center" variant="h6" fontWeight="700">
                Dạng biểu đồ
              </Typography>
            </Box>
            <Box>
              <Tabs value={0} centered>
                <Tab label="Ngành" disableRipple />
                <Tab label="Biểu đồ" disableRipple />
              </Tabs>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          bgcolor: "#20232E",
          margin: "12px",
          height: "100%",
        }}
      >
        <EnhancedTable sectors={sectors} sectorsState={sectorsState} />
      </Box>
    </Box>
  );
};
export default DashBoard;
