import React from "react";
import { Input, Row, Col, FormGroup, Label, Button } from "reactstrap";
const RulesSection = ({
  rules,
  onRuleChange,
  onAddNewRule,
  onIconUploadTrigger,
}) => {
  return (
    <>
      <h5 className="text-uppercase text-muted mt-4 mb-3 font-weight-bold">
        Add in rules
      </h5>
      {rules.map((rule, index) => (
        <div key={index} className="mb-3 pt-3 border-top">
          <Row className="mb-3 align-items-center">
            <Col md="6">
              <FormGroup row className="mb-0">
                <Label
                  for={`ruleCheckInTime-${index}`}
                  sm={3}
                  className="text-nowrap pr-0"
                >
                  Check in
                </Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    name={`ruleCheckInTime-${index}`}
                    id={`ruleCheckInTime-${index}`}
                    placeholder="Text"
                    value={rule.checkInTime || ""}
                    onChange={(e) =>
                      onRuleChange(index, "checkInTime", e.target.value)
                    }
                  />
                </Col>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup row className="mb-0">
                <Label
                  for={`ruleCheckOutTime-${index}`}
                  sm={3}
                  className="text-nowrap pr-0"
                >
                  Check out
                </Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    name={`ruleCheckOutTime-${index}`}
                    id={`ruleCheckOutTime-${index}`}
                    placeholder="Text"
                    value={rule.checkOutTime || ""}
                    onChange={(e) =>
                      onRuleChange(index, "checkOutTime", e.target.value)
                    }
                  />
                </Col>
              </FormGroup>
            </Col>
          </Row>
          <Row className="mb-3 align-items-center">
            <Col md="6">
              <FormGroup row className="mb-0">
                <Label
                  for={`ruleName-${index}`}
                  sm={3}
                  className="text-nowrap pr-0"
                >
                  Rule name
                </Label>
                <Col sm={9}>
                  <Input
                    type="text"
                    name={`ruleName-${index}`}
                    id={`ruleName-${index}`}
                    placeholder="Text"
                    value={rule.ruleName}
                    onChange={(e) =>
                      onRuleChange(index, "ruleName", e.target.value)
                    }
                  />
                </Col>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup row className="mb-0 align-items-center">
                <Label sm={3} className="text-nowrap pr-0">
                  Rule icon
                </Label>
                <Col sm={6}>
                  <Button
                    color="primary"
                    block
                    onClick={() => onIconUploadTrigger(index)}
                  >
                    Upload icon
                  </Button>
                </Col>
                <Col sm={3}>
                  {rule.ruleIconPreview && (
                    <img
                      src={rule.ruleIconPreview}
                      alt="Icon Preview"
                      style={{
                        width: "90px",
                        height: "90px",
                        objectFit: "cover",
                        marginLeft: "10px",
                      }}
                    />
                  )}
                </Col>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <FormGroup className="mb-0">
                <Label for={`ruleDescription-${index}`}>Rule Description</Label>
                <Input
                  type="textarea"
                  name={`ruleDescription-${index}`}
                  id={`ruleDescription-${index}`}
                  rows="3"
                  placeholder="Text"
                  value={rule.ruleDescription}
                  onChange={(e) =>
                    onRuleChange(index, "ruleDescription", e.target.value)
                  }
                />
              </FormGroup>
            </Col>
          </Row>
        </div>
      ))}
      <Button
        color="dark"
        onClick={onAddNewRule}
        className="mt-2 mb-3 d-flex align-items-center"
      >
        <i className="tim-icons icon-simple-add mr-2" /> Add new rule
      </Button>
    </>
  );
};
export default RulesSection;
