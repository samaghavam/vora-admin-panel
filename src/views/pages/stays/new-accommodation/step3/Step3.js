import React from "react";
import {
  Row,
  Col,
  FormGroup,
  Label,
  Button,
  CustomInput,
  Input,
} from "reactstrap";
import ImageUpload from "components/CustomUpload/ImageUpload.js";

const Step3 = React.forwardRef((props, ref) => {
  const [step3Data, setStep3Data] = React.useState({
    highlightFeatures: (() => {
      const initialFeatures = {};
      for (let i = 1; i <= 20; i++) initialFeatures[`feature${i}`] = false;
      return initialFeatures;
    })(),
    coverImageFile: null,
    hotelImages: Array(12).fill(null),
    extraFeatures: [{ id: Date.now(), name: "", price: "" }],
  });

  // State to track if validation has been attempted
  const [submitted, setSubmitted] = React.useState(false);

  // Ref to hold the latest state, preventing stale state bugs with parent wizard
  const stateRef = React.useRef(step3Data);
  React.useEffect(() => {
    stateRef.current = step3Data;
  });

  const handleFeatureChange = (event) => {
    const { name, checked } = event.target;
    setStep3Data((prev) => ({
      ...prev,
      highlightFeatures: { ...prev.highlightFeatures, [name]: checked },
    }));
  };

  const handleCoverImageSelected = (file) => {
    setStep3Data((prev) => ({ ...prev, coverImageFile: file }));
  };

  // Handler for the grid of hotel images
  const handleHotelImageSelected = (index, file) => {
    setStep3Data((prev) => {
      const newHotelImages = [...prev.hotelImages];
      newHotelImages[index] = file;
      return { ...prev, hotelImages: newHotelImages };
    });
  };

  // Handler for extra feature inputs
  const handleExtraFeatureChange = (index, event) => {
    const { name, value } = event.target;
    setStep3Data((prev) => {
      const newExtraFeatures = [...prev.extraFeatures];
      newExtraFeatures[index][name] = value;
      return { ...prev, extraFeatures: newExtraFeatures };
    });
  };

  // Handler to add a new extra feature row
  const handleAddExtraFeature = () => {
    setStep3Data((prev) => ({
      ...prev,
      extraFeatures: [
        ...prev.extraFeatures,
        { id: Date.now(), name: "", price: "" },
      ],
    }));
  };

  // Handler to remove an extra feature row by its unique id
  const handleRemoveExtraFeature = (id) => {
    if (step3Data.extraFeatures.length <= 1) return; 
    setStep3Data((prev) => ({
      ...prev,
      extraFeatures: prev.extraFeatures.filter((feature) => feature.id !== id),
    }));
  };

  const featureLabels = Array(20).fill("Upper floors accessible by elevator");
  const featureKeys = Object.keys(step3Data.highlightFeatures);

  React.useImperativeHandle(ref, () => ({
    isValidated: () => {
      setSubmitted(true);
      const currentData = stateRef.current;

      const atLeastOneFeatureSelected = Object.values(
        currentData.highlightFeatures
      ).some((v) => v === true);
      const coverImageIsSelected = !!currentData.coverImageFile;
      const atLeastOneHotelImageSelected = currentData.hotelImages.some(
        (img) => img !== null
      );
      const extraFeatureIsValid = currentData.extraFeatures.every(
        (feat) => (feat.name && feat.price) || (!feat.name && !feat.price)
      );

      if (
        !atLeastOneFeatureSelected ||
        !coverImageIsSelected ||
        !atLeastOneHotelImageSelected ||
        !extraFeatureIsValid
      ) {
        console.error("Validation Failed on Step 3.");
        return false;
      }

      return true;
    },
    getStepData: () => {
      const currentData = stateRef.current;
      return {
        highlightFeatures: Object.keys(currentData.highlightFeatures).filter(
          (key) => currentData.highlightFeatures[key]
        ),
        coverImage: currentData.coverImageFile,
        hotelImages: currentData.hotelImages.filter((file) => file !== null),
        extraFeatures: currentData.extraFeatures.filter(
          (feat) => feat.name && feat.price
        ),
      };
    },
  }));

  return (
    <div>
      <h5 className="text-uppercase text-muted mt-4 mb-3 font-weight-bold">
        Highlight features
      </h5>
      <Row>
        {featureKeys.map((key, index) => (
          <Col md="3" sm="6" xs="12" key={key} className="mb-2">
            <CustomInput
              type="checkbox"
              id={`feature-${key}`}
              name={key}
              label={
                <span className="facility-label-small">
                  {featureLabels[index]}
                </span>
              }
              checked={step3Data.highlightFeatures[key]}
              onChange={handleFeatureChange}
            />
          </Col>
        ))}
      </Row>
      {submitted &&
        !Object.values(step3Data.highlightFeatures).some((v) => v === true) && (
          <div className="text-danger mt-2">
            <small>Please select at least one highlight feature.</small>
          </div>
        )}

      <h5 className="text-uppercase text-muted mt-4 mb-3 font-weight-bold">
        Cover image
      </h5>
      <Row className="justify-content-center text-center">
        <Col lg="6" md="8">
          <ImageUpload
            onFileChange={handleCoverImageSelected}
            changeBtnClasses="btn-simple"
            addBtnClasses="btn-simple"
            removeBtnClasses="btn-simple"
          />
          {submitted && !step3Data.coverImageFile && (
            <div className="text-danger mt-2">
              <small>Cover image is required.</small>
            </div>
          )}
        </Col>
      </Row>

      <h5 className="text-uppercase text-muted mt-4 mb-3 font-weight-bold">
        Hotel image
      </h5>
      <Row>
        {step3Data.hotelImages.map((file, index) => (
          <Col
            md="3"
            sm="6"
            xs="12"
            key={`hotel-image-${index}`}
            className="mb-4 text-center"
          >
            <ImageUpload
              onFileChange={(selectedFile) =>
                handleHotelImageSelected(index, selectedFile)
              }
              changeBtnClasses="btn-simple"
              addBtnClasses="btn-simple"
              removeBtnClasses="btn-simple"
            />
          </Col>
        ))}
      </Row>
      {submitted && !step3Data.hotelImages.some((img) => img !== null) && (
        <div className="text-danger mt-2 text-center">
          <small>Please upload at least one hotel image.</small>
        </div>
      )}

      <h5 className="text-uppercase text-muted mt-4 mb-3 font-weight-bold">
        Extra features
      </h5>
      {step3Data.extraFeatures.map((feature, index) => (
        <Row key={feature.id} className="align-items-center mb-3">
          <Col>
            <FormGroup>
              <Label htmlFor={`extraFeatureName-${index}`}>Extra feature</Label>
              <Input
                type="text"
                name="name"
                id={`extraFeatureName-${index}`}
                placeholder="Text"
                value={feature.name}
                onChange={(e) => handleExtraFeatureChange(index, e)}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label htmlFor={`extraFeaturePrice-${index}`}>Price</Label>
              <Input
                type="text"
                name="price"
                id={`extraFeaturePrice-${index}`}
                placeholder="Text"
                value={feature.price}
                onChange={(e) => handleExtraFeatureChange(index, e)}
              />
            </FormGroup>
          </Col>
          <Col xs="auto" className="pl-0">
            {step3Data.extraFeatures.length > 1 && (
              <Button
                color="danger"
                className="btn-link btn-icon"
                onClick={() => handleRemoveExtraFeature(feature.id)}
                title="Remove feature"
                style={{ marginTop: "1rem" }}
              >
                <i className="tim-icons icon-simple-remove" />
              </Button>
            )}
          </Col>
        </Row>
      ))}
      <Row>
        <Col>
          <Button
            color="dark"
            onClick={handleAddExtraFeature}
            className="mt-2 d-flex align-items-center"
          >
            <i className="tim-icons icon-simple-add mr-2" /> Add Extra feature
          </Button>
        </Col>
      </Row>
    </div>
  );
});

Step3.displayName = "Step3";

export default Step3;
