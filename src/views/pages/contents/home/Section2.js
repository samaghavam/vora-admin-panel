import ImageUpload from "components/CustomUpload/ImageUpload";
import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const Section2 = forwardRef((props, ref) => {
  // State for text inputs
  const [titleH1, setTitleH1] = useState("");
  const [titleH1Smaller, setTitleH1Smaller] = useState("");
  const [subtextH2, setSubtextH2] = useState("");
  const [image1Title, setImage1Title] = useState("");
  const [image1SmallText, setImage1SmallText] = useState("");
  const [image2Title, setImage2Title] = useState("");
  const [image2SmallText, setImage2SmallText] = useState("");
  const [image3Title, setImage3Title] = useState("");
  const [image3SmallText, setImage3SmallText] = useState("");

  // State for file inputs
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  // State for validation
  const [titleH1State, setTitleH1State] = useState("");
  const [titleH1SmallerState, setTitleH1SmallerState] = useState("");
  const [subtextH2State, setSubtextH2State] = useState("");
  const [image1TitleState, setImage1TitleState] = useState("");
  const [image1SmallTextState, setImage1SmallTextState] = useState("");
  const [image2TitleState, setImage2TitleState] = useState("");
  const [image2SmallTextState, setImage2SmallTextState] = useState("");
  const [image3TitleState, setImage3TitleState] = useState("");
  const [image3SmallTextState, setImage3SmallTextState] = useState("");
  const [image1State, setImage1State] = useState("");
  const [image2State, setImage2State] = useState("");
  const [image3State, setImage3State] = useState("");

  // Expose functions to parent component
  useImperativeHandle(ref, () => ({
    validate: () => {
      return validateFields();
    },
    getData: () => ({
      titleH1,
      titleH1Smaller,
      subtextH2,
      image1,
      image1Title,
      image1SmallText,
      image2,
      image2Title,
      image2SmallText,
      image3,
      image3Title,
      image3SmallText,
    }),
  }));

  const verifyLength = (value) => {
    if (typeof value === 'string') {
        return value.trim().length > 0;
    }
    return value !== null;
  };

  const validateFields = () => {
    let isValid = true;
    const fieldsToValidate = {
        setTitleH1State: verifyLength(titleH1),
        setTitleH1SmallerState: verifyLength(titleH1Smaller),
        setSubtextH2State: verifyLength(subtextH2),
        setImage1TitleState: verifyLength(image1Title),
        setImage1SmallTextState: verifyLength(image1SmallText),
        setImage2TitleState: verifyLength(image2Title),
        setImage2SmallTextState: verifyLength(image2SmallText),
        setImage3TitleState: verifyLength(image3Title),
        setImage3SmallTextState: verifyLength(image3SmallText),
        setImage1State: verifyLength(image1),
        setImage2State: verifyLength(image2),
        setImage3State: verifyLength(image3),
    };

    const stateSetters = {
        setTitleH1State, setTitleH1SmallerState, setSubtextH2State, setImage1TitleState,
        setImage1SmallTextState, setImage2TitleState, setImage2SmallTextState, setImage3TitleState,
        setImage3SmallTextState, setImage1State, setImage2State, setImage3State
    };

    for (const [setterName, result] of Object.entries(fieldsToValidate)) {
        stateSetters[setterName](result ? "has-success" : "has-danger");
        if (!result) isValid = false;
    }

    return isValid;
  };
  
  // Generic change handler to clear validation state
  const handleInputChange = (setter, stateSetter, value) => {
    setter(value);
    stateSetter("");
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Section 2</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md="6">
            <FormGroup className={`has-label ${titleH1State}`}>
              <Label>Title H1</Label>
              <Input
                type="text"
                value={titleH1}
                onChange={(e) => handleInputChange(setTitleH1, setTitleH1State, e.target.value)}
              />
              {titleH1State === "has-danger" && <Label className="error">This field is required.</Label>}
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup className={`has-label ${titleH1SmallerState}`}>
              <Label>Title H1 - smaller</Label>
              <Input
                type="text"
                value={titleH1Smaller}
                 onChange={(e) => handleInputChange(setTitleH1Smaller, setTitleH1SmallerState, e.target.value)}
              />
               {titleH1SmallerState === "has-danger" && <Label className="error">This field is required.</Label>}
            </FormGroup>
          </Col>
        </Row>
        <FormGroup className={`has-label ${subtextH2State}`}>
          <Label>Subtext H2</Label>
          <Input
            type="text"
            value={subtextH2}
            onChange={(e) => handleInputChange(setSubtextH2, setSubtextH2State, e.target.value)}
          />
           {subtextH2State === "has-danger" && <Label className="error">This field is required.</Label>}
        </FormGroup>

        <hr />
        <CardTitle tag="h5">Small Images</CardTitle>
        <Row>
          <Col md="4">
            <FormGroup className={image1State}>
                <ImageUpload onFileChange={(file) => handleInputChange(setImage1, setImage1State, file)} />
                {image1State === "has-danger" && <Label className="error d-block text-center">Image is required.</Label>}
            </FormGroup>
            <FormGroup className={`has-label ${image1TitleState}`}>
              <Label>Image 1 Title</Label>
              <Input type="text" value={image1Title} onChange={(e) => handleInputChange(setImage1Title, setImage1TitleState, e.target.value)} />
              {image1TitleState === "has-danger" && <Label className="error">This field is required.</Label>}
            </FormGroup>
            <FormGroup className={`has-label ${image1SmallTextState}`}>
              <Label>Image 1 small text</Label>
              <Input type="text" value={image1SmallText} onChange={(e) => handleInputChange(setImage1SmallText, setImage1SmallTextState, e.target.value)} />
              {image1SmallTextState === "has-danger" && <Label className="error">This field is required.</Label>}
            </FormGroup>
          </Col>
          <Col md="4">
             <FormGroup className={image2State}>
                <ImageUpload onFileChange={(file) => handleInputChange(setImage2, setImage2State, file)} />
                {image2State === "has-danger" && <Label className="error d-block text-center">Image is required.</Label>}
            </FormGroup>
            <FormGroup className={`has-label ${image2TitleState}`}>
              <Label>Image 2 Title</Label>
              <Input type="text" value={image2Title} onChange={(e) => handleInputChange(setImage2Title, setImage2TitleState, e.target.value)} />
              {image2TitleState === "has-danger" && <Label className="error">This field is required.</Label>}
            </FormGroup>
            <FormGroup className={`has-label ${image2SmallTextState}`}>
              <Label>Image 2 small text</Label>
              <Input type="text" value={image2SmallText} onChange={(e) => handleInputChange(setImage2SmallText, setImage2SmallTextState, e.target.value)} />
              {image2SmallTextState === "has-danger" && <Label className="error">This field is required.</Label>}
            </FormGroup>
          </Col>
          <Col md="4">
             <FormGroup className={image3State}>
                <ImageUpload onFileChange={(file) => handleInputChange(setImage3, setImage3State, file)} />
                {image3State === "has-danger" && <Label className="error d-block text-center">Image is required.</Label>}
            </FormGroup>
            <FormGroup className={`has-label ${image3TitleState}`}>
              <Label>Image 3 Title</Label>
              <Input type="text" value={image3Title} onChange={(e) => handleInputChange(setImage3Title, setImage3TitleState, e.target.value)} />
              {image3TitleState === "has-danger" && <Label className="error">This field is required.</Label>}
            </FormGroup>
            <FormGroup className={`has-label ${image3SmallTextState}`}>
              <Label>Image 3 small text</Label>
              <Input type="text" value={image3SmallText} onChange={(e) => handleInputChange(setImage3SmallText, setImage3SmallTextState, e.target.value)} />
              {image3SmallTextState === "has-danger" && <Label className="error">This field is required.</Label>}
            </FormGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
});

export default Section2;