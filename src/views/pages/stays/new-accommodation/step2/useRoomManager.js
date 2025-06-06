import React from "react";

const useRoomManager = () => {
  const getNewRoomObject = () => ({
    id: Date.now() + Math.random(), // More robust unique ID for keys
    roomName: "", pricePerNight: "", capacity: "",
    childrenFree: null, petsAllowed: null, breakfastServed: null,
    prepayment: null, freeCancellation: null,
    largeBeds: "", smallBeds: "", sofaBeds: "", averageBeds: "",
    benefits: (() => {
      const initialBenefits = {};
      for (let i = 1; i <= 20; i++) initialBenefits[`benefit${i}`] = false;
      return initialBenefits;
    })(),
    roomImageFile: null,
    validationStates: {
        roomNameState: "", pricePerNightState: "", capacityState: "",
        largeBedsState: "", smallBedsState: "", sofaBedsState: "", averageBedsState: ""
    }
  });

  const [rooms, setRooms] = React.useState([getNewRoomObject()]);

  const handleRoomChange = React.useCallback((index, field, value) => {
    const updatedRooms = [...rooms];
    if (field === 'benefits') {
        updatedRooms[index].benefits = value;
    } else {
        updatedRooms[index][field] = value;
    }
    setRooms(updatedRooms);
  }, [rooms]);
  
  const handleRoomImageSelected = React.useCallback((index, file) => {
    const updatedRooms = [...rooms];
    updatedRooms[index].roomImageFile = file;
    setRooms(updatedRooms);
  }, [rooms]);

  const addNewRoom = () => {
    setRooms(prevRooms => [...prevRooms, getNewRoomObject()]);
  };

  const removeRoom = (id) => {
    if (window.confirm("Are you sure you want to remove this room?")) {
        setRooms(prevRooms => prevRooms.filter(room => room.id !== id));
    }
  };

  return {
    rooms,
    setRooms, // Exposing setRooms for validation state updates
    addNewRoom,
    removeRoom,
    handleRoomChange,
    handleRoomImageSelected,
  };
};
export default useRoomManager