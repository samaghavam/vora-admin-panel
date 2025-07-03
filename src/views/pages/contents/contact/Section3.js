// src/views/your-path/Section3.js

import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import MapModal from "views/components/ModalMap";

const Section3 = forwardRef((props, ref) => {
  // State for form fields
  const [titleH1, setTitleH1] = useState("");
  const [titleH1Smaller, setTitleH1Smaller] = useState("");
  const [subtextH2, setSubtextH2] = useState("");
  const [location, setLocation] = useState(""); // This will hold the selected country name

  // State for validation
  const [titleH1State, setTitleH1State] = useState("");
  const [titleH1SmallerState, setTitleH1SmallerState] = useState("");
  const [subtextH2State, setSubtextH2State] = useState("");
  const [locationState, setLocationState] = useState(""); // Validation for the location

  // State to manage the map modal visibility
  const [isMapModalOpen, setMapModalOpen] = useState(false);

  // Expose methods to the parent component (Contact.js)
  useImperativeHandle(ref, () => ({
    validate: () => validateFields(),
    getData: () => ({
      titleH1,
      titleH1Smaller,
      subtextH2,
      location,
    }),
  }));

  // Helper function for validation
  const verifyLength = (value) => {
    return typeof value === 'string' && value.trim().length > 0;
  };

  // Validation logic for all fields in this section
  const validateFields = () => {
    let isValid = true;
    if (!verifyLength(titleH1)) { setTitleH1State("has-danger"); isValid = false; } else { setTitleH1State("has-success"); }
    if (!verifyLength(titleH1Smaller)) { setTitleH1SmallerState("has-danger"); isValid = false; } else { setTitleH1SmallerState("has-success"); }
    if (!verifyLength(subtextH2)) { setSubtextH2State("has-danger"); isValid = false; } else { setSubtextH2State("has-success"); }
    
    // Validate the location state directly
    if (!verifyLength(location)) {
      setLocationState("has-danger");
      isValid = false;
    } else {
      setLocationState("has-success");
    }
    
    return isValid;
  };

  // Handler for text input changes
  const handleInputChange = (setter, stateSetter, value) => {
    setter(value);
    // Clear validation state on change
    stateSetter("");
  };

  // Opens the map modal
  const openMapModal = () => {
    setMapModalOpen(true);
  };

  // Callback for when a location is selected in the modal
  const handleLocationSelect = (selectedLocation) => {
    if (selectedLocation) {
      setLocation(selectedLocation);
      setLocationState("has-success"); // Mark as valid
    }
    setMapModalOpen(false); // Close modal after selection
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Section 3 - Location</CardTitle>
        </CardHeader>
        <CardBody>
          {/* --- Text Inputs --- */}
          <Row>
            <Col md="6">
              <FormGroup className={`has-label ${titleH1State}`}>
                <Label>Title H1</Label>
                <Input type="text" value={titleH1} onChange={(e) => handleInputChange(setTitleH1, setTitleH1State, e.target.value)} />
                {titleH1State === "has-danger" && <Label className="error">This field is required.</Label>}
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup className={`has-label ${titleH1SmallerState}`}>
                <Label>Title H1 - smaller</Label>
                <Input type="text" value={titleH1Smaller} onChange={(e) => handleInputChange(setTitleH1Smaller, setTitleH1SmallerState, e.target.value)} />
                {titleH1SmallerState === "has-danger" && <Label className="error">This field is required.</Label>}
              </FormGroup>
            </Col>
          </Row>
          <FormGroup className={`has-label ${subtextH2State}`}>
            <Label>Subtext H2</Label>
            <Input type="text" value={subtextH2} onChange={(e) => handleInputChange(setSubtextH2, setSubtextH2State, e.target.value)} />
            {subtextH2State === "has-danger" && <Label className="error">This field is required.</Label>}
          </FormGroup>
          <hr/>

          {/* --- Location Selector --- */}
          <FormGroup className={locationState}>
            <Label>Select the location on map</Label>
            <div className="d-flex align-items-center mt-2">
              <Button 
                color="primary" 
                type="button" // This is crucial to prevent form submission
                onClick={openMapModal}
                style={{
                    background: 'linear-gradient(45deg, #f87bbe, #c466d1)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 20px',
                   
                }}
              >
                Choose on map
              </Button>
              
              {/* Conditionally render the selected location */}
              {location && (
                <div className="ml-4 d-flex align-items-center">
                   <i className="tim-icons icon-check-2 text-success" style={{fontSize: '20px'}}/>
                  <span className="text-white ml-2" style={{fontSize: '16px'}}>
                    Selected: <strong>{location}</strong>
                  </span>
                </div>
              )}
            </div>
            {/* Display validation error if no location is selected */}
            {locationState === "has-danger" && (
                <Label className="error mt-2">Please select a location from the map.</Label>
            )}
          </FormGroup>
        </CardBody>
      </Card>
      
      {/* The Map Modal, controlled by state */}
      <MapModal
        isOpen={isMapModalOpen}
        onClose={() => setMapModalOpen(false)}
        onLocationSelect={handleLocationSelect}
      />
    </>
  );
});

export default Section3;
