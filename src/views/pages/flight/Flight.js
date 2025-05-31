// src/views/Flight.js
import React from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom"; // For navigation

// Custom styles for the navigation boxes to match the image
const boxStyle = {
  background: "linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)", // Blue gradient
  color: "white",
  padding: "3rem 1.5rem", // Increased padding for larger boxes
  borderRadius: "0.5rem", // Slightly rounded corners
  textAlign: "center",
  textDecoration: "none",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "150px", // Ensure a minimum height
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
};

const boxHoverStyle = {
  transform: "translateY(-5px)",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
};

const Flight = () => {
  const [hoveredBox, setHoveredBox] = React.useState(null);

  return (
    <div className="content">
      {/* You can add a title for the Flight section if needed */}
      {/* <h2 className="text-center mb-4">Flight Management</h2> */}
      <Row className="justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <Col md="4" className="mb-4 mb-md-0">
          <Link
            to="/admin/flight/reservation-list"
            style={{ ...boxStyle, ...(hoveredBox === 'reservations' ? boxHoverStyle : {}) }}
            onMouseEnter={() => setHoveredBox('reservations')}
            onMouseLeave={() => setHoveredBox(null)}
          >
            <h4 style={{ color: "white", margin: 0, fontSize: "1.75rem" }}>Reservation list</h4>
          </Link>
        </Col>
        <Col md="4">
          <Link
            to="/admin/flight/analytics"
            style={{ ...boxStyle, ...(hoveredBox === 'analytics' ? boxHoverStyle : {}) }}
            onMouseEnter={() => setHoveredBox('analytics')}
            onMouseLeave={() => setHoveredBox(null)}
          >
            <h4 style={{ color: "white", margin: 0, fontSize: "1.75rem" }}>Analytics</h4>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default Flight;
