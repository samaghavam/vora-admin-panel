import React, { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { Input, Row, Col, FormGroup, Label, Button } from "reactstrap";
import classnames from "classnames";

const RulesSection = forwardRef((props, ref) => {
  const [rules, setRules] = useState([
    { id: 1, checkInTime: "", checkOutTime: "", ruleName: "", ruleDescription: "", ruleIconFile: null, ruleIconPreview: null }
  ]);
  const fileInputRef = useRef(null);
  const [currentRuleIndexForUpload, setCurrentRuleIndexForUpload] = useState(null);
  
  const onAddNewRule = () => {
    setRules(prev => [...prev, { id: Date.now(), checkInTime: "", checkOutTime: "", ruleName: "", ruleDescription: "", ruleIconFile: null, ruleIconPreview: null }]);
  };

  const onRuleChange = (index, field, value) => {
    const newRules = [...rules];
    newRules[index][field] = value;
    // Clear validation state on change
    if (newRules[index][`${field}State`] === 'has-danger') {
        newRules[index][`${field}State`] = '';
    }
    setRules(newRules);
  };

  const triggerIconUpload = (index) => {
    setCurrentRuleIndexForUpload(index);
    fileInputRef.current.click();
  };

  const handleRuleIconChange = (event) => {
    const file = event.target.files[0];
    if (file && currentRuleIndexForUpload !== null) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newRules = [...rules];
        newRules[currentRuleIndexForUpload].ruleIconPreview = reader.result;
        newRules[currentRuleIndexForUpload].ruleIconFile = file;
        newRules[currentRuleIndexForUpload].ruleIconPreviewState = ''; // Clear validation
        setRules(newRules);
      };
      reader.readAsDataURL(file);
    }
    fileInputRef.current.value = ""; 
    setCurrentRuleIndexForUpload(null);
  };

  const verifyLength = (value) => value && value.trim().length > 0;

  useImperativeHandle(ref, () => ({
    validate: () => {
      let isAllValid = true;
      const validatedRules = rules.map(rule => {
        const newStates = {};
        if (!verifyLength(rule.checkInTime)) { newStates.checkInTimeState = "has-danger"; isAllValid = false; } else { newStates.checkInTimeState = "has-success"; }
        if (!verifyLength(rule.checkOutTime)) { newStates.checkOutTimeState = "has-danger"; isAllValid = false; } else { newStates.checkOutTimeState = "has-success"; }
        if (!verifyLength(rule.ruleName)) { newStates.ruleNameState = "has-danger"; isAllValid = false; } else { newStates.ruleNameState = "has-success"; }
        if (!verifyLength(rule.ruleDescription)) { newStates.ruleDescriptionState = "has-danger"; isAllValid = false; } else { newStates.ruleDescriptionState = "has-success"; }
        if (!rule.ruleIconFile) { newStates.ruleIconPreviewState = "has-danger"; isAllValid = false; } else { newStates.ruleIconPreviewState = "has-success"; }

        return { ...rule, ...newStates };
      });
      setRules(validatedRules);
      return isAllValid;
    },
    getData: () => rules.map(({ checkInTime, checkOutTime, ruleName, ruleDescription, ruleIconFile }) => ({ checkInTime, checkOutTime, ruleName, ruleDescription, ruleIcon: ruleIconFile })),
  }));

  return (
    <>
      <input type="file" ref={fileInputRef} onChange={handleRuleIconChange} style={{ display: 'none' }} accept="image/*" />
      <h5 className="text-uppercase text-muted mt-4 mb-3 font-weight-bold">
        Add in rules
      </h5>
      {rules.map((rule, index) => (
        <div key={rule.id} className="mb-3 pt-3 border-top">
          <Row className="mb-3 align-items-center">
            <Col md="6">
              <FormGroup className={`mb-0 ${classnames(rule.checkInTimeState)}`}>
                <Row className="align-items-center"><Label sm={3}>Check in</Label><Col sm={9}><Input type="text" value={rule.checkInTime || ""} onChange={(e) => onRuleChange(index, "checkInTime", e.target.value)} /></Col></Row>
                 {rule.checkInTimeState === 'has-danger' && <small className="text-danger d-block mt-1">This field is required.</small>}
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup className={`mb-0 ${classnames(rule.checkOutTimeState)}`}>
                <Row className="align-items-center"><Label sm={3}>Check out</Label><Col sm={9}><Input type="text" value={rule.checkOutTime || ""} onChange={(e) => onRuleChange(index, "checkOutTime", e.target.value)} /></Col></Row>
                 {rule.checkOutTimeState === 'has-danger' && <small className="text-danger d-block mt-1">This field is required.</small>}
              </FormGroup>
            </Col>
          </Row>
          <Row className="mb-3 align-items-center">
            <Col md="6">
              <FormGroup className={`mb-0 ${classnames(rule.ruleNameState)}`}>
                <Row className="align-items-center"><Label sm={3}>Rule name</Label><Col sm={9}><Input type="text" value={rule.ruleName} onChange={(e) => onRuleChange(index, "ruleName", e.target.value)} /></Col></Row>
                 {rule.ruleNameState === 'has-danger' && <small className="text-danger d-block mt-1">This field is required.</small>}
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup className={`mb-0 ${classnames(rule.ruleIconPreviewState)}`}>
                <Row className="align-items-center">
                  <Label sm={3}>Rule icon</Label>
                  <Col sm={6}><Button color="primary" block onClick={() => triggerIconUpload(index)}>Upload icon</Button></Col>
                  <Col sm={3}>
                    {rule.ruleIconPreview && (<img src={rule.ruleIconPreview} alt="Icon Preview" style={{ width: "40px", height: "40px", objectFit: "cover" }} />)}
                  </Col>
                </Row>
                {rule.ruleIconPreviewState === 'has-danger' && <small className="text-danger d-block mt-1">Icon is required.</small>}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <FormGroup className={`mb-0 ${classnames(rule.ruleDescriptionState)}`}>
                <Label>Rule Description</Label>
                <Input type="textarea" rows="3" value={rule.ruleDescription} onChange={(e) => onRuleChange(index, "ruleDescription", e.target.value)} />
                 {rule.ruleDescriptionState === 'has-danger' && <small className="text-danger d-block mt-1">This field is required.</small>}
              </FormGroup>
            </Col>
          </Row>
        </div>
      ))}
      <Button color="dark" onClick={onAddNewRule} className="mt-2 mb-3 d-flex align-items-center">
        <i className="tim-icons icon-simple-add mr-2" /> Add new rule
      </Button>
    </>
  );
});

export default RulesSection;
