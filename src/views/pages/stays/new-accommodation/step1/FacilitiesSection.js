import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Row, Col, CustomInput, Label } from "reactstrap";
import styles from './Step1.module.css';

const FacilitiesSection = forwardRef((props, ref) => {
  const facilityKeys = [
    'facility1', 'facility2', 'facility3', 'facility4', 'facility5', 'facility6', 'facility7', 'facility8',
    'facility9', 'facility10', 'facility11', 'facility12', 'facility13', 'facility14', 'facility15', 'facility16',
    'facility17', 'facility18', 'facility19', 'facility20', 'facility21', 'facility22', 'facility23', 'facility24',
    'facility25', 'facility26', 'facility27', 'facility28', 'facility29', 'facility30', 'facility31', 'facility32',
    'facility33', 'facility34', 'facility35', 'facility36', 'facility37', 'facility38', 'facility39', 'facility40',
    'facility41', 'facility42', 'facility43', 'facility44', 'facility45', 'facility46', 'facility47', 'facility48'
  ];

  const initialFacilities = facilityKeys.reduce((acc, key) => ({ ...acc, [key]: false }), {});
  const [facilities, setFacilities] = useState(initialFacilities);
  const [validationState, setValidationState] = useState("");

  const onFacilityChange = (e) => {
    const { name, checked } = e.target;
    setFacilities(prev => ({ ...prev, [name]: checked }));
    // Clear the validation error message as soon as the user interacts with the form
    if (validationState === "has-danger") {
      setValidationState("");
    }
  };
  
  // Expose the validate and getData methods to the parent component (Step1)
  useImperativeHandle(ref, () => ({
    validate: () => {
      // Check if at least one checkbox is checked
      const isAnyFacilityChecked = Object.values(facilities).some(value => value === true);
      if (!isAnyFacilityChecked) {
        setValidationState("has-danger");
        return false;
      }
      setValidationState("has-success");
      return true;
    },
    getData: () => facilities,
  }));

  return (
    <>
      <h5 className="text-uppercase text-muted mt-4 mb-3 font-weight-bold">
        Choose the stay facilities
      </h5>
      <Row>
        {facilityKeys.map((key, index) => (
          <Col md="3" sm="6" xs="12" key={key} className="mb-2">
            <CustomInput
              type="checkbox"
              id={`facility-${key}`}
              name={key}
              label={
                <span className={styles.facility}>
                  Upper floors accessible by elevator
                </span>
              }
              checked={facilities[key]}
              onChange={onFacilityChange}
            />
          </Col>
        ))}
      </Row>
      {/* Display validation error message if validation fails */}
      {validationState === "has-danger" && (
        <Label className="error mt-2">Please select at least one facility.</Label>
      )}
    </>
  );
});

export default FacilitiesSection;
