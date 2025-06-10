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

const Section4 = forwardRef((props, ref) => {
  // --- STATE MANAGEMENT ---
  const [titleH1, setTitleH1] = useState("");
  const [titleH1Smaller, setTitleH1Smaller] = useState("");
  const [subtextH2, setSubtextH2] = useState("");
  const [location, setLocation] = useState("");

  // Validation States
  const [titleH1State, setTitleH1State] = useState("");
  const [titleH1SmallerState, setTitleH1SmallerState] = useState("");
  const [subtextH2State, setSubtextH2State] = useState("");
  const [locationState, setLocationState] = useState("");


  // --- IMPERATIVE HANDLE ---
  useImperativeHandle(ref, () => ({
    validate: () => validateFields(),
    getData: () => ({
      titleH1,
      titleH1Smaller,
      subtextH2,
      location,
    }),
  }));

  // --- VALIDATION & CHANGE HANDLERS ---
  const verifyLength = (value) => {
    if (typeof value === 'string') return value.trim().length > 0;
    return value !== null;
  };

  const validateFields = () => {
    let isValid = true;
    if (!verifyLength(titleH1)) { setTitleH1State("has-danger"); isValid = false; } else { setTitleH1State("has-success"); }
    if (!verifyLength(titleH1Smaller)) { setTitleH1SmallerState("has-danger"); isValid = false; } else { setTitleH1SmallerState("has-success"); }
    if (!verifyLength(subtextH2)) { setSubtextH2State("has-danger"); isValid = false; } else { setSubtextH2State("has-success"); }
    if (!verifyLength(location)) { setLocationState("has-danger"); isValid = false; } else { setLocationState("has-success"); }
    
    return isValid;
  };

  const handleInputChange = (setter, stateSetter, value) => {
    setter(value);
    stateSetter("");
  };

  // --- RENDER ---
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Section 3 - Location</CardTitle>
      </CardHeader>
      <CardBody>
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
        <FormGroup className={`has-label ${locationState}`}>
            <Label>Select the location on map</Label>
            <Input 
                type="text" 
                value={location}
                placeholder="Enter a location or address"
                onChange={(e) => handleInputChange(setLocation, setLocationState, e.target.value)}
            />
             {locationState === "has-danger" && <Label className="error">Location is required.</Label>}
        </FormGroup>
         <Button color="primary" style={{background: 'linear-gradient(to right, #da22ff, #9733ee)', border: 'none'}}>
            Choose on map
        </Button>
      </CardBody>
    </Card>
  );
});

export default Section4;
