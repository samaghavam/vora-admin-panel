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
import ViewModalAccomodation from "components/viewModal/ViewAccomodationModal";
import EditModalAccomodation from "components/editModal/EditModalAccomodation";

// **1. DATA UPDATED:** New example data for accommodation management
const dataTable = [
  ["Hyatt Regency", "Dubai, UAE", "Has Rooms", "Added by API", 50, 120],
  ["Marriott Marquis", "New York, USA", "Has Rooms", "Added by API", 100, 250],
  ["The Shangri-La", "Paris, France", "No Rooms", "Manual", 0, 50],
  ["Hilton Garden Inn", "London, UK", "Has Rooms", "Added by API", 75, 150],
  ["Four Seasons", "Tokyo, Japan", "Has Rooms", "Added by API", 60, 180],
  ["The Peninsula", "Hong Kong", "No Rooms", "Manual", 0, 70],
  ["Raffles Hotel", "Singapore", "Has Rooms", "Added by API", 80, 200],
  ["Burj Al Arab", "Dubai, UAE", "Has Rooms", "Added by API", 120, 300],
  ["The Plaza", "New York, USA", "Has Rooms", "Manual", 40, 100],
  ["Claridge's", "London, UK", "Has Rooms", "Added by API", 90, 220],
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

  // **2. FIELDS UPDATED:** New modal field configuration for accommodation
  const accommodationFields = [
    { key: 'accommodationName', label: 'Accommodation name' },
    { key: 'location', label: 'Location' },
    { key: 'state', label: 'State' },
    { key: 'kind', label: 'Kind' },
    { key: 'numberOfRooms', label: 'Number of rooms', type: 'number' },
    { key: 'numberOfReserves', label: 'Number of reserves', type: 'number' },
  ];
  
  // **3. DATA MAPPING UPDATED:** Format initial data based on the new structure
  React.useEffect(() => {
    const formattedData = dataTable.map((prop, key) => ({
      id: key,
      accommodationName: prop[0],
      location: prop[1],
      state: prop[2],
      kind: prop[3],
      numberOfRooms: prop[4],
      numberOfReserves: prop[5],
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
        You will not be able to recover this item!
      </SweetAlert>
    );
  };
  
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
                  // **4. COLUMNS UPDATED:** New column definitions for the table
                  columns={[
                    { Header: "Accommodation name", accessor: "accommodationName" },
                    { Header: "Location", accessor: "location" },
                    { Header: "State", accessor: "state" },
                    { Header: "Kind", accessor: "kind" },
                    { Header: "Number of rooms", accessor: "numberOfRooms" },
                    { Header: "Number of reserves", accessor: "numberOfReserves" },
                    { Header: "Actions", accessor: "actions", sortable: false, filterable: false },
                  ]}
                  defaultPageSize={10} showPaginationTop showPaginationBottom={false} className="-striped -highlight"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      <EditModalAccomodation
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Accommodation"
        fields={accommodationFields}
        data={draftItem}
        onSave={handleSave}
        onInputChange={handleModalInputChange}
      />
      
      <ViewModalAccomodation
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title="View Accommodation"
        fields={accommodationFields}
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
