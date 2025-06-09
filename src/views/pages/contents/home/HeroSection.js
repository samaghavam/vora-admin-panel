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

// Assuming ImageUpload component is in this path

const HeroSection = forwardRef((props, ref) => {
  // State for text inputs
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtext, setHeroSubtext] = useState("");
  const [story1Text, setStory1Text] = useState("");
  const [story2Text, setStory2Text] = useState("");
  const [story3Text, setStory3Text] = useState("");

  // State for file inputs
  const [story1Image, setStory1Image] = useState(null);
  const [story2Image, setStory2Image] = useState(null);
  const [story3Image, setStory3Image] = useState(null);

  // State for validation
  const [heroTitleState, setHeroTitleState] = useState("");
  const [heroSubtextState, setHeroSubtextState] = useState("");
  const [story1TextState, setStory1TextState] = useState("");
  const [story2TextState, setStory2TextState] = useState("");
  const [story3TextState, setStory3TextState] = useState("");
  const [story1ImageState, setStory1ImageState] = useState("");
  const [story2ImageState, setStory2ImageState] = useState("");
  const [story3ImageState, setStory3ImageState] = useState("");

  // Expose functions to parent component (Home)
  useImperativeHandle(ref, () => ({
    // Validation function
    validate: () => {
      const isValid = validateFields();
      return isValid;
    },
    // Function to get form data
    getData: () => ({
      heroTitle,
      heroSubtext,
      story1Text,
      story1Image,
      story2Text,
      story2Image,
      story3Text,
      story3Image,
    }),
  }));

  // Simple validation check for non-empty value
  const verifyLength = (value) => {
    if (value) {
        if(typeof value === 'string') {
            return value.trim().length > 0;
        }
        return true;
    }
    return false;
  };

  // Main validation function
  const validateFields = () => {
    let isValid = true;

    if (!verifyLength(heroTitle)) {
      setHeroTitleState("has-danger");
      isValid = false;
    } else {
      setHeroTitleState("has-success");
    }

    if (!verifyLength(heroSubtext)) {
      setHeroSubtextState("has-danger");
      isValid = false;
    } else {
      setHeroSubtextState("has-success");
    }

    if (!verifyLength(story1Text)) {
      setStory1TextState("has-danger");
      isValid = false;
    } else {
      setStory1TextState("has-success");
    }
     if (!verifyLength(story1Image)) {
      setStory1ImageState("has-danger");
      isValid = false;
    } else {
      setStory1ImageState("has-success");
    }

    if (!verifyLength(story2Text)) {
      setStory2TextState("has-danger");
      isValid = false;
    } else {
      setStory2TextState("has-success");
    }

     if (!verifyLength(story2Image)) {
      setStory2ImageState("has-danger");
      isValid = false;
    } else {
      setStory2ImageState("has-success");
    }

    if (!verifyLength(story3Text)) {
      setStory3TextState("has-danger");
      isValid = false;
    } else {
      setStory3TextState("has-success");
    }

    if (!verifyLength(story3Image)) {
      setStory3ImageState("has-danger");
      isValid = false;
    } else {
      setStory3ImageState("has-success");
    }

    return isValid;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Hero Section</CardTitle>
      </CardHeader>
      <CardBody>
        <FormGroup className={`has-label ${heroTitleState}`}>
          <Label>Hero Title H1</Label>
          <Input
            type="text"
            value={heroTitle}
            onChange={(e) => {
                setHeroTitle(e.target.value);
                if (heroTitleState === "has-danger") {
                    setHeroTitleState("");
                }
            }}
          />
          {heroTitleState === "has-danger" && (
            <Label className="error">This field is required.</Label>
          )}
        </FormGroup>

        <FormGroup className={`has-label ${heroSubtextState}`}>
          <Label>Hero Subtext H2</Label>
          <Input
            type="text"
            value={heroSubtext}
            onChange={(e) => {
                setHeroSubtext(e.target.value);
                 if (heroSubtextState === "has-danger") {
                    setHeroSubtextState("");
                }
            }}
          />
           {heroSubtextState === "has-danger" && (
            <Label className="error">This field is required.</Label>
          )}
        </FormGroup>

        <hr />
        <CardTitle tag="h5">Story Images</CardTitle>
        <Row>
          <Col md="4">
             <FormGroup className={story1ImageState}>
                <ImageUpload onFileChange={(file) => {
                    setStory1Image(file)
                    if (story1ImageState === "has-danger") {
                        setStory1ImageState("");
                    }
                }} />
                 {story1ImageState === "has-danger" && (
                    <Label className="error d-block text-center">Image is required.</Label>
                )}
             </FormGroup>
            <FormGroup className={`has-label ${story1TextState}`}>
              <Label>Story 1 text</Label>
              <Input
                type="text"
                value={story1Text}
                onChange={(e) => {
                    setStory1Text(e.target.value);
                    if (story1TextState === "has-danger") {
                        setStory1TextState("");
                    }
                }}
              />
              {story1TextState === "has-danger" && (
                <Label className="error">This field is required.</Label>
              )}
            </FormGroup>
          </Col>
          <Col md="4">
             <FormGroup className={story2ImageState}>
                <ImageUpload onFileChange={(file) => {
                    setStory2Image(file)
                    if (story2ImageState === "has-danger") {
                        setStory2ImageState("");
                    }
                }} />
                {story2ImageState === "has-danger" && (
                    <Label className="error d-block text-center">Image is required.</Label>
                )}
             </FormGroup>
            <FormGroup className={`has-label ${story2TextState}`}>
              <Label>Story 2 text</Label>
              <Input
                type="text"
                value={story2Text}
                onChange={(e) => {
                    setStory2Text(e.target.value)
                     if (story2TextState === "has-danger") {
                        setStory2TextState("");
                    }
                }}
              />
              {story2TextState === "has-danger" && (
                <Label className="error">This field is required.</Label>
              )}
            </FormGroup>
          </Col>
          <Col md="4">
             <FormGroup className={story3ImageState}>
                <ImageUpload onFileChange={(file) => {
                    setStory3Image(file);
                     if (story3ImageState === "has-danger") {
                        setStory3ImageState("");
                    }
                }} />
                 {story3ImageState === "has-danger" && (
                    <Label className="error d-block text-center">Image is required.</Label>
                )}
             </FormGroup>
            <FormGroup className={`has-label ${story3TextState}`}>
              <Label>Story 3 text</Label>
              <Input
                type="text"
                value={story3Text}
                onChange={(e) => {
                    setStory3Text(e.target.value);
                     if (story3TextState === "has-danger") {
                        setStory3TextState("");
                    }
                }}
              />
              {story3TextState === "has-danger" && (
                <Label className="error">This field is required.</Label>
              )}
            </FormGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
});

export default HeroSection;