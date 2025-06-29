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
} from "reactstrap";

const Section5 = forwardRef((props, ref) => {
  // Text Inputs
  const [titleH1, setTitleH1] = useState("");
  const [titleH1Smaller, setTitleH1Smaller] = useState("");
  const [subtextH2, setSubtextH2] = useState("");

  // Validation States
  const [titleH1State, setTitleH1State] = useState("");
  const [titleH1SmallerState, setTitleH1SmallerState] = useState("");
  const [subtextH2State, setSubtextH2State] = useState("");

  // --- IMPERATIVE HANDLE ---
  useImperativeHandle(ref, () => ({
    validate: () => validateFields(),
    getData: () => ({
        titleH1,
        titleH1Smaller,
        subtextH2,
    }),
  }));

  // --- VALIDATION & CHANGE HANDLERS ---
  const verifyLength = (value) => {
    return value.trim().length > 0;
  };

  const validateFields = () => {
    let isValid = true;
    
    if (!verifyLength(titleH1)) {
        setTitleH1State("has-danger");
        isValid = false;
    } else {
        setTitleH1State("has-success");
    }

    if (!verifyLength(titleH1Smaller)) {
        setTitleH1SmallerState("has-danger");
        isValid = false;
    } else {
        setTitleH1SmallerState("has-success");
    }

    if (!verifyLength(subtextH2)) {
        setSubtextH2State("has-danger");
        isValid = false;
    } else {
        setSubtextH2State("has-success");
    }
    
    return isValid;
  };

  const handleInputChange = (setter, stateSetter, value) => {
    setter(value);
    stateSetter("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Section 5 - Blogs</CardTitle>
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
      </CardBody>
    </Card>
  );
});

export default Section5;
