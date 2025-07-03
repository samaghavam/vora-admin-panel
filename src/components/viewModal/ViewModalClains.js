import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  FormGroup,
  CustomInput,
} from "reactstrap";

const ViewModalClains = ({ isOpen, onClose, data }) => {
  // If the modal isn't open or there's no data, render nothing.
  if (!isOpen || !data) return null;

  // Define the fields for the read-only section
  const displayFields = [
    { key: 'adminName', label: 'Admin name' },
    { key: 'creationDate', label: 'Creation date' },
    { key: 'stateAdmin', label: 'State' },
    { key: 'role', label: 'Role' },
    { key: 'claims', label: 'Claims' }, // This will be handled by the checkboxes
    { key: 'phoneNumber', label: 'Phone number' },
    { key: 'userName', label: 'User name' },
    { key: 'userPhoneNumber', label: 'User phone number' },
    { key: 'userMail', label: 'User Mail' },
  ];
  
  // Define the claims for the checkbox section
  const claimsList = Array.from({ length: 10 }, (_, i) => `Upper floors accessible by elevator`);


  return (
    <>
      <Modal isOpen={isOpen} toggle={onClose} centered size="lg" modalClassName="view-claims-modal">
        <ModalHeader toggle={onClose} className="text-dark">
          Ticket details
        </ModalHeader>
        <ModalBody>
          {/* Read-only details section */}
          {displayFields.map((field) => (
            field.key !== 'claims' && (
              <Row key={field.key} className="mb-2">
                <Col md="5">
                  <strong className="text-dark">{field.label}</strong>
                </Col>
                <Col md="7">
                  <span className="text-muted">{data[field.key] || 'N/A'}</span>
                </Col>
              </Row>
            )
          ))}

          {/* Actions Section - All buttons are disabled */}
          <hr />
          <h5 className="text-dark font-weight-bold mb-3">Actions</h5>
          <Row>
            <Col>
              <Button color="danger" block disabled><i className="tim-icons icon-simple-remove mr-1" /> Block access</Button>
            </Col>
            <Col>
              <Button color="secondary" outline block disabled>Edit</Button>
            </Col>
            <Col>
              <Button color="primary" block disabled>Change password</Button>
            </Col>
          </Row>

          {/* Claims Section - All checkboxes are disabled */}
          <hr />
          <h5 className="text-dark font-weight-bold mb-3">Claims</h5>
          <Row>
            {claimsList.map((claim, index) => (
              <Col md="6" key={`claim-view-${index}`}>
                <FormGroup>
                  <CustomInput
                    type="checkbox"
                    id={`view-claim-${index}`}
                    name={`claim${index + 1}`}
                    label={claim}
                    checked={!!data.claims?.[`claim${index + 1}`]}
                    disabled
                  />
                </FormGroup>
              </Col>
            ))}
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

ViewModalClains.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object,
};

export default ViewModalClains;
