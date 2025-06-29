import React, { useRef, useState } from "react"; 
import { Row, Col, Button } from "reactstrap"; 
import SimpleBreadcrumb from "views/components/BreadCrumbs";
import TravelMonth from "./TravelBudgetMonth";
import TravelAsistAllTime from "./TravelBudgetAllTime";
import TravelAsistOveral from "./TravelBudgetOveral";

const TravelBudget = () => {
  const [activeButton, setActiveButton] = useState("thisMonth"); 

  // Refs for each section
  const thisMonthRef = useRef(null);
  const allTimeRef = useRef(null);
  const overallRef = useRef(null);

  const breadcrumbItems = [
    { label: "Home", to: "/admin/dashboard" },
    { label: "AI Management", to: "/admin/ai-management" },
    { label: "Travel Budget Infograph" },
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
        <TravelMonth />
      </div>
      <div
        ref={allTimeRef}
        id="allTimeSection"
        className="analytics-section pt-5"
      >
        <TravelAsistAllTime />
      </div>
      <div
        ref={overallRef}
        id="overallSection"
        className="analytics-section pt-5"
      >
        <TravelAsistOveral />
      </div>
    </div>
  );
};

export default TravelBudget;
