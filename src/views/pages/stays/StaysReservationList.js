import React from "react";
import { Row, Col } from "reactstrap";
import SimpleBreadcrumb from "../../components/BreadCrumbs";
import ReservationTable from "./ReservationTable";

const StaysReservationList = () => {
  const breadcrumbItems = [
    { label: "Home", to: "/admin/dashboard" },
    { label: "Stays management", to: "/admin/stays" },
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

export default StaysReservationList;
