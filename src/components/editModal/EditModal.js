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
import styles from "../../assets/css/EditModal.module.css"; // Import the CSS module

const EditModal = ({ isOpen, onClose, title, fields, data, onSave, onInputChange }) => {
  // If the modal isn't open or there's no data, render nothing.
  if (!isOpen || !data) return null;

  const handleSave = () => {
    onSave();
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={onClose} centered scrollable={true} size="lg">
        <ModalHeader toggle={onClose} className="text-dark">
          {title}
        </ModalHeader>
        <ModalBody>
          {fields.map((field) => (
            <FormGroup key={field.key}>
              <Row className="align-items-center">
                <Col md="4">
                  <Label className="text-dark font-weight-bold">{field.label}</Label>
                </Col>
                <Col md="8">
                  <Input
                    type={field.type || 'text'}
                    value={data[field.key] || ''}
                    onChange={(e) => onInputChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    // Apply the class from the CSS module
                    className={styles.input}
                  />
                </Col>
              </Row>
            </FormGroup>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button color="info" onClick={handleSave}>
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

EditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default EditModal;
