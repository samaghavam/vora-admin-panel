import React from "react";
import { Row, Col, Button } from "reactstrap";
import RoomForm from "./RoomForm";
import useRoomManager from "./useRoomManager";

const Step2 = React.forwardRef((props, ref) => {
  const {
    rooms,
    setRooms,
    addNewRoom,
    removeRoom,
    handleRoomChange,
    handleRoomImageSelected,
  } = useRoomManager();
  const [submitted, setSubmitted] = React.useState(false); 

  const isValidated = () => {
    setSubmitted(true); 
    let allFormsValid = true;

    const validatedRooms = rooms.map((room) => {
      let newValidationStates = { ...room.validationStates };
      let roomIsValid = true;

      if (!room.roomName) {
        newValidationStates.roomNameState = "has-danger";
        roomIsValid = false;
      } else {
        newValidationStates.roomNameState = "has-success";
      }
      if (!room.pricePerNight || parseFloat(room.pricePerNight) <= 0) {
        newValidationStates.pricePerNightState = "has-danger";
        roomIsValid = false;
      } else {
        newValidationStates.pricePerNightState = "has-success";
      }
      if (!room.capacity) {
        newValidationStates.capacityState = "has-danger";
        roomIsValid = false;
      } else {
        newValidationStates.capacityState = "has-success";
      }
      if (room.largeBeds === "") {
        newValidationStates.largeBedsState = "has-danger";
        roomIsValid = false;
      } else {
        newValidationStates.largeBedsState = "has-success";
      }
      if (room.smallBeds === "") {
        newValidationStates.smallBedsState = "has-danger";
        roomIsValid = false;
      } else {
        newValidationStates.smallBedsState = "has-success";
      }
      if (room.sofaBeds === "") {
        newValidationStates.sofaBedsState = "has-danger";
        roomIsValid = false;
      } else {
        newValidationStates.sofaBedsState = "has-success";
      }
      if (room.averageBeds === "") {
        newValidationStates.averageBedsState = "has-danger";
        roomIsValid = false;
      } else {
        newValidationStates.averageBedsState = "has-success";
      }
      if (room.childrenFree === null) {
        roomIsValid = false;
      }
      if (!room.roomImageFile) {
        roomIsValid = false;
      }
      if (room.petsAllowed === null) {
        roomIsValid = false;
      }
      if (room.breakfastServed === null) {
        roomIsValid = false;
      }
      if (room.prepayment === null) {
        roomIsValid = false;
      }
      if (room.freeCancellation === null) {
        roomIsValid = false;
      }

      if (!roomIsValid) allFormsValid = false;

      return { ...room, validationStates: newValidationStates };
    });

    setRooms(validatedRooms); 
    return allFormsValid;
  };

  React.useImperativeHandle(ref, () => ({
    isValidated: isValidated,
    getStepData: () => {
      return {
        rooms: rooms.map((room) => ({
          roomName: room.roomName,
          pricePerNight: parseFloat(room.pricePerNight) || 0,
          capacity: parseInt(room.capacity) || 0,
          childrenFree: room.childrenFree,
          beds: {
            large: parseInt(room.largeBeds) || 0,
            small: parseInt(room.smallBeds) || 0,
            sofa: parseInt(room.sofaBeds) || 0,
            average: parseInt(room.averageBeds) || 0,
          },
          petsAllowed: room.petsAllowed,
          breakfastServed: room.breakfastServed,
          prepayment: room.prepayment,
          freeCancellation: room.freeCancellation,
          benefits: Object.keys(room.benefits).filter(
            (key) => room.benefits[key]
          ),
          roomImage: room.roomImageFile,
        })),
      };
    },
  }));

  return (
    <>
      {rooms.map((room, index) => (
        <RoomForm
          key={room.id}
          room={room}
          roomIndex={index}
          onRoomChange={handleRoomChange}
          onRoomImageSelected={handleRoomImageSelected}
          onRemoveRoom={removeRoom}
          isOnlyRoom={rooms.length === 1}
          submitted={submitted}
        />
      ))}
      <Row className="justify-content-center">
        <Col md="6" className="text-center">
          <Button
            color="dark"
            onClick={addNewRoom}
            className="mt-3 d-flex align-items-center justify-content-center"
            block
          >
            <i className="tim-icons icon-simple-add mr-2" /> Add new room
          </Button>
        </Col>
      </Row>
    </>
  );
});

export default Step2;
