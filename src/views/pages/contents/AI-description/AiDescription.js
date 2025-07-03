import React from "react";
import { Row, Col } from "reactstrap";
import SimpleBreadcrumb from "views/components/BreadCrumbs";

const AiDescription = () => {
  const breadcrumbItems = [
    { label: "Home", to: "/admin/dashboard" },
    { label: "Content management", to: "/admin/contents" },
    { label: "Contact us" },
  ];

  return (
    <div className="content">
      {alert}
      <Row>
        <Col md="12">
          <SimpleBreadcrumb
            items={breadcrumbItems}
            olClassName="screenshot-style-breadcrumb"
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <h1>AI Description</h1>
          <p>not designed yet</p>
        </Col>
      </Row>
    </div>
  );
};

export default AiDescription;
