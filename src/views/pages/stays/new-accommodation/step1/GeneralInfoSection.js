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

const GeneralInfoSection = ({ data, setData, states, setStates }) => {
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

  return (
    <>
      <h5 className="text-uppercase text-muted mt-4 mb-3 font-weight-bold">General info</h5>
      <Row className="mb-3 align-items-center">
        <Col md="7">
          <FormGroup row className={`mb-0 ${classnames(states.accommodationNameState)}`}>
            <Label for="accommodationName" sm={5} className="text-nowrap pr-0">Accommodation/Hotel name</Label>
            <Col sm={7}>
              <Input
                type="text"
                name="accommodationName"
                id="accommodationName"
                placeholder="Text"
                value={data.accommodationName}
                onChange={(e) => handleTextChange(e, "accommodationName")}
              />
              {states.accommodationNameState === "has-danger" && (<small className="text-danger d-block mt-1">This field is required.</small>)}
            </Col>
          </FormGroup>
        </Col>
        <Col md="5">
          <FormGroup row className="mb-0">
            <Label sm={7} className="text-nowrap pr-0 pt-2">Select the accommodation type</Label>
            <Col sm={5} className="pt-2">
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
          </FormGroup>
        </Col>
      </Row>
      <Row className="mb-3 align-items-center">
        <Col md="7">
          <FormGroup row className={`mb-0 ${classnames(states.starsState)}`}>
            <Label for="starsInput" sm={5} className="text-nowrap pr-0">How many starts the stay have?</Label>
            <Col sm={7}>
              <Input 
                type="select" 
                name="stars" 
                id="starsInput"
                value={data.stars}
                onChange={(e)=> handleSelectChange(e, "stars")}
              >
                <option value="">Select the Stars</option>
                <option value="0">0 Stars</option> 
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </Input>
              {states.starsState === "has-danger" && (<small className="text-danger d-block mt-1">Please select stars.</small>)}
            </Col>
          </FormGroup>
        </Col>
        <Col md="5">
          <FormGroup row className="mb-0 align-items-center">
            <Label sm={7} className="text-nowrap pr-0">Select the location on map</Label>
            <Col sm={5}>
                <Button color="primary" outline block onClick={() => alert("Map functionality placeholder")}>
                  Chose on map
                </Button>
            </Col>
          </FormGroup>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md="12">
          <FormGroup className={`mb-0 ${classnames(states.addressState)}`}>
            <Label for="address">Address</Label>
            <Input
              type="text"
              name="address"
              id="address"
              placeholder="Text"
              value={data.address}
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
              value={data.description}
              onChange={(e) => handleTextChange(e, "description")}
            />
            {states.descriptionState === "has-danger" && (<small className="text-danger d-block mt-1">This field is required.</small>)}
          </FormGroup>
        </Col>
      </Row>
    </>
  );
};
export default GeneralInfoSection