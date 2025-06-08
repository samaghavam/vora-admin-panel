import React, { useRef, useState } from "react"; // Added useRef and useState
import { Row, Col, Button } from "reactstrap"; // Added Button
import SimpleBreadcrumb from "views/components/BreadCrumbs";
import CostCalculatorMonth from "./CostCalculatorMonth";
import CostCalculatorAllTime from "./CostCalculatorAllTime";
import CostCalculatorOveral from "./CostCalculatorOveral";

const CostCalculator = () => {
  const [activeButton, setActiveButton] = useState("thisMonth"); // Default active button

  // Refs for each section
  const thisMonthRef = useRef(null);
  const allTimeRef = useRef(null);
  const overallRef = useRef(null);

  const breadcrumbItems = [
    { label: "Home", to: "/admin/dashboard" },
    { label: "AI Management", to: "/admin/ai-management" },
    { label: "Cost Calculator Infograph" },
  ];

  const scrollToSection = (ref, sectionId) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveButton(sectionId); // Update active button state
    } else {
      console.warn(`Ref for section "${sectionId}" not found.`);
    }
  };

  return (
    <div className="content">
      {/* Breadcrumb Row */}
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
        {" "}
        {/* Centering the buttons */}
        <Col xs="auto" className="px-1">
          <Button
            className="btn-round py-3"
            color={activeButton === "thisMonth" ? "primary" : "info"} // 'info' or 'default' for inactive, 'primary' for active
            outline={activeButton !== "thisMonth"} // Make inactive buttons outlined if desired
            onClick={() => scrollToSection(thisMonthRef, "thisMonth")}
            style={{ minWidth: "120px" }} // Ensure buttons have some minimum width
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
       <CostCalculatorMonth />
      </div>
      <div
        ref={allTimeRef}
        id="allTimeSection"
        className="analytics-section pt-5"
      >
        <CostCalculatorAllTime />
      </div>
      <div
        ref={overallRef}
        id="overallSection"
        className="analytics-section pt-5"
      >
        <CostCalculatorOveral />
      </div>
    </div>
  );
};

export default CostCalculator;
