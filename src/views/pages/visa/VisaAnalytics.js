import React, { useRef, useState } from "react"; // Added useRef and useState
import { Row, Col, Button } from "reactstrap"; // Added Button
import SimpleBreadcrumb from "../../components/BreadCrumbs"; 
import VisaAnalyticMonth from "./VisaAnalyticMonth";
import VisaAnalyticAllTime from "./VisaAnalyticAllTime";

const VisaAnalytics = () => {
  const [activeButton, setActiveButton] = useState("thisMonth"); // Default active button

  // Refs for each section
  const thisMonthRef = useRef(null);
  const allTimeRef = useRef(null);

  const breadcrumbItems = [
    { label: "Home", to: "/admin/dashboard" }, 
    { label: "Visa management", to: "/admin/visa" }, 
    { label: "Visa Info graphics" }, 
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
      <Row className="text-center"> {/* Centering the buttons */}
        <Col xs="auto" className="px-1">
          <Button
            className="btn-round py-3"
            color={activeButton === "thisMonth" ? "primary" : "info"} // 'info' or 'default' for inactive, 'primary' for active
            outline={activeButton !== "thisMonth"} // Make inactive buttons outlined if desired
            onClick={() => scrollToSection(thisMonthRef, "thisMonth")}
            style={{ minWidth: '120px' }} // Ensure buttons have some minimum width
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
            style={{ minWidth: '120px' }}
          >
            All time
          </Button>
        </Col>
      </Row>
      <div ref={thisMonthRef} id="thisMonthSection" className="analytics-section pt-3">
        <VisaAnalyticMonth />
      </div>
      <div ref={allTimeRef} id="allTimeSection" className="analytics-section pt-5"> {/* pt-5 for top padding/spacing */}
        <VisaAnalyticAllTime />
      </div>
    </div>
  );
};

export default VisaAnalytics;
