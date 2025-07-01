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

// Reusable Edit Modal Component
const EditModal = ({ isOpen, onClose, title, fields, data, onSave }) => {
  const [formData, setFormData] = React.useState(data || {});

  React.useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleInputChange = (fieldKey, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldKey]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-xl"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 flex-1">{field.placeholder}</span>
                <input
                  type={field.type || 'text'}
                  value={formData[field.key] || ''}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  className="ml-4 p-2 border border-gray-300 rounded-md text-sm w-48"
                  placeholder={field.placeholder}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// Updated dataTable with new structure and example flight data
const dataTable = [
  [
    "Airi Satou",
    "Tokyo (NRT)",
    "New York (JFK)",
    "Japan Airlines",
    "2025-10-15",
    "JL006",
  ],
  [
    "Angelica Ramos",
    "London (LHR)",
    "Singapore (SIN)",
    "Singapore Airlines",
    "2025-11-01",
    "SQ321",
  ],
  [
    "Ashton Cox",
    "San Francisco (SFO)",
    "London (LHR)",
    "British Airways",
    "2025-12-05",
    "BA286",
  ],
  [
    "Bradley Greer",
    "London (LGW)",
    "Los Angeles (LAX)",
    "Virgin Atlantic",
    "2025-09-20",
    "VS007",
  ],
  [
    "Brenden Wagner",
    "San Francisco (SFO)",
    "Sydney (SYD)",
    "Qantas",
    "2026-01-10",
    "QF74",
  ],
  [
    "Brielle Williamson",
    "New York (JFK)",
    "Paris (CDG)",
    "Air France",
    "2025-11-22",
    "AF015",
  ],
  [
    "Caesar Vance",
    "New York (EWR)",
    "Rome (FCO)",
    "United Airlines",
    "2025-10-30",
    "UA040",
  ],
  [
    "Cedric Kelly",
    "Edinburgh (EDI)",
    "Dubai (DXB)",
    "Emirates",
    "2026-02-18",
    "EK024",
  ],
  [
    "Charde Marshall",
    "San Francisco (SFO)",
    "Hong Kong (HKG)",
    "Cathay Pacific",
    "2025-12-12",
    "CX879",
  ],
  [
    "Colleen Hurst",
    "Los Angeles (LAX)",
    "Tokyo (HND)",
    "All Nippon Airways",
    "2026-03-01",
    "NH105",
  ],
];

const ReservationTable = () => {
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState(null);

  // Modal field configuration for ticket details
  const ticketFields = [
    { key: 'name', label: 'Name', placeholder: 'Name of the person who have reserved' },
    { key: 'from', label: 'From', placeholder: 'From City - (Airport)' },
    { key: 'destination', label: 'Destination', placeholder: 'Destination - (Airport)' },
    { key: 'airline', label: 'Airline', placeholder: 'Airline Name' },
    { key: 'date', label: 'Flight Date', placeholder: '2025/08/11', type: 'date' },
    { key: 'fair', label: 'Fair', placeholder: 'Flight Class' },
    { key: 'airplane', label: 'Airplane', placeholder: 'Airplane Type' },
    { key: 'flightDuration', label: 'Flight duration', placeholder: 'Flight duration' },
    { key: 'reservationNumber', label: 'Flight Number', placeholder: 'Flight Number' },
    { key: 'state', label: 'State', placeholder: 'Upcoming' }
  ];

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
        // Add additional fields for the modal
        fair: key % 3 === 0 ? 'Business' : key % 2 === 0 ? 'Economy' : 'Premium Economy',
        airplane: key % 2 === 0 ? 'Boeing 777' : 'Airbus A350',
        flightDuration: `${Math.floor(Math.random() * 5) + 10}h ${Math.floor(Math.random() * 60)}m`,
        state: 'Upcoming',
        actions: (
          <div className="actions-right">
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
              className="btn-icon btn-link like"
              title="View" 
              style={{ color: 'white' }}
            >
              <i className="tim-icons icon-zoom-split" />{" "}
            </Button>{" "}
            <Button
              onClick={() => {
                let obj = data.find((o) => o.id === key);
                setEditingItem(obj);
                setEditModalOpen(true);
              }}
              color="warning"
              size="sm"
              className="btn-icon btn-link edit"
              title="Edit"
              style={{ color: 'white' }}
            >
              <i className="tim-icons icon-pencil" />
            </Button>{" "}
            {/* Remove button */}
            <Button
              onClick={() => {
                setData((currentData) =>
                  currentData.filter((item) => item.id !== key)
                );
              }}
              color="danger"
              size="sm"
              className="btn-icon btn-link remove"
              title="Remove"
              style={{ color: 'white' }}
            >
              <i className="tim-icons icon-simple-remove" />
            </Button>{" "}
          </div>
        ),
      };
    })
  );

  const handleSave = (updatedData) => {
    setData(prev => prev.map(item => 
      item.id === editingItem.id ? { ...item, ...updatedData } : item
    ));
    setEditingItem(null);
  };

  return (
    <>
      <div className="content">
        <Row className="mt-5">
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
                    // Updated column definitions
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

      {/* Edit Modal */}
      <EditModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditingItem(null);
        }}
        title="Ticket details"
        fields={ticketFields}
        data={editingItem}
        onSave={handleSave}
      />

      {/* CSS to ensure all text is white */}
      <style jsx>{`
        .ReactTable .rt-tbody .rt-tr .rt-td,
        .ReactTable .rt-thead .rt-th,
        .ReactTable .rt-tbody .rt-tr,
        .ReactTable .rt-thead .rt-tr {
          color: white !important;
        }
        
        .ReactTable .rt-tbody .rt-tr:hover .rt-td {
          color: white !important;
        }
        
        .ReactTable input {
          color: white !important;
          background-color: transparent !important;
        }
        
        .ReactTable input::placeholder {
          color: rgba(255, 255, 255, 0.6) !important;
        }
        
        .btn-icon i {
          color: white !important;
        }
        
        .btn-link {
          color: white !important;
        }
        
        .btn-link:hover {
          color: white !important;
        }
      `}</style>
    </>
  );
};

export default ReservationTable;