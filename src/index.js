import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "layouts/Auth/Auth.js";
import AdminLayout from "layouts/Admin/Admin.js";
import RTLLayout from "layouts/RTL/RTL.js";

import "assets/css/nucleo-icons.css";
import "react-notification-alert/dist/animate.css";
import "assets/scss/black-dashboard-pro-react.scss?v=1.2.0";
import "assets/demo/demo.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/rtl/*" element={<RTLLayout />} />
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  </BrowserRouter>
);
