import React, { useRef, useState } from "react"; 
import { Row, Col, Button } from "reactstrap"; 
import SimpleBreadcrumb from "../../components/BreadCrumbs";
import StaysAnalyticsMonth from "./StaysAnalyticsMonth";
import StaysAnalyticsAllTime from "./StaysAnalyticsAllTime";
import StaysAnalyticsOveral from "./StaysAnalyticsOveral";

const StaysAnalytics = () => {
  const [activeButton, setActiveButton] = useState("thisMonth"); 
  const thisMonthRef = useRef(null);
  const allTimeRef = useRef(null);
  const overallRef = useRef(null);

  const breadcrumbItems = [
    { label: "Home", to: "/admin/dashboard" },
    { label: "Stays management", to: "/admin/stays" },
    { label: "Stays Info graphics" },
  ];

  const scrollToSection = (ref, sectionId) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveButton(sectionId); 
    } else {
      console.warn(`Ref for section "${sectionId}" not found.`);
    }
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          <SimpleBreadcrumb
            items={breadcrumbItems}
            olClassName="screenshot-style-breadcrumb"
          />
        </Col>
      </Row>

      {/* Navigation Buttons Row */}
      <Row className="text-center">
        <Col xs="auto" className="px-1">
          <Button
            className="btn-round py-3"
            color={activeButton === "thisMonth" ? "primary" : "info"} 
            outline={activeButton !== "thisMonth"} 
            onClick={() => scrollToSection(thisMonthRef, "thisMonth")}
            style={{ minWidth: "120px" }} 
          >
            This month
          </Button>
        </Col>
        <Col xs="auto" className="px-1">
          <Button
            className="btn-round py-3"
            color={activeButton === "allTime" ? "primary" : "info"}
            outline={activeButton !== "allTime"}
            onClick={() => scrollToSection(allTimeRef, "allTime")}
            style={{ minWidth: "120px" }}
          >
            All time
          </Button>
        </Col>
        <Col xs="auto" className="px-1">
          <Button
            className="btn-round py-3"
            color={activeButton === "overall" ? "primary" : "info"}
            outline={activeButton !== "overall"}
            onClick={() => scrollToSection(overallRef, "overall")}
            style={{ minWidth: "120px" }}
          >
            Overall
          </Button>
        </Col>
      </Row>
      <div
        ref={thisMonthRef}
        id="thisMonthSection"
        className="analytics-section pt-3"
      >
        <StaysAnalyticsMonth />
      </div>
      <div
        ref={allTimeRef}
        id="allTimeSection"
        className="analytics-section pt-5"
      >
        <StaysAnalyticsAllTime />
      </div>
      <div
        ref={overallRef}
        id="overallSection"
        className="analytics-section pt-5"
      >
        <StaysAnalyticsOveral />
      </div>
    </div>
  );
};

export default StaysAnalytics;
