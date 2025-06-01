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

import ReactTable from "components/ReactTable/ReactTable.js";

// Updated dataTable with new structure and example flight data
const dataTable = [
  ["Airi Satou", "Tokyo (NRT)", "New York (JFK)", "Japan Airlines", "2025-10-15", "JL006"],
  ["Angelica Ramos", "London (LHR)", "Singapore (SIN)", "Singapore Airlines", "2025-11-01", "SQ321"],
  ["Ashton Cox", "San Francisco (SFO)", "London (LHR)", "British Airways", "2025-12-05", "BA286"],
  ["Bradley Greer", "London (LGW)", "Los Angeles (LAX)", "Virgin Atlantic", "2025-09-20", "VS007"],
  ["Brenden Wagner", "San Francisco (SFO)", "Sydney (SYD)", "Qantas", "2026-01-10", "QF74"],
  ["Brielle Williamson", "New York (JFK)", "Paris (CDG)", "Air France", "2025-11-22", "AF015"],
  ["Caesar Vance", "New York (EWR)", "Rome (FCO)", "United Airlines", "2025-10-30", "UA040"],
  ["Cedric Kelly", "Edinburgh (EDI)", "Dubai (DXB)", "Emirates", "2026-02-18", "EK024"],
  ["Charde Marshall", "San Francisco (SFO)", "Hong Kong (HKG)", "Cathay Pacific", "2025-12-12", "CX879"],
  ["Colleen Hurst", "Los Angeles (LAX)", "Tokyo (HND)", "All Nippon Airways", "2026-03-01", "NH105"],
  // You can add more data rows here following the same structure
];

const ReservationTable = () => {
  const [data, setData] = React.useState(
    dataTable.map((prop, key) => {
      return {
        id: key,
        name: prop[0],
        from: prop[1],
        destination: prop[2],
        airline: prop[3],
        date: prop[4],
        reservationNumber: prop[5],
        actions: (
          <div className="actions-right">
            {/* View button (changed from Like button) */}
            <Button
              onClick={() => {
                let obj = data.find((o) => o.id === key);
                alert(
                  "You've clicked VIEW button on \n{ \nName: " +
                  obj.name +
                  ", \nFrom: " +
                  obj.from +
                  ", \nDestination: " +
                  obj.destination +
                  ", \nAirline: " +
                  obj.airline +
                  ", \nDate: " +
                  obj.date +
                  ", \nReservation Number: " +
                  obj.reservationNumber +
                  "\n}."
                );
              }}
              color="info"
              size="sm"
              className={classNames("btn-icon btn-link like", { // 'like' class kept for consistency if needed
                "btn-neutral": key < 5,
              })}
              title="View" // Added title for accessibility
            >
              <i className="tim-icons icon-zoom-split" /> {/* Changed icon for View */}
            </Button>{" "}
            {/* Edit button */}
            <Button
              onClick={() => {
                let obj = data.find((o) => o.id === key);
                alert(
                  "You've clicked EDIT button on \n{ \nName: " +
                  obj.name +
                  ", \nFrom: " +
                  obj.from +
                  ", \nDestination: " +
                  obj.destination +
                  ", \nAirline: " +
                  obj.airline +
                  ", \nDate: " +
                  obj.date +
                  ", \nReservation Number: " +
                  obj.reservationNumber +
                  "\n}."
                );
              }}
              color="warning"
              size="sm"
              className={classNames("btn-icon btn-link edit", { // 'edit' class instead of 'like'
                "btn-neutral": key < 5,
              })}
              title="Edit" // Added title for accessibility
            >
              <i className="tim-icons icon-pencil" />
            </Button>{" "}
            {/* Remove button */}
            <Button
              onClick={() => {
                setData(currentData => currentData.filter(item => item.id !== key));
              }}
              color="danger"
              size="sm"
              className={classNames("btn-icon btn-link remove", { // 'remove' class instead of 'like'
                "btn-neutral": key < 5,
              })}
              title="Remove" // Added title for accessibility
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
                {/* Card title can be adjusted as per the image, e.g. "React Table" or something more specific */}
                <CardTitle tag="h4">React Table</CardTitle>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={data}
                  filterable
                  resizable={false}
                  columns={[ // Updated column definitions
                    {
                      Header: "NAME", // Matched from image
                      accessor: "name",
                    },
                    {
                      Header: "From", // Matched from image
                      accessor: "from",
                    },
                    {
                      Header: "Destination", // Matched from image
                      accessor: "destination",
                    },
                    {
                      Header: "Airline", // Matched from image
                      accessor: "airline",
                    },
                    {
                      Header: "Date", // Matched from image
                      accessor: "date",
                    },
                    {
                      Header: "Reservation number", // Matched from image
                      accessor: "reservationNumber",
                    },
                    {
                      Header: "Actions", // Matched from image
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

export default ReservationTable;