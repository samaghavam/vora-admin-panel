import React from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

const FlightAnalytics = () => {
  return (
    <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Flight Analytics</CardTitle>
            </CardHeader>
            <CardBody>
              <p>
                This page will display flight analytics and charts.
                {/* TODO: Add analytics components and charts here */}
              </p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FlightAnalytics;