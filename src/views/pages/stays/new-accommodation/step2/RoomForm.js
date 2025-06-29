import React from "react";
import classnames from "classnames";
import {
  Input,
  Row,
  Col,
  FormGroup,
  Label,
  Button,
  CustomInput,
} from "reactstrap";
import ImageUpload from "components/CustomUpload/ImageUpload.js";

const RoomForm = ({
  room,
  roomIndex,
  onRoomChange,
  onRoomImageSelected,
  onRemoveRoom,
  isOnlyRoom,
  submitted,
}) => {
  const handleTextChange = (e) => {
    onRoomChange(roomIndex, e.target.name, e.target.value);
  };

  const handleSelectChange = (e) => {
    onRoomChange(roomIndex, e.target.name, e.target.value);
  };

  const handleRadioToggle = (field, value) => {
    onRoomChange(roomIndex, field, value);
  };

  const handleBenefitChange = (e) => {
    const newBenefits = { ...room.benefits, [e.target.name]: e.target.checked };
    onRoomChange(roomIndex, "benefits", newBenefits);
  };

  const roomBenefitLabels = Array(20).fill(
    "Upper floors accessible by elevator"
  );
  const bedCountOptions = [
    { value: "", label: "Choose number" },
    { value: "0", label: "0" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5+" },
  ];
  const capacityOptions = [
    { value: "", label: "Select the capacity" },
    { value: "1", label: "1 Adult" },
    { value: "2", label: "2 Adults" },
    { value: "3", label: "3 Adults" },
    { value: "4", label: "4 Adults" },
    { value: "5", label: "5+ Adults" },
  ];

  const labelSmSize = 5;
  const inputSmSize = 7;

  return (
    <div className="border rounded p-4 mb-4 position-relative">
      {!isOnlyRoom && (
        <Button
          color="danger"
          size="sm"
          className="position-absolute"
          style={{ top: "10px", right: "10px", zIndex: 2 }}
          onClick={() => onRemoveRoom(room.id)}
        >
          <i className="tim-icons icon-simple-remove mr-1" />
          Remove Room
        </Button>
      )}

      <h5 className="text-uppercase text-muted mt-4 mb-4 font-weight-bold">
        Room info #{roomIndex + 1}
      </h5>

      <Row className="mb-3">
        <Col md="6">
          <FormGroup
            row
            className={`mb-md-0 ${classnames(
              room.validationStates.roomNameState
            )}`}
          >
            <Label
              htmlFor={`roomName-${room.id}`}
              sm={labelSmSize}
              className="text-nowrap pr-0"
            >
              Room Name
            </Label>
            <Col sm={inputSmSize}>
              <Input
                type="text"
                name="roomName"
                id={`roomName-${room.id}`}
                placeholder="Text"
                value={room.roomName}
                onChange={handleTextChange}
              />
              {room.validationStates.roomNameState === "has-danger" && (
                <small className="text-danger d-block mt-1">
                  Room name is required.
                </small>
              )}
            </Col>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup
            row
            className={`mb-0 ${classnames(
              room.validationStates.pricePerNightState
            )}`}
          >
            <Label
              htmlFor={`pricePerNight-${room.id}`}
              sm={labelSmSize}
              className="text-nowrap pr-0"
            >
              Price Per night for one person
            </Label>
            <Col sm={inputSmSize}>
              <Input
                type="text"
                name="pricePerNight"
                id={`pricePerNight-${room.id}`}
                placeholder="Text"
                value={room.pricePerNight}
                onChange={handleTextChange}
              />
              {room.validationStates.pricePerNightState === "has-danger" && (
                <small className="text-danger d-block mt-1">
                  Enter a valid price.
                </small>
              )}
            </Col>
          </FormGroup>
        </Col>
      </Row>

      {/* -- COMPLETED FORM FIELDS -- */}
      <Row className="mb-3 align-items-center">
        <Col md="6">
          <FormGroup
            row
            className={`mb-md-0 ${classnames(
              room.validationStates.capacityState
            )}`}
          >
            <Label
              htmlFor={`capacity-${room.id}`}
              sm={labelSmSize}
              className="text-nowrap pr-0"
            >
              Capacity
            </Label>
            <Col sm={inputSmSize}>
              <Input
                type="select"
                name="capacity"
                id={`capacity-${room.id}`}
                value={room.capacity}
                onChange={handleSelectChange}
              >
                {capacityOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Input>
              {room.validationStates.capacityState === "has-danger" && (
                <small className="text-danger d-block mt-1">
                  Please select capacity.
                </small>
              )}
            </Col>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup row className="mb-0">
            <Label sm={labelSmSize} className="text-nowrap pr-0">
              is children free?
            </Label>
            <Col sm={inputSmSize} className="pt-1">
              <CustomInput
                type="radio"
                id={`childrenFreeYes-${room.id}`}
                name={`childrenFree-${room.id}`}
                label="Yes"
                inline
                checked={room.childrenFree === true}
                onChange={() => handleRadioToggle("childrenFree", true)}
              />
              <CustomInput
                type="radio"
                id={`childrenFreeNo-${room.id}`}
                name={`childrenFree-${room.id}`}
                label="No"
                inline
                checked={room.childrenFree === false}
                onChange={() => handleRadioToggle("childrenFree", false)}
              />
              {submitted && room.childrenFree === null && (
                <small className="text-danger d-block mt-1">
                  Please select an option.
                </small>
              )}
            </Col>
          </FormGroup>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md="6">
          <FormGroup
            row
            className={`mb-md-0 ${classnames(
              room.validationStates.largeBedsState
            )}`}
          >
            <Label
              htmlFor={`largeBeds-${room.id}`}
              sm={labelSmSize}
              className="text-nowrap pr-0"
            >
              Number of large beds
            </Label>
            <Col sm={inputSmSize}>
              <Input
                type="select"
                name="largeBeds"
                id={`largeBeds-${room.id}`}
                value={room.largeBeds}
                onChange={handleSelectChange}
              >
                {bedCountOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Input>
              {room.validationStates.largeBedsState === "has-danger" && (
                <small className="text-danger d-block mt-1">Required.</small>
              )}
            </Col>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup
            row
            className={`mb-0 ${classnames(
              room.validationStates.smallBedsState
            )}`}
          >
            <Label
              htmlFor={`smallBeds-${room.id}`}
              sm={labelSmSize}
              className="text-nowrap pr-0"
            >
              Number of small beds
            </Label>
            <Col sm={inputSmSize}>
              <Input
                type="select"
                name="smallBeds"
                id={`smallBeds-${room.id}`}
                value={room.smallBeds}
                onChange={handleSelectChange}
              >
                {bedCountOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Input>
              {room.validationStates.smallBedsState === "has-danger" && (
                <small className="text-danger d-block mt-1">Required.</small>
              )}
            </Col>
          </FormGroup>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md="6">
          <FormGroup
            row
            className={`mb-md-0 ${classnames(
              room.validationStates.sofaBedsState
            )}`}
          >
            <Label
              htmlFor={`sofaBeds-${room.id}`}
              sm={labelSmSize}
              className="text-nowrap pr-0"
            >
              Number of sofa beds
            </Label>
            <Col sm={inputSmSize}>
              <Input
                type="select"
                name="sofaBeds"
                id={`sofaBeds-${room.id}`}
                value={room.sofaBeds}
                onChange={handleSelectChange}
              >
                {bedCountOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Input>
              {room.validationStates.sofaBedsState === "has-danger" && (
                <small className="text-danger d-block mt-1">Required.</small>
              )}
            </Col>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup
            row
            className={`mb-0 ${classnames(
              room.validationStates.averageBedsState
            )}`}
          >
            <Label
              htmlFor={`averageBeds-${room.id}`}
              sm={labelSmSize}
              className="text-nowrap pr-0"
            >
              Number of average size beds
            </Label>
            <Col sm={inputSmSize}>
              <Input
                type="select"
                name="averageBeds"
                id={`averageBeds-${room.id}`}
                value={room.averageBeds}
                onChange={handleSelectChange}
              >
                {bedCountOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Input>
              {room.validationStates.averageBedsState === "has-danger" && (
                <small className="text-danger d-block mt-1">Required.</small>
              )}
            </Col>
          </FormGroup>
        </Col>
      </Row>

      <Row className="mb-1">
        <Col md="6">
          <FormGroup row className="mb-md-0">
            <Label sm={labelSmSize} className="text-nowrap pr-0">
              Are pets allowed?
            </Label>
            <Col sm={inputSmSize} className="pt-1">
              <CustomInput
                type="radio"
                id={`petsAllowedYes-${room.id}`}
                name={`petsAllowed-${room.id}`}
                label="Yes"
                inline
                checked={room.petsAllowed === true}
                onChange={() => handleRadioToggle("petsAllowed", true)}
              />
              <CustomInput
                type="radio"
                id={`petsAllowedNo-${room.id}`}
                name={`petsAllowed-${room.id}`}
                label="No"
                inline
                checked={room.petsAllowed === false}
                onChange={() => handleRadioToggle("petsAllowed", false)}
              />
            </Col>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup row className="mb-0">
            <Label sm={labelSmSize} className="text-nowrap pr-0">
              is breakfast served?
            </Label>
            <Col sm={inputSmSize} className="pt-1">
              <CustomInput
                type="radio"
                id={`breakfastServedYes-${room.id}`}
                name={`breakfastServed-${room.id}`}
                label="Yes"
                inline
                checked={room.breakfastServed === true}
                onChange={() => handleRadioToggle("breakfastServed", true)}
              />
              <CustomInput
                type="radio"
                id={`breakfastServedNo-${room.id}`}
                name={`breakfastServed-${room.id}`}
                label="No"
                inline
                checked={room.breakfastServed === false}
                onChange={() => handleRadioToggle("breakfastServed", false)}
              />
            </Col>
          </FormGroup>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md="6">
          <FormGroup row className="mb-md-0">
            <Label sm={labelSmSize} className="text-nowrap pr-0">
              Prepayment for the room?
            </Label>
            <Col sm={inputSmSize} className="pt-1">
              <CustomInput
                type="radio"
                id={`prepaymentYes-${room.id}`}
                name={`prepayment-${room.id}`}
                label="Yes"
                inline
                checked={room.prepayment === true}
                onChange={() => handleRadioToggle("prepayment", true)}
              />
              <CustomInput
                type="radio"
                id={`prepaymentNo-${room.id}`}
                name={`prepayment-${room.id}`}
                label="No"
                inline
                checked={room.prepayment === false}
                onChange={() => handleRadioToggle("prepayment", false)}
              />
            </Col>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup row className="mb-0">
            <Label sm={labelSmSize} className="text-nowrap pr-0">
              Free cancellation state?
            </Label>
            <Col sm={inputSmSize} className="pt-1">
              <CustomInput
                type="radio"
                id={`freeCancellationYes-${room.id}`}
                name={`freeCancellation-${room.id}`}
                label="Yes"
                inline
                checked={room.freeCancellation === true}
                onChange={() => handleRadioToggle("freeCancellation", true)}
              />
              <CustomInput
                type="radio"
                id={`freeCancellationNo-${room.id}`}
                name={`freeCancellation-${room.id}`}
                label="No"
                inline
                checked={room.freeCancellation === false}
                onChange={() => handleRadioToggle("freeCancellation", false)}
              />
            </Col>
          </FormGroup>
        </Col>
      </Row>

      <h5 className="text-uppercase text-muted mt-4 mb-3 font-weight-bold">
        Other room benefits
      </h5>
      <Row>
        {Object.keys(room.benefits).map((key, index) => (
          <Col md="3" sm="6" xs="12" key={key} className="mb-2">
            <CustomInput
              type="checkbox"
              id={`benefit-${key}-${room.id}`}
              name={key}
              label={
                <span className="facility-label-small">
                  {roomBenefitLabels[index]}
                </span>
              }
              checked={room.benefits[key]}
              onChange={handleBenefitChange}
            />
          </Col>
        ))}
      </Row>

      {/* --- END COMPLETED FORM FIELDS --- */}

      <h5 className="text-uppercase text-muted mt-4 mb-3 font-weight-bold">
        Room image
      </h5>
      <Row className="justify-content-center text-center">
        <Col lg="6" md="8">
          <ImageUpload
            onFileChange={(file) => onRoomImageSelected(roomIndex, file)}
            addBtnText="SELECT IMAGE"
            changeBtnText="Change Image"
            addBtnClasses="btn-primary btn-round"
            changeBtnClasses="btn-outline-primary btn-round"
            removeBtnClasses="btn-danger btn-simple btn-round"
          />
          {!room.roomImageFile && submitted && (
            <small className="text-danger d-block mt-1">
              Room image is required.
            </small>
          )}
        </Col>
      </Row>
    </div>
  );
};
export default RoomForm;
