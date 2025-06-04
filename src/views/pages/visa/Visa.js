import React from "react";
import { Row, Col } from "reactstrap";
import NavigationBox from "../../components/NavigationBox"; 

const Visa = () => {
  return (
    <div className="content">
      <Row 
        className="justify-content-center align-items-center" 
        style={{ minHeight: "calc(80vh - 120px)" }} 
      >
        <Col md="auto" className="mb-4 mb-md-0 d-flex justify-content-center">
          <NavigationBox
            to="/admin/visa/request-list"
            title="Request list"
          />
        </Col>
        <Col md="auto" className="d-flex justify-content-center">
          <NavigationBox
            to="/admin/visa/analytics"
            title="Analytics"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Visa;
