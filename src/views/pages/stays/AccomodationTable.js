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
import ViewModal from "components/viewModal/ViewModal";
import EditModalAccomodation from "components/editModal/EditModalAccomodation";
import ViewModalAccomodation from "components/viewModal/ViewAccomodationModal";

// **1. DATA UPDATED:** New example data for visa requests
const dataTable = [
  ["Airi Satou", "P12345678", "2030-05-15", "Tourism", "Flight - direct - stay", "In progress"],
  ["Angelica Ramos", "P87654321", "2028-11-20", "Business", "Flight - direct - stay", "Completed"],
  ["Ashton Cox", "P55566677", "2029-01-10", "Tourism", "Flight - direct - stay", "In progress"],
  ["Bradley Greer", "P11122233", "2027-08-01", "Student", "Flight - direct - stay", "Rejected"],
  ["Brenden Wagner", "P44455566", "2031-03-25", "Tourism", "Flight - direct - stay", "In progress"],
  ["Brielle Williamson", "P77788899", "2026-12-01", "Business", "Flight - direct - stay", "In progress"],
  ["Caesar Vance", "P33322211", "2029-07-18", "Tourism", "Flight - direct - stay", "Completed"],
  ["Cedric Kelly", "P99988877", "2030-02-14", "Student", "Flight - direct - stay", "In progress"],
  ["Charde Marshall", "P66677788", "2028-06-30", "Tourism", "Flight - direct - stay", "In progress"],
  ["Colleen Hurst", "P22233344", "2027-10-05", "Business", "Flight - direct - stay", "Completed"],
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

  // **2. FIELDS UPDATED:** New modal field configuration
  const visaRequestFields = [
    { key: 'personName', label: 'Person name' },
    { key: 'passportNumber', label: 'Passport Number' },
    { key: 'passportExpiration', label: 'Passport expiration date', type: 'date' },
    { key: 'visaType', label: 'Kind of visa request' },
    { key: 'requestFunnel', label: 'Request funnel' },
    { key: 'state', label: 'State' }
  ];
  
  // **3. DATA MAPPING UPDATED:** Format initial data based on the new structure
  React.useEffect(() => {
    const formattedData = dataTable.map((prop, key) => ({
      id: key,
      personName: prop[0],
      passportNumber: prop[1],
      passportExpiration: prop[2],
      visaType: prop[3],
      requestFunnel: prop[4],
      state: prop[5],
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
                    { Header: "Person name", accessor: "personName" },
                    { Header: "Passport Number", accessor: "passportNumber" },
                    { Header: "Passport expiration date", accessor: "passportExpiration" },
                    { Header: "Kind of visa request", accessor: "visaType" },
                    { Header: "Request funnel", accessor: "requestFunnel" },
                    { Header: "State", accessor: "state" },
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
        title="Edit Visa Request"
        fields={visaRequestFields}
        data={draftItem}
        onSave={handleSave}
        onInputChange={handleModalInputChange}
      />
      
      <ViewModalAccomodation
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title="View Visa Request"
        fields={visaRequestFields}
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
