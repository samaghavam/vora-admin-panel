import React from "react";
import SimpleBreadcrumb from "views/components/BreadCrumbs";
import AccommodationTable from "./AccomodationTable";
import { Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const StaysAccommodations = () => {
  const breadcrumbItems = [
    { label: "Home", to: "/admin/dashboard" },
    { label: "Stays management", to: "/admin/stays" },
    { label: "Stays Info graphics" },
  ];

  return (
    <div className="content">
      <Row className="d-flex justufy-content-between align-items-center">
        <Col md="8">
          <SimpleBreadcrumb
            items={breadcrumbItems}
            olClassName="screenshot-style-breadcrumb"
          />
        </Col>
        <Col md="4" className="text-right">
          <Link to="/admin/stays/accomodations/add-new-accommodation">
            <Button color="info">Add new accommodation</Button>
          </Link>
        </Col>
      </Row>
      <AccommodationTable />
    </div>
  );
};
export default StaysAccommodations;
