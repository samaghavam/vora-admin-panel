import React, { useRef, useState } from "react"; 
import { Row, Col, Button } from "reactstrap"; 
import SimpleBreadcrumb from "../../components/BreadCrumbs"; 
import FlightAnalyticMonth from "./FlightAnalyticMonth";
import FlightAnalyticAllTime from "./FlightAnalyticAllTime";
import FlightAnalyticalOveral from "./FlightAnalyticalOveral";

const FlightAnalytics = () => {
  const [activeButton, setActiveButton] = useState("thisMonth"); 

  const thisMonthRef = useRef(null);
  const allTimeRef = useRef(null);
  const overallRef = useRef(null);

  const breadcrumbItems = [
    { label: "Home", to: "/admin/dashboard" }, 
    { label: "Flight management", to: "/admin/flight" }, 
    { label: "Flight Info graphics" }, 
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

      <Row className="text-center"> 
        <Col xs="auto" className="px-1">
          <Button
            className="btn-round py-3"
            color={activeButton === "thisMonth" ? "info" : null} 
            outline={activeButton !== "thisMonth"} 
            onClick={() => scrollToSection(thisMonthRef, "thisMonth")}
            style={{ minWidth: '120px' }} 
          >
            This month
          </Button>
        </Col>
        <Col xs="auto" className="px-1">
          <Button
            className="btn-round py-3"
            color={activeButton === "allTime" ? "info" : null}
            outline={activeButton !== "allTime"}
            onClick={() => scrollToSection(allTimeRef, "allTime")}
            style={{ minWidth: '120px' }}
          >
            All time
          </Button>
        </Col>
        <Col xs="auto" className="px-1">
          <Button
            className="btn-round py-3"
            color={activeButton === "overall" ? "info" : null}
            outline={activeButton !== "overall"}
            onClick={() => scrollToSection(overallRef, "overall")}
            style={{ minWidth: '120px' }}
          >
            Overall
          </Button>
        </Col>
      </Row>
      <div ref={thisMonthRef} id="thisMonthSection" className="analytics-section pt-3">
        <FlightAnalyticMonth />
      </div>
      <div ref={allTimeRef} id="allTimeSection" className="analytics-section pt-5"> 
        <FlightAnalyticAllTime />
      </div>
      <div ref={overallRef} id="overallSection" className="analytics-section pt-5"> 
        <FlightAnalyticalOveral />
      </div>
    </div>
  );
};

export default FlightAnalytics;
