import React from "react";
import { Row, Col } from "reactstrap";
import NavigationBox from "../../components/NavigationBox"; 
const AiManagement = () => {
  const navigationItems = [
    { title: "Overal Performance", to: "/admin/ai-management/performance" },
    { title: "Travel Assists", to: "/admin/ai-management/assists" },
    { title: "Travel on budget", to: "/admin/ai-management/travel-on-budget" },
    { title: "Cost Calculator", to: "/admin/ai-management/cost-calculator" },
    {
      title: "AI purchases",
      to: "/admin/ai-management/purchases",
    }, 
  ];

  return (
    <div className="content">
      <Row
        className="justify-content-center align-items-center"
        style={{ minHeight: "calc(80vh - 120px)" }}
      >
        <Col>
          <Row>
            {navigationItems.map((item, index) => (
              <Col lg="3" md="6" key={index} className="mb-4">
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
