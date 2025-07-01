import React, { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
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

const FooterDescription = forwardRef(({ onDataChange }, ref) => {
  // --- 1. Internal State for Data ---
  const [description, setDescription] = useState("");

  // --- 2. Internal State for Validation ---
  const [descriptionState, setDescriptionState] = useState("");

  // --- 3. Expose validation and data functions to parent ---
  useImperativeHandle(ref, () => ({
    validate: () => {
      let isValid = true;
      if (description.trim() === "") {
        setDescriptionState("has-danger");
        isValid = false;
      } else {
        setDescriptionState("has-success");
      }
      return isValid;
    },
    getData: () => ({
      description,
    }),
  }));

  // --- 4. Handle input changes ---
  const handleChange = (e) => {
    const { value } = e.target;
    setDescription(value);
    onDataChange({ description: value }); // Notify parent of the change

    // Clear validation error as the user types
    if (descriptionState === "has-danger") {
      setDescriptionState("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Footer Description</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md="12">
            <FormGroup className={classnames(descriptionState)}>
              <Input
                type="text"
                value={description}
                onChange={handleChange}
                placeholder="Text"
              />
              {descriptionState === "has-danger" && (
                <label className="error">Description is required.</label>
              )}
            </FormGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
});

FooterDescription.propTypes = {
  onDataChange: PropTypes.func.isRequired,
};

export default FooterDescription;
