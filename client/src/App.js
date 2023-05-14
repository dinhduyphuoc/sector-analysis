import React from "react";
import { Route, Routes } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import DashBoard from "./scenes/dashboard/DashBoard";
import { Container } from "@mui/system";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Topbar />
        <Container maxWidth="sx">
          <Routes>
            <Route path="/" element={<DashBoard />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
