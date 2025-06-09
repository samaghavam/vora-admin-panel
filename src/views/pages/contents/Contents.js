import React from "react";
import { Row, Col } from "reactstrap";
import NavigationBox from "../../components/NavigationBox"; 

const Contents = () => {
  const navigationItems = [
    { title: "Home Page", to: "/admin/contents/Home" },
    { title: "About Us", to: "/admin/contents/about" },
    { title: "Contact Us", to: "/admin/contents/contact-us" },
    { title: "AI Description", to: "/admin/contents/ai-description" },
    { title: "Footer", to: "/admin/contents/footer" },
    { title: "Header", to: "/admin/contents/header" },
    { title: "Card FAQs", to: "/admin/contents/card" },
    { title: "AI Description", to: "/admin/contents/ai-description" },
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

export default Contents;
