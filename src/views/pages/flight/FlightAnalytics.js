import React from "react";
import { Row, Col } from "reactstrap";
import SimpleBreadcrumb from "../../components/BreadCrumbs"; // Or BreadCrumbs if that's the filename
import FlightAnalyticMonth from "./FlightAnalyticMonth";

const FlightAnalytics = () => {

  // Breadcrumb items based on the new screenshot
  const breadcrumbItems = [
    { label: "Home", to: "/admin/dashboard" }, // Example route, adjust as needed
    { label: "Flight management", to: "/admin/flight" }, // Example route, adjust as needed
    { label: "Flight Info graphics" }, // Current page
  ];

  return (
    <div className="content">
      {/* Breadcrumb Row */}
      <Row>
        <Col md="12">
          {/* Ensure your CSS for .screenshot-style-breadcrumb is loaded globally or imported. */}
          <SimpleBreadcrumb
            items={breadcrumbItems}
            olClassName="screenshot-style-breadcrumb"
          />
        </Col>
      </Row>

      {/* Chart and Analytics Content Row */}
      <Row>
        {" "}
        {/* Added a new Row for the main card to keep breadcrumb separate if needed */}
        <Col md="12">
          <FlightAnalyticMonth />
        </Col>
      </Row>
    </div>
  );
};

export default FlightAnalytics;
