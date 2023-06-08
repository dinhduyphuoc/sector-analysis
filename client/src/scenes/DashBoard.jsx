import React, { useState, useEffect, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material";
import LineChart from "../components/charts/LineChart";
import { convertISO8601ToMilliseconds, roundNum } from "../utils/utils";
import EnhancedTable from "../components/tables/EnhancedTable";
import { ColorModeContext, tokens } from "../theme";
import { useSector, useSectorUpdate } from "../contexts/sectorContext";
import { useLoadingUpdate } from "../contexts/loadingContext";

const DashBoard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { sectors, sectorsState, sectorsData } = useSector();
  const { initSectors } = useSectorUpdate();
  const { setProgress } = useLoadingUpdate();

  useEffect(() => {
    (async () => {
      setProgress(50);
      const sectorsId = [10, 15, 30];
      initSectors(sectorsId);
      setProgress(100);
    })();
  }, []);

  const [sectorData, setSector] = useState([]);

  useEffect(() => {
    const chartData = sectorsData.map((sector) => {
      const processed = sector.price.map((price, i) => {
        return [
          convertISO8601ToMilliseconds(sector.datetime[i], 7),
          roundNum(parseFloat(price)),
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
            <LineChart sectors={sectors} sectorData={sectorData} />
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
