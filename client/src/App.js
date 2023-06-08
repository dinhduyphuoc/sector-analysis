import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { ColorModeContext, useMode } from "./theme";
import Topbar from "./scenes/global/Topbar";
import DashBoard from "./scenes/DashBoard";
import { useLoading, useLoadingUpdate } from "./contexts/loadingContext";
import SectorProvider from "./contexts/sectorContext";
import LoadingProvider from "./contexts/loadingContext";
import SectorAnalysis from "./scenes/SectorAnalysis";
import LoadingBar from "react-top-loading-bar";

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
              <Route path="/fundamental" element={<DashBoard />} />
              <Route
                path="/sector-analysis/"
                element={<Navigate replace to="/sector-analysis/NVL" />}
              />
              <Route path="/sector-analysis/:id" element={<SectorAnalysis />} />
            </Routes>
          </Container>
        </SectorProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
