import React from "react";
import { Row, Col } from "reactstrap";
import NavigationBox from "../../components/NavigationBox"; 

const Claims = () => {
  return (
    <div className="content">
      <Row 
        className="justify-content-center align-items-center" 
        style={{ minHeight: "calc(80vh - 120px)" }} 
      >
        <Col md="auto" className="d-flex justify-content-center">
          <NavigationBox
            to="/admin/claims/admin-management"
            title="Claims"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Claims;
