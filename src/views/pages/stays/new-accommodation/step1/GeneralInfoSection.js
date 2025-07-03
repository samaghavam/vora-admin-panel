import React, { useState, forwardRef, useImperativeHandle } from "react";
import classnames from "classnames";
import {
  Input,
  Row,
  Col,
  FormGroup,
  Label,
  Button,
  CustomInput,
} from "reactstrap";
import MapModal from "views/components/ModalMap"; // Assuming path is correct

const GeneralInfoSection = forwardRef((props, ref) => {
  const [isMapModalOpen, setMapModalOpen] = React.useState(false);

  // --- Internal State for Data ---
  const [data, setData] = useState({
    accommodationName: "",
    accommodationType: "Accommodation",
    stars: "",
    location: "",
    address: "",
    description: "",
  });

  // --- Internal State for Validation ---
  const [states, setStates] = useState({
    accommodationNameState: "",
    starsState: "",
    locationState: "",
    addressState: "",
    descriptionState: "",
  });

  // --- Validation Logic ---
  const verifyLength = (value) => value && value.trim().length > 0;

  const validateFields = () => {
    let isValid = true;
    const newStates = {};

    if (!verifyLength(data.accommodationName)) { newStates.accommodationNameState = "has-danger"; isValid = false; } else { newStates.accommodationNameState = "has-success"; }
    if (!verifyLength(data.stars)) { newStates.starsState = "has-danger"; isValid = false; } else { newStates.starsState = "has-success"; }
    if (!verifyLength(data.location)) { newStates.locationState = "has-danger"; isValid = false; } else { newStates.locationState = "has-success"; }
    if (!verifyLength(data.address)) { newStates.addressState = "has-danger"; isValid = false; } else { newStates.addressState = "has-success"; }
    if (!verifyLength(data.description)) { newStates.descriptionState = "has-danger"; isValid = false; } else { newStates.descriptionState = "has-success"; }
    
    setStates(newStates);
    return isValid;
  };

  // --- Expose methods to parent component ---
  useImperativeHandle(ref, () => ({
    validate: () => validateFields(),
    getData: () => data,
  }));

  // --- Change Handlers ---
  const handleInputChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
    // Clear validation state on change
    if (states[`${field}State`] === "has-danger") {
      setStates(prev => ({ ...prev, [`${field}State`]: "" }));
    }
  };

  const handleLocationSelect = (locationName) => {
    handleInputChange("location", locationName);
  };

  return (
    <>
      <h5 className="text-uppercase text-muted mt-4 mb-3 font-weight-bold">General info</h5>
      
      <Row className="mb-3">
        <Col md="6">
          <FormGroup className={`mb-0 ${classnames(states.accommodationNameState)}`}>
            <Row className="align-items-center">
              <Col sm={5} className="text-nowrap pr-0">
                <Label for="accommodationName">Accommodation/Hotel name</Label>
              </Col>
              <Col sm={7}>
                <Input
                  type="text"
                  value={data.accommodationName}
                  onChange={(e) => handleInputChange("accommodationName", e.target.value)}
                />
              </Col>
            </Row>
            {states.accommodationNameState === "has-danger" && (<small className="text-danger d-block mt-1">This field is required.</small>)}
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup className="mb-0">
             <Row className="align-items-center">
                <Col sm={7} className="text-nowrap pr-0"><Label>Select the accommodation type</Label></Col>
                <Col sm={5}>
                    <CustomInput type="radio" id="typeAccommodation" name="accommodationType" label="Accommodation" value="Accommodation" checked={data.accommodationType === "Accommodation"} onChange={(e) => handleInputChange("accommodationType", e.target.value)} inline />
                    <CustomInput type="radio" id="typeHotel" name="accommodationType" label="Hotel" value="Hotel" checked={data.accommodationType === "Hotel"} onChange={(e) => handleInputChange("accommodationType", e.target.value)} inline />
                </Col>
             </Row>
          </FormGroup>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md="6">
          <FormGroup className={`mb-0 ${classnames(states.starsState)}`}>
            <Row className="align-items-center">
                <Col sm={5} className="text-nowrap pr-0"><Label for="starsInput">How many starts the stay have?</Label></Col>
                <Col sm={7}>
                    <Input type="select" value={data.stars} onChange={(e)=> handleInputChange("stars", e.target.value)} style={{ backgroundColor: '#e14ec9', color: 'white', border: 'none' }}>
                      <option value="">Select the Stars</option>
                      <option value="0">0 Stars</option> 
                      <option value="1">1 Star</option>
                      <option value="2">2 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="5">5 Stars</option>
                    </Input>
                </Col>
            </Row>
            {states.starsState === "has-danger" && (<small className="text-danger d-block mt-1">Please select stars.</small>)}
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup className={`mb-0 ${classnames(states.locationState)}`}>
            <Row className="align-items-center">
                <Col sm={5} className="text-nowrap pr-0"><Label>Select the location on map</Label></Col>
                <Col sm={7} className="d-flex align-items-center">
                    <Button color="primary" onClick={() => setMapModalOpen(true)}>Chose on map</Button>
                    {data.location && <span className="ml-3 text-muted">{data.location}</span>}
                </Col>
            </Row>
             {states.locationState === "has-danger" && (<small className="text-danger d-block mt-1">Please select a location.</small>)}
          </FormGroup>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md="12">
          <FormGroup className={`mb-0 ${classnames(states.addressState)}`}>
            <Label for="address">Address</Label>
            <Input type="text" value={data.address} onChange={(e) => handleInputChange("address", e.target.value)} />
            {states.addressState === "has-danger" && (<small className="text-danger d-block mt-1">This field is required.</small>)}
          </FormGroup>
        </Col>
      </Row>
      <Row> 
        <Col md="12">
          <FormGroup className={`mb-0 ${classnames(states.descriptionState)}`}>
            <Label for="description">Description</Label>
            <Input type="textarea" rows="4" value={data.description} onChange={(e) => handleInputChange("description", e.target.value)} />
            {states.descriptionState === "has-danger" && (<small className="text-danger d-block mt-1">This field is required.</small>)}
          </FormGroup>
        </Col>
      </Row>

      <MapModal isOpen={isMapModalOpen} onClose={() => setMapModalOpen(false)} onLocationSelect={handleLocationSelect} />
    </>
  );
});
export default GeneralInfoSection;
