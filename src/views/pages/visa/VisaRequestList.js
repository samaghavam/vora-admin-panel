import React from "react";
import { Row, Col } from "reactstrap";
import SimpleBreadcrumb from "../../components/BreadCrumbs";
import VisaRequestListTable from "./VisaRequestListTable";

const VisaRequestList = () => {
  const breadcrumbItems = [
    { label: "Home", to: "/admin/dashboard" },
    { label: "UAE Visa", to: "/admin/visa" },
    { label: "Request List" },
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
      <VisaRequestListTable />
    </div>
  );
};

export default VisaRequestList;
