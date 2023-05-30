import React from "react";
import { Route, Routes } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import DashBoard from "./scenes/dashboard/DashBoard";
import { Container } from "@mui/system";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import SectorProvider from "./contexts/sectorContext";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <SectorProvider>
          <CssBaseline />
          <Topbar />
          <Container maxWidth="sx">
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/test" element={<h1>Test</h1>} />
            </Routes>
          </Container>
        </SectorProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
