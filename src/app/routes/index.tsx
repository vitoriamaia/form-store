import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Register from "../components/Register";
import Home from "../pages/Home";
import Store from "../components/Store";
const RouteConfig: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Register" element={<Register/>} />
      <Route path="/Store" element={<Store/>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouteConfig;
