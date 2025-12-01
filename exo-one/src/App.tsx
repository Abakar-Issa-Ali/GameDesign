import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BasePage from "./pages/BasePage";
import MapPage from "./pages/MapPage";
import ResearchPage from "./pages/ResearchPage";
import ColonistsPage from "./pages/ColonistsPage";
import MissionsPage from "./pages/MissionsPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BasePage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/colonists" element={<ColonistsPage />} />
        <Route path="/missions" element={<MissionsPage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;