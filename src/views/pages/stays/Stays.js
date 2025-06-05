import React from "react";
import { Row, Col } from "reactstrap";
import NavigationBox from "../../components/NavigationBox"; 

const Stays = () => {
  return (
    <div className="content">
      <Row 
        className="justify-content-center align-items-center" 
        style={{ minHeight: "calc(80vh - 120px)" }} 
      >
        <Col md="auto" className="mb-4 mb-md-0 d-flex justify-content-center">
          <NavigationBox
            to="/admin/stays/reservation-list"
            title="Reservation list"
          />
        </Col>
        <Col md="auto" className="d-flex justify-content-center">
          <NavigationBox
            to="/admin/stays/analytics"
            title="Analytics"
          />
        </Col>
        <Col md="auto" className="d-flex justify-content-center">
          <NavigationBox
            to="/admin/stays/accomodations"
            title="Accommodations"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Stays;
