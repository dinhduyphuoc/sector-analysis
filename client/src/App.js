import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Topbar from "./scenes/global/Topbar";
import DashBoard from "./scenes/dashboard/DashBoard";

function App() {
  return (
    <React.Fragment>
      <Topbar />
      <Routes>
        <Route path="/" element={<DashBoard />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
