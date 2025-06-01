import React from "react";
import SimpleBreadcrumb from "../../components/BreadCrumbs"; 
import FlightAnalyticMonth from "./FlightAnalyticMonth";
import FlightAnalyticAllTime from "./FlightAnalyticAllTime";
import FlightAnalyticalOveral from "./FlightAnalyticalOveral";

const FlightAnalytics = () => {
  const breadcrumbItems = [
    { label: "Home", to: "/admin/dashboard" }, 
    { label: "Flight management", to: "/admin/flight" }, 
    { label: "Flight Info graphics" }, 
  ];

  return (
    <div className="content">
      <SimpleBreadcrumb
        items={breadcrumbItems}
        olClassName="screenshot-style-breadcrumb"
      />
      <FlightAnalyticMonth />
      <FlightAnalyticAllTime />
      <FlightAnalyticalOveral />
    </div>
  );
};

export default FlightAnalytics;
