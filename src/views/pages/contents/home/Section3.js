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

const Section3 = forwardRef((props, ref) => {
  // Text Inputs
  const [titleH1, setTitleH1] = useState("");
  const [titleH1Smaller, setTitleH1Smaller] = useState("");
  const [subtextH2, setSubtextH2] = useState("");
  const [aiName, setAiName] = useState("");
  const [aiDescription, setAiDescription] = useState("");
  const [point1Title, setPoint1Title] = useState("");
  const [point1Desc, setPoint1Desc] = useState("");
  const [point2Title, setPoint2Title] = useState("");
  const [point2Desc, setPoint2Desc] = useState("");
  const [point3Title, setPoint3Title] = useState("");
  const [point3Desc, setPoint3Desc] = useState("");

  // File Inputs
  const [aiCardBg, setAiCardBg] = useState(null);
  const [point1Icon, setPoint1Icon] = useState(null);
  const [point2Icon, setPoint2Icon] = useState(null);
  const [point3Icon, setPoint3Icon] = useState(null);

  // Validation States
  const [titleH1State, setTitleH1State] = useState("");
  const [titleH1SmallerState, setTitleH1SmallerState] = useState("");
  const [subtextH2State, setSubtextH2State] = useState("");
  const [aiNameState, setAiNameState] = useState("");
  const [aiDescriptionState, setAiDescriptionState] = useState("");
  const [point1TitleState, setPoint1TitleState] = useState("");
  const [point1DescState, setPoint1DescState] = useState("");
  const [point2TitleState, setPoint2TitleState] = useState("");
  const [point2DescState, setPoint2DescState] = useState("");
  const [point3TitleState, setPoint3TitleState] = useState("");
  const [point3DescState, setPoint3DescState] = useState("");
  const [aiCardBgState, setAiCardBgState] = useState("");
  const [point1IconState, setPoint1IconState] = useState("");
  const [point2IconState, setPoint2IconState] = useState("");
  const [point3IconState, setPoint3IconState] = useState("");

  // --- IMPERATIVE HANDLE ---
  useImperativeHandle(ref, () => ({
    validate: () => validateFields(),
    getData: () => ({
      titleH1,
      titleH1Smaller,
      subtextH2,
      aiName,
      aiDescription,
      point1Title,
      point1Desc,
      point2Title,
      point2Desc,
      point3Title,
      point3Desc,
      aiCardBg,
      point1Icon,
      point2Icon,
      point3Icon,
    }),
  }));

  // --- VALIDATION & CHANGE HANDLERS ---
  const verifyLength = (value) => {
    if (typeof value === "string") {
      return value.trim().length > 0;
    }
    return value !== null;
  };

  const validateFields = () => {
    let isValid = true;
    const fieldsToValidate = {
      titleH1,
      titleH1Smaller,
      subtextH2,
      aiName,
      aiDescription,
      point1Title,
      point1Desc,
      point2Title,
      point2Desc,
      point3Title,
      point3Desc,
      aiCardBg,
      point1Icon,
      point2Icon,
      point3Icon,
    };

    const stateSetters = {
      titleH1: setTitleH1State,
      titleH1Smaller: setTitleH1SmallerState,
      subtextH2: setSubtextH2State,
      aiName: setAiNameState,
      aiDescription: setAiDescriptionState,
      point1Title: setPoint1TitleState,
      point1Desc: setPoint1DescState,
      point2Title: setPoint2TitleState,
      point2Desc: setPoint2DescState,
      point3Title: setPoint3TitleState,
      point3Desc: setPoint3DescState,
      aiCardBg: setAiCardBgState,
      point1Icon: setPoint1IconState,
      point2Icon: setPoint2IconState,
      point3Icon: setPoint3IconState,
    };

    for (const [key, value] of Object.entries(fieldsToValidate)) {
      const result = verifyLength(value);
      stateSetters[key](result ? "has-success" : "has-danger");
      if (!result) isValid = false;
    }

    return isValid;
  };

  const handleInputChange = (setter, stateSetter, value) => {
    setter(value);
    stateSetter("");
  };

  // --- RENDER ---
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Section 3 - AIs</CardTitle>
      </CardHeader>
      <CardBody>
        {/* Top Titles */}
        <Row>
          <Col md="6">
            <FormGroup className={`has-label ${titleH1State}`}>
              <Label>Title H1</Label>
              <Input
                type="text"
                value={titleH1}
                onChange={(e) =>
                  handleInputChange(setTitleH1, setTitleH1State, e.target.value)
                }
              />
              {titleH1State === "has-danger" && (
                <Label className="error">This field is required.</Label>
              )}
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup className={`has-label ${titleH1SmallerState}`}>
              <Label>Title H1 - smaller</Label>
              <Input
                type="text"
                value={titleH1Smaller}
                onChange={(e) =>
                  handleInputChange(
                    setTitleH1Smaller,
                    setTitleH1SmallerState,
                    e.target.value
                  )
                }
              />
              {titleH1SmallerState === "has-danger" && (
                <Label className="error">This field is required.</Label>
              )}
            </FormGroup>
          </Col>
        </Row>
        <FormGroup className={`has-label ${subtextH2State}`}>
          <Label>Subtext H2</Label>
          <Input
            type="text"
            value={subtextH2}
            onChange={(e) =>
              handleInputChange(setSubtextH2, setSubtextH2State, e.target.value)
            }
          />
          {subtextH2State === "has-danger" && (
            <Label className="error">This field is required.</Label>
          )}
        </FormGroup>
        <hr />

        {/* AI Card Section */}
        <CardTitle tag="h5">AI 1 - Card description</CardTitle>
        <Row>
          <Col md="8">
            <FormGroup className={`has-label ${aiNameState}`}>
              <Label>AI 1 Name</Label>
              <Input
                type="text"
                value={aiName}
                onChange={(e) =>
                  handleInputChange(setAiName, setAiNameState, e.target.value)
                }
              />
              {aiNameState === "has-danger" && (
                <Label className="error">This field is required.</Label>
              )}
            </FormGroup>
            <FormGroup className={`has-label ${aiDescriptionState}`}>
              <Label>AI 1 description</Label>
              <Input
                type="textarea"
                rows="5"
                value={aiDescription}
                onChange={(e) =>
                  handleInputChange(
                    setAiDescription,
                    setAiDescriptionState,
                    e.target.value
                  )
                }
              />
              {aiDescriptionState === "has-danger" && (
                <Label className="error">This field is required.</Label>
              )}
            </FormGroup>
          </Col>
          <Col md="4">
            <Label>AI 1 - Card BG</Label>
            <FormGroup className={aiCardBgState}>
              <ImageUpload
                onFileChange={(file) =>
                  handleInputChange(setAiCardBg, setAiCardBgState, file)
                }
              />
              {aiCardBgState === "has-danger" && (
                <Label className="error d-block text-center">
                  Image is required.
                </Label>
              )}
            </FormGroup>
          </Col>
        </Row>
        <hr />

        {/* Points Section */}
        <Row>
          <Col md="4">
            <FormGroup className={`has-label ${point1TitleState}`}>
              <Label>Title point 1</Label>
              <Input
                type="text"
                value={point1Title}
                onChange={(e) =>
                  handleInputChange(
                    setPoint1Title,
                    setPoint1TitleState,
                    e.target.value
                  )
                }
              />
              {point1TitleState === "has-danger" && (
                <Label className="error">This field is required.</Label>
              )}
            </FormGroup>
            <FormGroup className={`has-label ${point1DescState}`}>
              <Label>Title point 1 description</Label>
              <Input
                type="text"
                value={point1Desc}
                onChange={(e) =>
                  handleInputChange(
                    setPoint1Desc,
                    setPoint1DescState,
                    e.target.value
                  )
                }
              />
              {point1DescState === "has-danger" && (
                <Label className="error">This field is required.</Label>
              )}
            </FormGroup>
            <Label>Title point 1 - Icon</Label>
            <FormGroup className={point1IconState}>
              <ImageUpload
                onFileChange={(file) =>
                  handleInputChange(setPoint1Icon, setPoint1IconState, file)
                }
              />
              {point1IconState === "has-danger" && (
                <Label className="error d-block text-center">
                  Icon is required.
                </Label>
              )}
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup className={`has-label ${point2TitleState}`}>
              <Label>Title point 2</Label>
              <Input
                type="text"
                value={point2Title}
                onChange={(e) =>
                  handleInputChange(
                    setPoint2Title,
                    setPoint2TitleState,
                    e.target.value
                  )
                }
              />
              {point2TitleState === "has-danger" && (
                <Label className="error">This field is required.</Label>
              )}
            </FormGroup>
            <FormGroup className={`has-label ${point2DescState}`}>
              <Label>Title point 2 description</Label>
              <Input
                type="text"
                value={point2Desc}
                onChange={(e) =>
                  handleInputChange(
                    setPoint2Desc,
                    setPoint2DescState,
                    e.target.value
                  )
                }
              />
              {point2DescState === "has-danger" && (
                <Label className="error">This field is required.</Label>
              )}
            </FormGroup>
            <Label>Title point 2 - Icon</Label>
            <FormGroup className={point2IconState}>
              <ImageUpload
                onFileChange={(file) =>
                  handleInputChange(setPoint2Icon, setPoint2IconState, file)
                }
              />
              {point2IconState === "has-danger" && (
                <Label className="error d-block text-center">
                  Icon is required.
                </Label>
              )}
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup className={`has-label ${point3TitleState}`}>
              <Label>Title point 3</Label>
              <Input
                type="text"
                value={point3Title}
                onChange={(e) =>
                  handleInputChange(
                    setPoint3Title,
                    setPoint3TitleState,
                    e.target.value
                  )
                }
              />
              {point3TitleState === "has-danger" && (
                <Label className="error">This field is required.</Label>
              )}
            </FormGroup>
            <FormGroup className={`has-label ${point3DescState}`}>
              <Label>Title point 3 description</Label>
              <Input
                type="text"
                value={point3Desc}
                onChange={(e) =>
                  handleInputChange(
                    setPoint3Desc,
                    setPoint3DescState,
                    e.target.value
                  )
                }
              />
              {point3DescState === "has-danger" && (
                <Label className="error">This field is required.</Label>
              )}
            </FormGroup>
            <Label>Title point 3 - Icon</Label>
            <FormGroup className={point3IconState}>
              <ImageUpload
                onFileChange={(file) =>
                  handleInputChange(setPoint3Icon, setPoint3IconState, file)
                }
              />
              {point3IconState === "has-danger" && (
                <Label className="error d-block text-center">
                  Icon is required.
                </Label>
              )}
            </FormGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
});

export default Section3;
