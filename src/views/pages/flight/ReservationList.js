import React from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

const ReservationList = () => {
  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Flight Reservation List</CardTitle>
            </CardHeader>
            <CardBody>
              <p>
                This page will display the list of flight reservations.
                {/* TODO: Add table or list of reservations here */}
              </p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ReservationList;