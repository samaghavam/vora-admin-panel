import React from "react";
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
import MapModal from "views/components/ModalMap";

const GeneralInfoSection = ({ data, setData, states, setStates }) => {
  const [isMapModalOpen, setMapModalOpen] = React.useState(false);

  const handleTextChange = (event, field, minLength = 1) => {
    const { value } = event.target;
    setData(prev => ({ ...prev, [field]: value }));
    setStates(prev => ({
      ...prev,
      [`${field}State`]: value.length >= minLength ? "has-success" : "has-danger",
    }));
  };

  const handleSelectChange = (event, field) => {
    const { value } = event.target;
    setData(prev => ({ ...prev, [field]: value }));
    setStates(prev => ({
      ...prev,
      [`${field}State`]: (value || value === "0") ? "has-success" : "has-danger",
    }));
  };

  const handleLocationSelect = (locationName) => {
    setData(prev => ({...prev, location: locationName}));
    setStates(prev => ({...prev, locationState: "has-success"}));
  };

  return (
    <>
      <h5 className="text-uppercase text-muted mt-4 mb-3 font-weight-bold">General info</h5>
      
      {/* --- First Row --- */}
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
                  name="accommodationName"
                  id="accommodationName"
                  placeholder="Text"
                  value={data.accommodationName || ''}
                  onChange={(e) => handleTextChange(e, "accommodationName")}
                />
              </Col>
            </Row>
            {states.accommodationNameState === "has-danger" && (<small className="text-danger d-block mt-1">This field is required.</small>)}
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup className="mb-0">
             <Row className="align-items-center">
                <Col sm={7} className="text-nowrap pr-0">
                    <Label>Select the accommodation type</Label>
                </Col>
                <Col sm={5}>
                    <CustomInput 
                      type="radio" 
                      id="typeAccommodation" 
                      name="accommodationType" 
                      label="Accommodation" 
                      value="Accommodation"
                      checked={data.accommodationType === "Accommodation"}
                      onChange={(e) => setData(prev => ({...prev, accommodationType: e.target.value}))}
                      inline 
                    />
                    <CustomInput 
                      type="radio" 
                      id="typeHotel" 
                      name="accommodationType" 
                      label="Hotel" 
                      value="Hotel"
                      checked={data.accommodationType === "Hotel"}
                      onChange={(e) => setData(prev => ({...prev, accommodationType: e.target.value}))}
                      inline 
                    />
                </Col>
             </Row>
          </FormGroup>
        </Col>
      </Row>

      {/* --- Second Row --- */}
      <Row className="mb-3">
        <Col md="6">
          <FormGroup className={`mb-0 ${classnames(states.starsState)}`}>
            <Row className="align-items-center">
                <Col sm={5} className="text-nowrap pr-0">
                    <Label for="starsInput">How many starts the stay have?</Label>
                </Col>
                <Col sm={7}>
                    <Input 
                      type="select" 
                      name="stars" 
                      id="starsInput"
                      value={data.stars || ''}
                      onChange={(e)=> handleSelectChange(e, "stars")}
                      style={{ backgroundColor: '#e14ec9', color: 'white', border: 'none' }}
                    >
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
          <FormGroup className="mb-0">
            <Row className="align-items-center">
                <Col sm={5} className="text-nowrap pr-0">
                    <Label>Select the location on map</Label>
                </Col>
                <Col sm={7} className="d-flex align-items-center">
                    <Button color="primary" onClick={() => setMapModalOpen(true)}>
                      Chose on map
                    </Button>
                    {data.location && <span className="ml-3 text-muted">{data.location}</span>}
                </Col>
            </Row>
          </FormGroup>
        </Col>
      </Row>

      {/* --- Address and Description --- */}
      <Row className="mb-3">
        <Col md="12">
          <FormGroup className={`mb-0 ${classnames(states.addressState)}`}>
            <Label for="address">Address</Label>
            <Input
              type="text"
              name="address"
              id="address"
              placeholder="Text"
              value={data.address || ''}
              onChange={(e) => handleTextChange(e, "address")}
            />
            {states.addressState === "has-danger" && (<small className="text-danger d-block mt-1">This field is required.</small>)}
          </FormGroup>
        </Col>
      </Row>
      <Row> 
        <Col md="12">
          <FormGroup className={`mb-0 ${classnames(states.descriptionState)}`}>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              rows="4"
              placeholder="Text"
              value={data.description || ''}
              onChange={(e) => handleTextChange(e, "description")}
            />
            {states.descriptionState === "has-danger" && (<small className="text-danger d-block mt-1">This field is required.</small>)}
          </FormGroup>
        </Col>
      </Row>

      {/* Render the Map Modal */}
      <MapModal
        isOpen={isMapModalOpen}
        onClose={() => setMapModalOpen(false)}
        onLocationSelect={handleLocationSelect}
      />
    </>
  );
};
export default GeneralInfoSection;
