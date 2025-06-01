import React from "react";
import { Row, Col } from "reactstrap";
import SimpleBreadcrumb from "../../components/BreadCrumbs";
import ReservationTable from "./ReservationTable";

const ReservationList = () => {
  const breadcrumbItems = [
    { label: "Home", to: "/admin/dashboard" },
    { label: "Flight management", to: "/admin/flight" },
    { label: "Reservation List" },
  ];

  return (
    <div className="content">
      <Row>
        <Col>
          <SimpleBreadcrumb
            items={breadcrumbItems}
            olClassName="screenshot-style-breadcrumb"
          />
        </Col>
      </Row>
      <ReservationTable />
    </div>
  );
};

export default ReservationList;
