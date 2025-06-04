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
  Badge // Added for styling the 'State'
} from "reactstrap";

import ReactTable from "components/ReactTable/ReactTable.js";

// New sample data structure for Visa Requests
const visaRequestSampleData = [
  ["Airi Satou", "P1234567", "2030-10-15", "Tourism", "Flight-direct-stay", "In progress"],
  ["Angelica Ramos", "P7654321", "2028-11-01", "Business", "Hotel-Only", "Approved"],
  ["Ashton Cox", "P9876500", "2029-12-05", "Student", "Application Submitted", "Pending Review"],
  ["Bradley Greer", "P2345678", "2027-09-20", "Tourism", "Flight-direct-stay", "Rejected"],
  ["Brenden Wagner", "P8765432", "2031-01-10", "Work", "Visa Issued", "Completed"],
  ["Brielle Williamson", "P3456789", "2026-11-22", "Tourism", "Flight-direct-stay", "In progress"],
  ["Caesar Vance", "P0987654", "2029-10-30", "Business", "Hotel-Only", "Approved"],
  ["Cedric Kelly", "P4567890", "2030-02-18", "Student", "Application Submitted", "Pending Review"],
  ["Charde Marshall", "P1098765", "2028-12-12", "Tourism", "Flight-direct-stay", "In progress"],
  ["Colleen Hurst", "P5678901", "2027-03-01", "Work", "Visa Issued", "Completed"],
];

// Helper function to determine badge color based on state
const getStateBadgeColor = (state) => {
  switch (state.toLowerCase()) {
    case "in progress":
      return "info";
    case "approved":
      return "success";
    case "pending review":
      return "warning";
    case "rejected":
      return "danger";
    case "completed":
      return "primary";
    default:
      return "secondary";
  }
};


const VisaRequestListTable = () => {
  const [data, setData] = React.useState(
    visaRequestSampleData.map((prop, key) => {
      return {
        id: key,
        personName: prop[0],
        passportNumber: prop[1],
        passportExpirationDate: prop[2],
        kindOfVisaRequest: prop[3],
        requestFunnel: prop[4],
        state: prop[5], // The actual state string
        // Custom renderer for the 'State' column to show badges
        stateDisplay: (
          <Badge color={getStateBadgeColor(prop[5])} pill>
            {prop[5]}
          </Badge>
        ),
        actions: (
          <div className="actions-right">
            <Button
              onClick={() => {
                let obj = data.find((o) => o.id === key);
                if (obj) {
                  alert(
                    "View details for: \n" +
                    `Person Name: ${obj.personName}\n` +
                    `Passport Number: ${obj.passportNumber}\n` +
                    `Passport Expiration: ${obj.passportExpirationDate}\n` +
                    `Visa Type: ${obj.kindOfVisaRequest}\n` +
                    `Funnel: ${obj.requestFunnel}\n` +
                    `State: ${obj.state}`
                  );
                }
              }}
              color="info"
              size="sm"
              className={classNames("btn-icon btn-link", {
                "btn-neutral": key < 3, // Example: different style for first few
              })}
              title="View"
            >
              <i className="tim-icons icon-zoom-split" />
            </Button>{" "}
            <Button
              onClick={() => {
                let obj = data.find((o) => o.id === key);
                if (obj) {
                   alert(
                    "Edit details for: \n" +
                    `Person Name: ${obj.personName}\n` +
                    `Passport Number: ${obj.passportNumber}`
                    // Add other fields as needed for edit confirmation
                  );
                }
              }}
              color="warning"
              size="sm"
              className={classNames("btn-icon btn-link", {
                "btn-neutral": key < 3,
              })}
              title="Edit"
            >
              <i className="tim-icons icon-pencil" />
            </Button>{" "}
            <Button
              onClick={() => {
                // Confirm before deleting
                // In a real app, use a modal for confirmation instead of window.confirm
                if (window.confirm("Are you sure you want to delete this request?")) {
                    setData(currentData => currentData.filter(item => item.id !== key));
                }
              }}
              color="danger"
              size="sm"
              className={classNames("btn-icon btn-link", {
                "btn-neutral": key < 3,
              })}
              title="Remove"
            >
              <i className="tim-icons icon-simple-remove" />
            </Button>{" "}
          </div>
        ),
      };
    })
  );

  return (
    <>
      <div className="content">
        <Row className="mt-5">
          <Col xs={12} md={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Visa Request List</CardTitle> {/* Updated Card Title */}
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={data}
                  filterable
                  resizable={false}
                  columns={[
                    {
                      Header: "Person Name",
                      accessor: "personName",
                    },
                    {
                      Header: "Passport Number",
                      accessor: "passportNumber",
                    },
                    {
                      Header: "Passport expiration date",
                      accessor: "passportExpirationDate",
                    },
                    {
                      Header: "Kind of visa request",
                      accessor: "kindOfVisaRequest",
                    },
                    {
                      Header: "Request funnel",
                      accessor: "requestFunnel",
                    },
                    {
                      Header: "State",
                      accessor: "stateDisplay", // Use the custom renderer for badges
                      // If you need to filter/sort by the actual state string:
                      // filterMethod: (filter, row) => row.state.startsWith(filter.value),
                      // sortMethod: (a, b) => { if (a.state < b.state) return -1; if (a.state > b.state) return 1; return 0; }
                    },
                    {
                      Header: "Actions",
                      accessor: "actions",
                      sortable: false,
                      filterable: false,
                      width: 100 // Adjust width for actions column if needed
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

export default VisaRequestListTable;
