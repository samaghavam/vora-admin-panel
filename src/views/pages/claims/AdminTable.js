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
import EditModalClains from "components/editModal/EditModalClains";
import ViewModalClains from "components/viewModal/ViewModalClains";

// Example data for admin management
const dataTable = [
  ["Airi Satou", "2024-07-03", "Active", "Super Admin", "All", "+1-202-555-0104"],
  ["Angelica Ramos", "2024-07-02", "Inactive", "Content Manager", "Edit Content", "+44-20-7946-0958"],
  ["Ashton Cox", "2024-07-01", "Active", "Support Staff", "View Tickets", "+1-415-555-0132"],
  ["Bradley Greer", "2024-06-30", "Active", "Administrator", "Manage Users", "+44-20-7946-0123"],
  ["Brenden Wagner", "2024-06-29", "Inactive", "Content Manager", "Edit Content", "+61-2-9999-8888"],
  ["Colleen Hurst", "2024-06-24", "Active", "Super Admin", "All", "+81-3-6739-7888"],
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
  
  // Format initial data, now including a claims object
  React.useEffect(() => {
    const formattedData = dataTable.map((prop, key) => ({
      id: key,
      adminName: prop[0],
      creationDate: prop[1],
      stateAdmin: prop[2],
      role: prop[3],
      claimsText: prop[4], // The text to display in the table
      phoneNumber: prop[5],
      // Add extra fields for the modals
      userName: prop[0].split(' ')[0].toLowerCase(),
      userPhoneNumber: prop[5],
      userMail: `${prop[0].split(' ')[0].toLowerCase()}@example.com`,
      // Add a claims object for the checkboxes in the modals
      claims: {
        claim1: key % 2 === 0,
        claim2: key % 3 === 0,
        claim3: false,
        claim4: true,
        claim5: key % 2 !== 0,
        claim6: false,
        claim7: true,
        claim8: key % 3 === 0,
        claim9: false,
        claim10: true,
      }
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
                  columns={[
                    { Header: "Admin name", accessor: "adminName" },
                    { Header: "Creation date", accessor: "creationDate" },
                    { Header: "State admin", accessor: "stateAdmin" },
                    { Header: "Role", accessor: "role" },
                    // **THE FIX IS HERE:** The accessor now points to the safe `claimsText` property.
                    { Header: "Claims", accessor: "claimsText" },
                    { Header: "Phone number", accessor: "phoneNumber" },
                    { Header: "Actions", accessor: "actions", sortable: false, filterable: false },
                  ]}
                  defaultPageSize={10} showPaginationTop showPaginationBottom={false} className="-striped -highlight"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      <EditModalClains
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Admin User"
        data={draftItem}
        onSave={handleSave}
        onInputChange={handleModalInputChange}
      />
      
      <ViewModalClains
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title="Admin User Details"
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
