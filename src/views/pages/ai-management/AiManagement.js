import React from "react";
import { Row, Col } from "reactstrap";
import NavigationBox from "../../components/NavigationBox"; // Assuming this path is correct

// Renamed component from Stays to AiManagement
const AiManagement = () => {
  // Array of navigation box data for easy mapping and maintenance
  const navigationItems = [
    { title: "Overal Performance", to: "/admin/ai-management/performance" },
    { title: "Travel Assists", to: "/admin/ai-management/assists" },
    { title: "Travel on budget", to: "/admin/ai-management/travel-on-budget" },
    { title: "Cost Calculator", to: "/admin/ai-management/cost-calculator" },
    {
      title: "AI purchases",
      to: "/admin/ai-management/purchases",
    }, // Added subtitle based on image
  ];

  return (
    <div className="content">
      {/* This outer Row centers the main content column vertically and horizontally. */}
      <Row
        className="justify-content-center align-items-center"
        style={{ minHeight: "calc(80vh - 120px)" }}
      >
        {/* This container column holds our grid. It is centered by the Row above. */}
        <Col>
          {/* This inner Row contains the actual grid items. */}
          <Row>
            {navigationItems.map((item, index) => (
              // Each item gets a column. On large screens (lg), it takes 3/12 width (4 per row).
              // The 5th item will wrap naturally and align to the left.
              <Col lg="3" md="6" key={index} className="mb-4">
                {/* We now use the corrected NavigationBox component. */}
                <NavigationBox
                  to={item.to}
                  title={item.title}
                  subtitle={item.subtitle}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AiManagement;
