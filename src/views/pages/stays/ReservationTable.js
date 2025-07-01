import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";

import ReactTable from "components/ReactTable/ReactTable.js";
import EditModal from "components/editModal/EditModal";
import ViewModal from "components/viewModal/ViewModal";

// Example flight data
const dataTable = [
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
  const [data, setData] = React.useState([]);
  const [alert, setAlert] = React.useState(null);
  
  // State for Edit Modal
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [originalItem, setOriginalItem] = React.useState(null);
  const [draftItem, setDraftItem] = React.useState(null);

  // State for View Modal
  const [viewModalOpen, setViewModalOpen] = React.useState(false);
  const [viewingItem, setViewingItem] = React.useState(null);

  // Modal field configuration (used by both modals)
  const ticketFields = [
    { key: 'name', label: 'Name' },
    { key: 'from', label: 'From' },
    { key: 'destination', label: 'Destination' },
    { key: 'airline', label: 'Airline' },
    { key: 'date', label: 'Flight Date' },
    { key: 'fair', label: 'Fair' },
    { key: 'airplane', label: 'Airplane' },
    { key: 'flightDuration', label: 'Flight duration' },
    { key: 'reservationNumber', label: 'Flight Number' },
    { key: 'state', label: 'State' }
  ];
  
  // Format initial data
  React.useEffect(() => {
    const formattedData = dataTable.map((prop, key) => ({
      id: key,
      name: prop[0], from: prop[1], destination: prop[2], airline: prop[3], date: prop[4], reservationNumber: prop[5],
      fair: key % 3 === 0 ? 'Business' : 'Economy',
      airplane: key % 2 === 0 ? 'Boeing 777' : 'Airbus A350',
      flightDuration: `${Math.floor(Math.random() * 5) + 10}h ${Math.floor(Math.random() * 60)}m`,
      state: 'Upcoming',
    }));
    setData(formattedData);
  }, []);

  const handleEditClick = (row) => {
    setOriginalItem(row);
    setDraftItem({ ...row });
    setEditModalOpen(true);
  };

  const handleModalInputChange = (fieldKey, value) => {
    setDraftItem(prev => ({ ...prev, [fieldKey]: value }));
  };

  const handleSave = () => {
    setData(prev => prev.map(item => item.id === originalItem.id ? draftItem : item));
    setEditModalOpen(false);
  };

  const handleRemoveClick = (id) => {
    setAlert(
      <SweetAlert
        warning style={{ display: "block", marginTop: "-100px" }} title="Are you sure?"
        onConfirm={() => { setData(currentData => currentData.filter(item => item.id !== id)); setAlert(null); }}
        onCancel={() => setAlert(null)}
        confirmBtnBsStyle="danger" cancelBtnBsStyle="secondary" confirmBtnText="Yes, delete it!" cancelBtnText="Cancel" showCancel
      >
        You will not be able to recover this reservation!
      </SweetAlert>
    );
  };
  
  // **THE FIX IS HERE:** This function now correctly opens the View Modal.
  // The previous version incorrectly used alert(), causing the error.
  const handleViewClick = (row) => {
    setViewingItem(row);
    setViewModalOpen(true);
  };

  return (
    <>
      {alert}
      <div className="content">
        <Row className="mt-5">
          <Col xs={12} md={12}>
            <Card>
              <CardHeader><CardTitle tag="h4">React Table</CardTitle></CardHeader>
              <CardBody>
                <ReactTable
                  data={data.map(item => ({
                    ...item,
                    actions: (
                      <div className="actions-right">
                        <Button onClick={() => handleViewClick(item)} color="info" size="sm" className="btn-icon btn-link like" title="View"><i className="tim-icons icon-zoom-split" /></Button>{" "}
                        <Button onClick={() => handleEditClick(item)} color="warning" size="sm" className="btn-icon btn-link edit" title="Edit"><i className="tim-icons icon-pencil" /></Button>{" "}
                        <Button onClick={() => handleRemoveClick(item.id)} color="danger" size="sm" className="btn-icon btn-link remove" title="Remove"><i className="tim-icons icon-simple-remove" /></Button>
                      </div>
                    )
                  }))}
                  filterable resizable={false}
                  columns={[
                    { Header: "NAME", accessor: "name" }, { Header: "From", accessor: "from" },
                    { Header: "Destination", accessor: "destination" }, { Header: "Airline", accessor: "airline" },
                    { Header: "Date", accessor: "date" }, { Header: "Reservation number", accessor: "reservationNumber" },
                    { Header: "Actions", accessor: "actions", sortable: false, filterable: false },
                  ]}
                  defaultPageSize={10} showPaginationTop showPaginationBottom={false} className="-striped -highlight"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      <EditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Ticket Details"
        fields={ticketFields}
        data={draftItem}
        onSave={handleSave}
        onInputChange={handleModalInputChange}
      />
      
      {/* Render the new ViewModal */}
      <ViewModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title="Ticket Details"
        fields={ticketFields}
        data={viewingItem}
      />

      <style>{`
        .ReactTable .actions-right .btn-icon i {
          color: white !important;
        }
      `}</style>
    </>
  );
};

export default ReservationTable;
