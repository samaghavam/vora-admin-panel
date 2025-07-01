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
} from "reactstrap";

const ViewModal = ({ isOpen, onClose, title, fields, data }) => {
  // If the modal isn't open or there's no data, render nothing.
  if (!isOpen || !data) return null;

  return (
    <Modal isOpen={isOpen} toggle={onClose} centered size="lg">
      <ModalHeader toggle={onClose} className="text-dark">
        {title}
      </ModalHeader>
      <ModalBody>
        {fields.map((field) => (
          <Row key={field.key} className="mb-2">
            {/* Left Column: Field Label */}
            <Col md="4">
              <strong className="text-dark">{field.label}</strong>
            </Col>
            {/* Right Column: Field Data */}
            <Col md="8">
              <span className="text-muted">{data[field.key] || "N/A"}</span>
            </Col>
          </Row>
        ))}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

ViewModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.object,
};

export default ViewModal;
