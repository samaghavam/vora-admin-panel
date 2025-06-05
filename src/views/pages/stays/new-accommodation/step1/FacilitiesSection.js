import React from "react";
import styles from './Step1.module.css'
import { Row, Col, CustomInput } from "reactstrap";
const FacilitiesSection = ({ facilities, onFacilityChange }) => {
  const facilityLabels = [];
  for (let i = 1; i <= 48; i++) {
    facilityLabels.push("Upper floors accessible by elevator");
  }
  const facilityKeys = Object.keys(facilities);

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
                  {facilityLabels[index]}
                </span>
              }
              checked={facilities[key]}
              onChange={onFacilityChange}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};
export default FacilitiesSection;
