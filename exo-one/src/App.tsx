import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts.tsx/MainLayout";
import BasePage from "./pages/BasePage";
import MapPage from "./pages/MapPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<BasePage />} />
          <Route path="/map" element={<MapPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
