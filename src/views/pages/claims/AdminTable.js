import React from "react";
import classNames from "classnames";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap";

// Assuming ReactTable is correctly imported from your project structure
import ReactTable from "components/ReactTable/ReactTable.js";

// New dataTable with admin management structure
const adminDataTable = [
  ["Airi Satou", "2024-10-15", "Active", "Super Admin", "Full Access", "+1-202-555-0104"],
  ["Angelica Ramos", "2024-11-01", "Inactive", "Content Manager", "Read, Write", "+1-310-555-0188"],
  ["Ashton Cox", "2024-12-05", "Active", "Support Staff", "Read-only", "+1-415-555-0132"],
  ["Bradley Greer", "2024-09-20", "Active", "Administrator", "Full Access", "+44-20-7946-0958"],
  ["Brenden Wagner", "2025-01-10", "Active", "Administrator", "Full Access", "+1-415-555-0153"],
  ["Brielle Williamson", "2024-11-22", "Inactive", "Content Manager", "Read, Write", "+1-212-555-0199"],
  ["Caesar Vance", "2024-10-30", "Active", "Support Staff", "Read-only", "+1-973-555-0122"],
  ["Cedric Kelly", "2025-02-18", "Active", "Super Admin", "Full Access", "+44-131-496-0303"],
  ["Charde Marshall", "2024-12-12", "Active", "Administrator", "Full Access", "+1-415-555-0187"],
  ["Colleen Hurst", "2025-03-01", "Inactive", "Support Staff", "Read-only", "+1-213-555-0142"],
];

const AdminTable = () => {
  const [data, setData] = React.useState(
    adminDataTable.map((prop, key) => {
      return {
        id: key,
        adminName: prop[0],
        creationDate: prop[1],
        stateAdmin: prop[2],
        role: prop[3],
        claims: prop[4],
        phoneNumber: prop[5],
        actions: (
          <div className="actions-right">
            {/* View button */}
            <Button
              onClick={() => {
                let obj = data.find((o) => o.id === key);
                // In a real app, this would open a modal or navigate to a details page
                alert(
                  "You've clicked VIEW button on:\n" +
                  `Admin Name: ${obj.adminName}\n` +
                  `Creation Date: ${obj.creationDate}\n` +
                  `State: ${obj.stateAdmin}\n` +
                  `Role: ${obj.role}\n` +
                  `Claims: ${obj.claims}\n` +
                  `Phone: ${obj.phoneNumber}`
                );
              }}
              color="info"
              size="sm"
              className={classNames("btn-icon btn-link like")}
              title="View"
            >
              <i className="tim-icons icon-zoom-split text-white" />
            </Button>{" "}
            {/* Edit button */}
            <Button
              onClick={() => {
                let obj = data.find((o) => o.id === key);
                // In a real app, this would open an edit modal or page
                alert(
                  "You've clicked EDIT button on:\n" +
                  `Admin Name: ${obj.adminName}`
                );
              }}
              color="warning"
              size="sm"
              className={classNames("btn-icon btn-link edit")}
              title="Edit"
            >
              <i className="tim-icons icon-pencil text-white" />
            </Button>{" "}
            {/* Remove button */}
            <Button
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete the admin: ${data.find(o => o.id === key).adminName}?`)) {
                    setData(currentData => currentData.filter(item => item.id !== key));
                }
              }}
              color="danger"
              size="sm"
              className={classNames("btn-icon btn-link remove")}
              title="Remove"
            >
              <i className="tim-icons icon-simple-remove text-white" />
            </Button>
          </div>
        ),
      };
    })
  );

  return (
    <>
      <div className="content">
        <Row> {/* Removed mt-5 to match image */}
          <Col xs={12} md={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">React Table</CardTitle>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={data}
                  filterable
                  resizable={false}
                  columns={[
                    {
                      Header: "Admin name",
                      accessor: "adminName",
                    },
                    {
                      Header: "Creation date",
                      accessor: "creationDate",
                    },
                    {
                      Header: "State admin",
                      accessor: "stateAdmin",
                    },
                    {
                      Header: "Role",
                      accessor: "role",
                    },
                    {
                      Header: "Claims",
                      accessor: "claims",
                    },
                    {
                      Header: "Phone number",
                      accessor: "phoneNumber",
                    },
                    {
                      Header: "Actions",
                      accessor: "actions",
                      sortable: false,
                      filterable: false,
                    },
                  ]}
                  defaultPageSize={10}
                  showPaginationTop
                  showPaginationBottom={false}
                  className="-striped -highlight"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AdminTable;
