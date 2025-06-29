import React from "react";
import { Row, Col } from "reactstrap";
import SimpleBreadcrumb from "../../components/BreadCrumbs";
import AdminTable from "./AdminTable";
const AdminManagement = () => {
  const breadcrumbItems = [
    { label: "Home", to: "/admin/dashboard" },
    { label: "Admin management", to: "/admin/claims" },
    { label: "Claims" },
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
      <AdminTable />
    </div>
  );
};
export default AdminManagement;
