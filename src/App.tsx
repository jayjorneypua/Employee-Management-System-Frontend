import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./components/pages/HomePage";
import DepartmentPage from "./components/pages/DepartmentPage";
import EmployeePage from "./components/pages/EmployeePage";
import PositionPage from "./components/pages/PositionPage";

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/departments" element={<DepartmentPage />} />
          <Route path="/employees" element={<EmployeePage />} />
          <Route path="/positions" element={<PositionPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
