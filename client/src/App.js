import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { ColorModeContext, useMode } from "./theme";
import Topbar from "./scenes/global/Topbar";
import SectorsFundamental from "./scenes/SectorsFundamental";
import { useLoading, useLoadingUpdate } from "./contexts/loadingContext";
import SectorProvider from "./contexts/sectorContext";
import LoadingBar from "react-top-loading-bar";
import SectorsAnalysis from "./scenes/SectorsAnalysis";

function App() {
  const [theme, colorMode] = useMode();
  const { progress } = useLoading();
  const { setProgress } = useLoadingUpdate();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <SectorProvider>
          <CssBaseline />
          <LoadingBar
            color="#f11946"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          <Topbar />
          <Container maxWidth="sx">
            <Routes>
              <Route
                path="/"
                element={<Navigate replace to="/fundamental" />}
              />
              <Route path="/fundamental" element={<SectorsFundamental />} />
              <Route path="/analysis" element={<SectorsAnalysis />} />
            </Routes>
          </Container>
        </SectorProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
