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
  Label,
  Input,
} from "reactstrap";
import classnames from "classnames";
import styles from "../../assets/css/EditModalClains.module.css"; 

const EditModalAccomodation = ({ isOpen, onClose, title, data, onSave, onInputChange }) => {
  if (!isOpen || !data) return null;

  const handleSave = () => {
    onSave();
  };

  const handleStateChange = (newState) => {
    onInputChange('state', newState);
  };

  const fields = [
    { key: 'passportName', label: 'Passport Name', placeholder: 'Name of the accommodation' },
    { key: 'passportNumber', label: 'Passport number', placeholder: 'Have room' },
    { key: 'passportExpiration', label: 'Passport expiration date', placeholder: 'Country - city', type: 'date' },
    { key: 'visaType', label: 'Kind of requested visa', placeholder: 'Added manually' },
    { key: 'requestFunnel', label: 'Request funnel', placeholder: 'Number of rooms' },
    { key: 'state', label: 'State', placeholder: 'Total number of reserves' },
    { key: 'userName', label: 'User name', placeholder: 'Reserved rooms number' },
    { key: 'userPhoneNumber', label: 'User phone number', placeholder: 'Room 1 Name' },
    { key: 'userMail', label: 'User Mail', placeholder: 'Room 2 Name' },
  ];

  return (
    <>
      <Modal isOpen={isOpen} toggle={onClose} centered size="lg">
        <ModalHeader toggle={onClose} className="text-dark">
          {title}
        </ModalHeader>
        <ModalBody>
          {fields.map((field) => (
            <FormGroup key={field.key}>
              <Row className="align-items-center">
                <Col md="5">
                  <Label className="text-dark font-weight-bold">{field.label}</Label>
                </Col>
                <Col md="7">
                  <Input
                    type={field.type || 'text'}
                    value={data[field.key] || ''}
                    onChange={(e) => onInputChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className={styles.input}
                  />
                </Col>
              </Row>
            </FormGroup>
          ))}
          <FormGroup>
            <Label className="text-dark font-weight-bold">State</Label>
            <Row className="align-items-center">
              <Col className={`d-flex justify-content-center ${styles.stateButtons}`}>
                <Button
                  color={data.state === 'In Progress' ? 'primary' : 'dark'}
                  onClick={() => handleStateChange('In Progress')}
                  className={classnames("mr-2", "btn-round", { active: data.state === 'In Progress' })}
                >
                  In Progress
                </Button>
                <Button
                  color={data.state === 'Successful' ? 'primary' : 'dark'}
                  onClick={() => handleStateChange('Successful')}
                  className={classnames("mr-2", "btn-round", { active: data.state === 'Successful' })}
                >
                  Successful
                </Button>
                <Button
                  color={data.state === 'Failed' ? 'primary' : 'dark'}
                  onClick={() => handleStateChange('Failed')}
                  className={classnames("btn-round", { active: data.state === 'Failed' })}
                >
                  Failed
                </Button>
              </Col>
            </Row>
          </FormGroup>
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
    </>
  );
};

EditModalAccomodation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default EditModalAccomodation;
