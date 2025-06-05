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
  // Assuming UncontrolledAlert is available if you want to replace alert()
  // For now, sticking with alert() as per original code.
} from "reactstrap";

// Assuming ReactTable is correctly imported from your project structure
import ReactTable from "components/ReactTable/ReactTable.js";

// New dataTable with accommodation reservation structure and example data
const accommodationDataTable = [
  ["Airi Satou", "Grand Hyatt Tokyo", "2025-11-01", "2025-11-05", 2, "ACC001"],
  ["Angelica Ramos", "The Ritz London", "2025-12-10", "2025-12-15", 1, "ACC002"],
  ["Ashton Cox", "Fairmont San Francisco", "2026-01-20", "2026-01-25", 3, "ACC003"],
  ["Bradley Greer", "The Beverly Hills Hotel", "2025-10-05", "2025-10-10", 1, "ACC004"],
  ["Brenden Wagner", "Park Hyatt Sydney", "2026-02-15", "2026-02-20", 2, "ACC005"],
  ["Brielle Williamson", "Le Bristol Paris", "2025-11-25", "2025-11-30", 1, "ACC006"],
  ["Caesar Vance", "Hotel de Russie, Rome", "2025-09-10", "2025-09-15", 2, "ACC007"],
  ["Cedric Kelly", "Burj Al Arab Jumeirah", "2026-03-01", "2026-03-07", 1, "ACC008"],
  ["Charde Marshall", "The Peninsula Hong Kong", "2025-12-20", "2025-12-27", 2, "ACC009"],
  ["Colleen Hurst", "Aman Tokyo", "2026-04-05", "2026-04-12", 1, "ACC010"],
];

const ReservationTable = () => {
  const [data, setData] = React.useState(
    accommodationDataTable.map((prop, key) => {
      return {
        id: key,
        name: prop[0],
        accommodationName: prop[1],
        checkInDate: prop[2],
        checkOutDate: prop[3],
        reservedRooms: prop[4],
        reservationNumber: prop[5],
        actions: (
          <div className="actions-right">
            {/* View button */}
            <Button
              onClick={() => {
                let obj = data.find((o) => o.id === key);
                // Replace alert with a modal or better UI element in a real app
                alert(
                  "You've clicked VIEW button on \n{ \nName: " +
                  obj.name +
                  ", \nAccommodation: " +
                  obj.accommodationName +
                  ", \nCheck-in: " +
                  obj.checkInDate +
                  ", \nCheck-out: " +
                  obj.checkOutDate +
                  ", \nRooms: " +
                  obj.reservedRooms +
                  ", \nReservation No: " +
                  obj.reservationNumber +
                  "\n}."
                );
              }}
              color="info"
              size="sm"
              className={classNames("btn-icon btn-link like", {
                "btn-neutral": key < 5, // Example conditional styling
              })}
              title="View"
            >
              <i className="tim-icons icon-zoom-split" />
            </Button>{" "}
            {/* Edit button */}
            <Button
              onClick={() => {
                let obj = data.find((o) => o.id === key);
                alert(
                  "You've clicked EDIT button on \n{ \nName: " +
                  obj.name +
                  ", \nAccommodation: " +
                  obj.accommodationName +
                  ", \nCheck-in: " +
                  obj.checkInDate +
                  ", \nCheck-out: " +
                  obj.checkOutDate +
                  ", \nRooms: " +
                  obj.reservedRooms +
                  ", \nReservation No: " +
                  obj.reservationNumber +
                  "\n}."
                );
              }}
              color="warning"
              size="sm"
              className={classNames("btn-icon btn-link edit", {
                "btn-neutral": key < 5,
              })}
              title="Edit"
            >
              <i className="tim-icons icon-pencil" />
            </Button>{" "}
            {/* Remove button */}
            <Button
              onClick={() => {
                // Simple confirmation, replace with a modal in real app
                if (window.confirm("Are you sure you want to delete this reservation?")) {
                    setData(currentData => currentData.filter(item => item.id !== key));
                }
              }}
              color="danger"
              size="sm"
              className={classNames("btn-icon btn-link remove", {
                "btn-neutral": key < 5,
              })}
              title="Remove"
            >
              <i className="tim-icons icon-simple-remove" />
            </Button>
          </div>
        ),
      };
    })
  );

  return (
    <>
      <div className="content">
        <Row className="mt-5"> {/* mt-5 for spacing, adjust as needed */}
          <Col xs={12} md={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Accommodation Reservations</CardTitle> {/* Updated Card Title */}
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={data}
                  filterable
                  resizable={false}
                  columns={[
                    {
                      Header: "NAME",
                      accessor: "name",
                    },
                    {
                      Header: "ACCOMMODATION NAME", // Matched from image
                      accessor: "accommodationName",
                    },
                    {
                      Header: "CHECK IN DATE", // Matched from image
                      accessor: "checkInDate",
                    },
                    {
                      Header: "CHECK OUT DATE", // Matched from image
                      accessor: "checkOutDate",
                    },
                    {
                      Header: "RESERVED ROOMS", // Matched from image
                      accessor: "reservedRooms",
                      // Optional: customize cell rendering for numbers
                      // Cell: ({ value }) => <div style={{ textAlign: "center" }}>{value}</div> 
                    },
                    {
                      Header: "RESERVATION NUMBER", // Matched from image
                      accessor: "reservationNumber",
                    },
                    {
                      Header: "ACTIONS", // Matched from image
                      accessor: "actions",
                      sortable: false,
                      filterable: false,
                      // width: 120 // Optional: fixed width for actions column
                    },
                  ]}
                  defaultPageSize={10}
                  showPaginationTop
                  showPaginationBottom={false}
                  className="-striped -highlight" // Default react-table classes
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
