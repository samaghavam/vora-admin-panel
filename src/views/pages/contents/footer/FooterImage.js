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
} from "reactstrap";
import ImageUpload from "components/CustomUpload/ImageUpload"; // Assuming path is correct

const FooterImages = forwardRef(({ onDataChange }, ref) => {
  // --- 1. Internal State for Data ---
  const [data, setData] = useState({
    bgImage: null,
    iconImage: null,
  });

  // --- 2. Internal State for Validation ---
  const [validationState, setValidationState] = useState({
    bgImageState: "",
    iconImageState: "",
  });

  // --- 3. Expose validation and data functions to parent ---
  useImperativeHandle(ref, () => ({
    validate: () => {
      let isValid = true;
      const newValidationState = { ...validationState };

      if (!data.bgImage) {
        newValidationState.bgImageState = "has-danger";
        isValid = false;
      } else {
        newValidationState.bgImageState = "has-success";
      }

      if (!data.iconImage) {
        newValidationState.iconImageState = "has-danger";
        isValid = false;
      } else {
        newValidationState.iconImageState = "has-success";
      }

      setValidationState(newValidationState);
      return isValid;
    },
    // This function lets the parent get the data on submit
    getData: () => data,
  }));

  // --- 4. Handle file changes ---
  const handleFileChange = (file, fieldName) => {
    const newData = { ...data, [fieldName]: file };
    setData(newData);
    onDataChange(newData); // Notify parent of the change

    // Clear validation error on the specific field when a file is selected
    const validationStateField = `${fieldName}State`;
    if (validationState[validationStateField] === "has-danger") {
      setValidationState(prev => ({ ...prev, [validationStateField]: "" }));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Footer Images</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          {/* BG Footer Image Upload */}
          <Col md="4">
            <Label>BG footer</Label>
            <FormGroup className={classnames(validationState.bgImageState)}>
              <ImageUpload onFileChange={(file) => handleFileChange(file, "bgImage")} />
              {validationState.bgImageState === "has-danger" && (
                <Label className="error d-block text-center">BG Image is required.</Label>
              )}
            </FormGroup>
          </Col>

          {/* Icon Footer Image Upload */}
          <Col md="4">
            <Label>Icon footer</Label>
            <FormGroup className={classnames(validationState.iconImageState)}>
              <ImageUpload onFileChange={(file) => handleFileChange(file, "iconImage")} />
              {validationState.iconImageState === "has-danger" && (
                <Label className="error d-block text-center">Icon Image is required.</Label>
              )}
            </FormGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
});

FooterImages.propTypes = {
  onDataChange: PropTypes.func.isRequired,
};

export default FooterImages;
