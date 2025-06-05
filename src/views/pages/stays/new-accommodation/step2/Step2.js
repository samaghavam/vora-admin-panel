import React from "react";
import classnames from "classnames";
import {
  Input,
  Row,
  Col,
  FormGroup,
  Label,
  CustomInput, 
} from "reactstrap";
import ImageUpload from "components/CustomUpload/ImageUpload.js"; 

const Step2 = React.forwardRef((props, ref) => {
  // --- States for Step 2: Room Info ---
  const [roomName, setRoomName] = React.useState("");
  const [roomNameState, setRoomNameState] = React.useState("");

  const [pricePerNight, setPricePerNight] = React.useState("");
  const [pricePerNightState, setPricePerNightState] = React.useState("");

  const [capacity, setCapacity] = React.useState("");
  const [capacityState, setCapacityState] = React.useState("");

  const [childrenFree, setChildrenFree] = React.useState(null); 

  const [largeBeds, setLargeBeds] = React.useState("");
  const [smallBeds, setSmallBeds] = React.useState("");
  const [sofaBeds, setSofaBeds] = React.useState("");
  const [averageBeds, setAverageBeds] = React.useState("");
  const [largeBedsState, setLargeBedsState] = React.useState("");
  const [smallBedsState, setSmallBedsState] = React.useState("");
  const [sofaBedsState, setSofaBedsState] = React.useState("");
  const [averageBedsState, setAverageBedsState] = React.useState("");

  const [petsAllowed, setPetsAllowed] = React.useState(null);
  const [breakfastServed, setBreakfastServed] = React.useState(null);
  const [prepayment, setPrepayment] = React.useState(null);
  const [freeCancellation, setFreeCancellation] = React.useState(null);

  const initialRoomBenefits = {};
  const roomBenefitLabels = [];
  for (let i = 1; i <= 20; i++) {
    initialRoomBenefits[`benefit${i}`] = false;
    roomBenefitLabels.push("Upper floors accessible by elevator"); 
  }
  const [roomBenefits, setRoomBenefits] = React.useState(initialRoomBenefits);

  // State to store the file selected by ImageUpload component
  const [roomImageFile, setRoomImageFile] = React.useState(null); 
  // Removed roomImagePreview and roomImageInputRef as ImageUpload should handle its own preview & input

  const handleTextChange = (event, setter, stateSetter, minLength = 1, isNumeric = false) => {
    let { value } = event.target;
    if (isNumeric) {
      if (value !== "" && !/^\d*\.?\d*$/.test(value)) {
        return; 
      }
    }
    setter(value);
    if (value.length >= minLength) {
      if (isNumeric && parseFloat(value) < 0) { 
        stateSetter("has-danger");
      } else {
        stateSetter("has-success");
      }
    } else {
      stateSetter("has-danger");
    }
  };
  
  const handleSelectChange = (event, setter, stateSetter) => {
    const { value } = event.target;
    setter(value);
    if (value || value === "0") { 
      stateSetter("has-success");
    } else {
      stateSetter("has-danger");
    }
  };

  const handleRadioToggle = (setter, value) => {
    setter(value);
  };

  const handleBenefitChange = (event) => {
    setRoomBenefits({
      ...roomBenefits,
      [event.target.name]: event.target.checked,
    });
  };

  // Callback for ImageUpload component
  // Assuming ImageUpload component calls this with the selected file or null
  const handleRoomImageSelected = (file) => {
    setRoomImageFile(file);
  };


  React.useImperativeHandle(ref, () => ({
    isValidated: () => {
      let valid = true;
      if (!roomName) { setRoomNameState("has-danger"); valid = false; } 
      else { setRoomNameState("has-success"); }
      if (!pricePerNight || parseFloat(pricePerNight) <= 0) { setPricePerNightState("has-danger"); valid = false; } 
      else { setPricePerNightState("has-success"); }
      if (!capacity) { setCapacityState("has-danger"); valid = false; } 
      else { setCapacityState("has-success"); }
      if(largeBeds === "") { setLargeBedsState("has-danger"); valid = false; } else { setLargeBedsState("has-success");}
      if(smallBeds === "") { setSmallBedsState("has-danger"); valid = false; } else { setSmallBedsState("has-success");}
      if(sofaBeds === "") { setSofaBedsState("has-danger"); valid = false; } else { setSofaBedsState("has-success");}
      if(averageBeds === "") { setAverageBedsState("has-danger"); valid = false; } else { setAverageBedsState("has-success");}
      
      // Basic validation for Yes/No toggles (assuming they are required)
      if (childrenFree === null) { valid = false; /* Add visual feedback if needed */ } 
      if (petsAllowed === null) { valid = false; }
      if (breakfastServed === null) { valid = false; }
      if (prepayment === null) { valid = false; }
      if (freeCancellation === null) { valid = false; }

      if (roomImageFile === null) { // Check if an image was selected via ImageUpload
        valid = false; 
      }
      return valid;
    },
    getStepData: () => {
      return {
        roomName,
        pricePerNight: parseFloat(pricePerNight) || 0,
        capacity: parseInt(capacity) || 0,
        childrenFree,
        beds: {
          large: parseInt(largeBeds) || 0,
          small: parseInt(smallBeds) || 0,
          sofa: parseInt(sofaBeds) || 0,
          average: parseInt(averageBeds) || 0,
        },
        petsAllowed,
        breakfastServed,
        prepayment,
        freeCancellation,
        benefits: roomBenefits, 
        roomImage: roomImageFile, // This should now be the File object from ImageUpload
      };
    }
  }));

  const bedCountOptions = [
    { value: "", label: "Choose number" }, { value: "0", label: "0" },
    { value: "1", label: "1" }, { value: "2", label: "2" },
    { value: "3", label: "3" }, { value: "4", label: "4" },
    { value: "5", label: "5+" },
  ];
   const capacityOptions = [
    { value: "", label: "Select the capacity" }, { value: "1", label: "1 Adult" },
    { value: "2", label: "2 Adults" }, { value: "3", label: "3 Adults" },
    { value: "4", label: "4 Adults" }, { value: "5", label: "5+ Adults" },
  ];

  const labelSmSize = 5; 
  const inputSmSize = 7;

  return (
    <>
      {/* Removed hidden file input for room image, ImageUpload handles this */}

      <h5 className="text-uppercase text-muted mt-4 mb-4 font-weight-bold">Room info</h5>
      
      <Row className="mb-3">
        <Col md="6">
          <FormGroup row className={`mb-md-0 ${classnames(roomNameState)}`}>
            <Label htmlFor="roomName" sm={labelSmSize} className="text-nowrap pr-0">Room Name</Label>
            <Col sm={inputSmSize}>
              <Input
                type="text" name="roomName" id="roomName" placeholder="Text"
                value={roomName} onChange={(e) => handleTextChange(e, setRoomName, setRoomNameState)}
              />
              {roomNameState === "has-danger" && (<small className="text-danger d-block mt-1">Room name is required.</small>)}
            </Col>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup row className={`mb-0 ${classnames(pricePerNightState)}`}>
            <Label htmlFor="pricePerNight" sm={labelSmSize} className="text-nowrap pr-0">Price Per night for one person</Label>
            <Col sm={inputSmSize}>
              <Input
                type="text" name="pricePerNight" id="pricePerNight" placeholder="Text"
                value={pricePerNight} onChange={(e) => handleTextChange(e, setPricePerNight, setPricePerNightState, 1, true)}
              />
              {pricePerNightState === "has-danger" && (<small className="text-danger d-block mt-1">Enter a valid price.</small>)}
            </Col>
          </FormGroup>
        </Col>
      </Row>

      <Row className="mb-3 align-items-center">
        <Col md="6">
          <FormGroup row className={`mb-md-0 ${classnames(capacityState)}`}>
            <Label htmlFor="capacity" sm={labelSmSize} className="text-nowrap pr-0">Capacity</Label>
            <Col sm={inputSmSize}>
              <Input type="select" name="capacity" id="capacity" value={capacity} onChange={(e) => handleSelectChange(e, setCapacity, setCapacityState)}>
                {capacityOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </Input>
              {capacityState === "has-danger" && (<small className="text-danger d-block mt-1">Please select capacity.</small>)}
            </Col>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup row className="mb-0">
            <Label sm={labelSmSize} className="text-nowrap pr-0">is children free?</Label>
            <Col sm={inputSmSize} className="pt-1">
              <CustomInput type="radio" id="childrenFreeYes" name="childrenFree" label="Yes" inline checked={childrenFree === true} onChange={() => handleRadioToggle(setChildrenFree, true)} />
              <CustomInput type="radio" id="childrenFreeNo" name="childrenFree" label="No" inline checked={childrenFree === false} onChange={() => handleRadioToggle(setChildrenFree, false)} />
              {(childrenFree === null && props.submitted) && (<small className="text-danger d-block mt-1">Please select an option.</small>)}
            </Col>
          </FormGroup>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md="6">
          <FormGroup row className={`mb-md-0 ${classnames(largeBedsState)}`}>
            <Label htmlFor="largeBeds" sm={labelSmSize} className="text-nowrap pr-0">Number of large beds</Label>
            <Col sm={inputSmSize}>
              <Input type="select" name="largeBeds" id="largeBeds" value={largeBeds} onChange={(e) => handleSelectChange(e, setLargeBeds, setLargeBedsState)}>
                {bedCountOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </Input>
              {largeBedsState === "has-danger" && (<small className="text-danger d-block mt-1">Required.</small>)}
            </Col>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup row className={`mb-0 ${classnames(smallBedsState)}`}>
            <Label htmlFor="smallBeds" sm={labelSmSize} className="text-nowrap pr-0">Number of small beds</Label>
            <Col sm={inputSmSize}>
              <Input type="select" name="smallBeds" id="smallBeds" value={smallBeds} onChange={(e) => handleSelectChange(e, setSmallBeds, setSmallBedsState)}>
                {bedCountOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </Input>
              {smallBedsState === "has-danger" && (<small className="text-danger d-block mt-1">Required.</small>)}
            </Col>
          </FormGroup>
        </Col>
      </Row>
      <Row className="mb-4">
         <Col md="6">
          <FormGroup row className={`mb-md-0 ${classnames(sofaBedsState)}`}>
            <Label htmlFor="sofaBeds" sm={labelSmSize} className="text-nowrap pr-0">Number of sofa beds</Label>
            <Col sm={inputSmSize}>
              <Input type="select" name="sofaBeds" id="sofaBeds" value={sofaBeds} onChange={(e) => handleSelectChange(e, setSofaBeds, setSofaBedsState)}>
                {bedCountOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </Input>
              {sofaBedsState === "has-danger" && (<small className="text-danger d-block mt-1">Required.</small>)}
            </Col>
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup row className={`mb-0 ${classnames(averageBedsState)}`}>
            <Label htmlFor="averageBeds" sm={labelSmSize} className="text-nowrap pr-0">Number of average size beds</Label>
            <Col sm={inputSmSize}>
              <Input type="select" name="averageBeds" id="averageBeds" value={averageBeds} onChange={(e) => handleSelectChange(e, setAverageBeds, setAverageBedsState)}>
                {bedCountOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </Input>
              {averageBedsState === "has-danger" && (<small className="text-danger d-block mt-1">Required.</small>)}
            </Col>
          </FormGroup>
        </Col>
      </Row>
      
      <Row className="mb-1">
        <Col md="6">
          <FormGroup row className="mb-md-0">
            <Label sm={labelSmSize} className="text-nowrap pr-0">Are pets allowed?</Label>
            <Col sm={inputSmSize} className="pt-1">
              <CustomInput type="radio" id="petsAllowedYes" name="petsAllowed" label="Yes" inline checked={petsAllowed === true} onChange={() => handleRadioToggle(setPetsAllowed, true)} />
              <CustomInput type="radio" id="petsAllowedNo" name="petsAllowed" label="No" inline checked={petsAllowed === false} onChange={() => handleRadioToggle(setPetsAllowed, false)} />
              {(petsAllowed === null && props.submitted) && (<small className="text-danger d-block mt-1">Required.</small>)}
            </Col>
          </FormGroup>
        </Col>
         <Col md="6">
          <FormGroup row className="mb-0">
            <Label sm={labelSmSize} className="text-nowrap pr-0">is breakfast served?</Label>
            <Col sm={inputSmSize} className="pt-1">
              <CustomInput type="radio" id="breakfastServedYes" name="breakfastServed" label="Yes" inline checked={breakfastServed === true} onChange={() => handleRadioToggle(setBreakfastServed, true)} />
              <CustomInput type="radio" id="breakfastServedNo" name="breakfastServed" label="No" inline checked={breakfastServed === false} onChange={() => handleRadioToggle(setBreakfastServed, false)} />
              {(breakfastServed === null && props.submitted) && (<small className="text-danger d-block mt-1">Required.</small>)}
            </Col>
          </FormGroup>
        </Col>
      </Row>
       <Row className="mb-4">
        <Col md="6">
          <FormGroup row className="mb-md-0">
            <Label sm={labelSmSize} className="text-nowrap pr-0">Prepayment for the room?</Label>
            <Col sm={inputSmSize} className="pt-1">
              <CustomInput type="radio" id="prepaymentYes" name="prepayment" label="Yes" inline checked={prepayment === true} onChange={() => handleRadioToggle(setPrepayment, true)} />
              <CustomInput type="radio" id="prepaymentNo" name="prepayment" label="No" inline checked={prepayment === false} onChange={() => handleRadioToggle(setPrepayment, false)} />
              {(prepayment === null && props.submitted) && (<small className="text-danger d-block mt-1">Required.</small>)}
            </Col>
          </FormGroup>
        </Col>
         <Col md="6">
          <FormGroup row className="mb-0">
            <Label sm={labelSmSize} className="text-nowrap pr-0">Free cancellation state?</Label>
            <Col sm={inputSmSize} className="pt-1">
              <CustomInput type="radio" id="freeCancellationYes" name="freeCancellation" label="Yes" inline checked={freeCancellation === true} onChange={() => handleRadioToggle(setFreeCancellation, true)} />
              <CustomInput type="radio" id="freeCancellationNo" name="freeCancellation" label="No" inline checked={freeCancellation === false} onChange={() => handleRadioToggle(setFreeCancellation, false)} />
              {(freeCancellation === null && props.submitted) && (<small className="text-danger d-block mt-1">Required.</small>)}
            </Col>
          </FormGroup>
        </Col>
      </Row>

      <h5 className="text-uppercase text-muted mt-4 mb-3 font-weight-bold">Other room benefits</h5>
      <Row>
        {Object.keys(roomBenefits).map((key, index) => (
          <Col md="3" sm="6" xs="12" key={key} className="mb-2">
            <CustomInput 
                type="checkbox" 
                id={`benefit-${key}`}
                name={key}
                label={<span className="facility-label-small">{roomBenefitLabels[index]}</span>} 
                checked={roomBenefits[key]}
                onChange={handleBenefitChange} 
              />
          </Col>
        ))}
      </Row>

      <h5 className="text-uppercase text-muted mt-4 mb-3 font-weight-bold">Room image</h5>
      <Row className="justify-content-center text-center">
        <Col lg="6" md="8"> 
          <ImageUpload
            onFileChange={handleRoomImageSelected} 
            addBtnText="SELECT IMAGE" 
            changeBtnText="Change Image" 
            addBtnClasses="btn-primary btn-round" 
            changeBtnClasses="btn-outline-primary btn-round"
            removeBtnClasses="btn-danger btn-simple btn-round"
          />
           {(roomImageFile === null && props.submitted) && (<small className="text-danger d-block mt-1">Room image is required.</small>)}
        </Col>
      </Row>
    </>
  );
});

export default Step2;

