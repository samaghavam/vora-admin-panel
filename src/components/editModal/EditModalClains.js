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
  Input,
  CustomInput,
} from "reactstrap";

const EditModalClains = ({ isOpen, onClose, data, onSave, onInputChange }) => {
  if (!isOpen || !data) return null;

  const handleSave = () => {
    onSave();
  };
  
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const updatedClaims = { ...data.claims, [name]: checked };
    onInputChange('claims', updatedClaims);
  };

  const editableFields = [
    { key: 'adminName', label: 'Admin name' },
    { key: 'creationDate', label: 'Creation date', type: 'date' },
    { key: 'stateAdmin', label: 'State' }, 
    { key: 'role', label: 'Role' },
    { key: 'phoneNumber', label: 'Phone number' },
    { key: 'userName', label: 'User name' },
    { key: 'userPhoneNumber', label: 'User phone number' },
    { key: 'userMail', label: 'User Mail' },
  ];
  
  const claimsList = Array.from({ length: 10 }, (_, i) => `Upper floors accessible by elevator`);

  return (
    <>
      <Modal isOpen={isOpen} toggle={onClose} centered size="lg" modalClassName="edit-claims-modal">
        <ModalHeader toggle={onClose} className="text-dark">
          Ticket details
        </ModalHeader>
        <ModalBody>
          {editableFields.map((field) => (
            <Row key={field.key} className="mb-2 align-items-center">
              <Col md="5">
                <strong className="text-dark">{field.label}</strong>
              </Col>
              <Col md="7">
                {field.key === 'stateAdmin' ? (
                  <Input
                    type="select"
                    value={data[field.key] || ''}
                    onChange={(e) => onInputChange(field.key, e.target.value)}
                  >
                    <option value="">Select State</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Input>
                ) : (
                  <Input
                    type={field.type || 'text'}
                    value={data[field.key] || ''}
                    onChange={(e) => onInputChange(field.key, e.target.value)}
                  />
                )}
              </Col>
            </Row>
          ))}

          {/* Actions Section */}
          <hr />
          <h5 className="text-dark font-weight-bold mb-3">Actions</h5>
          <Row>
            <Col>
              <Button color="danger" block><i className="tim-icons icon-simple-remove mr-1" /> Block access</Button>
            </Col>
            <Col>
              <Button color="secondary" outline block>Edit</Button>
            </Col>
            <Col>
              <Button color="primary" block>Change password</Button>
            </Col>
          </Row>

          {/* Claims Section */}
          <hr />
          <h5 className="text-dark font-weight-bold mb-3">Claims</h5>
          <Row>
            {claimsList.map((claim, index) => (
              <Col md="6" key={`claim-edit-${index}`}>
                <FormGroup>
                  <CustomInput
                    type="checkbox"
                    id={`edit-claim-${index}`}
                    name={`claim${index + 1}`}
                    label={claim}
                    checked={!!data.claims?.[`claim${index + 1}`]}
                    onChange={handleCheckboxChange}
                  />
                </FormGroup>
              </Col>
            ))}
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
       <style>{`
        .edit-claims-modal .modal-body .form-control {
          color: #495057 !important; 
        }
      `}</style>
    </>
  );
};

EditModalClains.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default EditModalClains;
