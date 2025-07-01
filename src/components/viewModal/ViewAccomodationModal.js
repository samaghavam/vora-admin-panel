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
} from "reactstrap";

const ViewModalAccomodation = ({ isOpen, onClose, title, data }) => {
  // If the modal isn't open or there's no data, render nothing.
  if (!isOpen || !data) return null;

  // The fields are defined here to match the layout in the screenshot
  const fields = [
    { key: 'passportName', label: 'Passport Name' },
    { key: 'passportNumber', label: 'Passport number' },
    { key: 'passportExpiration', label: 'Passport expiration date' },
    { key: 'visaType', label: 'Kind of requested visa' },
    { key: 'requestFunnel', label: 'Request funnel' },
    { key: 'state', label: 'State' },
    { key: 'userName', label: 'User name' },
    { key: 'userPhoneNumber', label: 'User phone number' },
    { key: 'userMail', label: 'User Mail' },
  ];

  return (
    <>
      <Modal isOpen={isOpen} toggle={onClose} centered size="lg" modalClassName="view-accommodation-modal">
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
                  {/* Display data as read-only text */}
                  <span className="text-muted">{data[field.key] || 'N/A'}</span>
                </Col>
              </Row>
            </FormGroup>
          ))}
          <hr />
          <FormGroup>
                 <Label className="text-dark font-weight-bold">State</Label>
            <Row className="align-items-center">
              <Col className="d-flex justify-content-center state-buttons">
                {/*
                  The `disabled` prop has been removed to allow for correct styling.
                  The buttons are made non-interactive with CSS instead.
                */}
                <Button
                  color={data.state === 'In Progress' ? 'info' : 'dark'}
                  className="mr-2 btn-round"
                >
                  In Progress
                </Button>
                <Button
                  color={data.state === 'Successful' ? 'success' : 'dark'}
                  className="mr-2 btn-round"
                >
                  Successful
                </Button>
                <Button
                  color={data.state === 'Failed' ? 'danger' : 'dark'}
                  className="btn-round"
                >
                  Failed
                </Button>
              </Col>
            </Row>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      {/*
        **THE FIX IS HERE:**
        This CSS makes the buttons non-clickable and forces the inactive
        buttons to have the dark background, while the active button retains its color.
      */}
      <style>{`
        .view-accommodation-modal .state-buttons .btn {
          pointer-events: none;
        }
        .view-accommodation-modal .state-buttons .btn.btn-dark {
            background-color: #27293d !important;
            border-color: #27293d !important;
        }
      `}</style>
    </>
  );
};

ViewModalAccomodation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.object,
};

export default ViewModalAccomodation;
