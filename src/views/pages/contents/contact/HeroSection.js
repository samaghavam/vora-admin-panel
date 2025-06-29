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

const HeroSection = forwardRef((props, ref) => {
  const [titleH1, setTitleH1] = useState("");
  const [titleH1Smaller, setTitleH1Smaller] = useState("");
  const [description, setDescription] = useState("");
  const [brandIcon, setBrandIcon] = useState(null);
  const [banner, setBanner] = useState(null);
  const [point1Title, setPoint1Title] = useState("");
  const [point1SmallTitle, setPoint1SmallTitle] = useState("");
  const [point1Desc, setPoint1Desc] = useState("");
  const [point2Title, setPoint2Title] = useState("");
  const [point2SmallTitle, setPoint2SmallTitle] = useState("");
  const [point2Desc, setPoint2Desc] = useState("");
  const [point3Title, setPoint3Title] = useState("");
  const [point3SmallTitle, setPoint3SmallTitle] = useState("");
  const [point3Desc, setPoint3Desc] = useState("");
  const [titleH1State, setTitleH1State] = useState("");
  const [titleH1SmallerState, setTitleH1SmallerState] = useState("");
  const [descriptionState, setDescriptionState] = useState("");
  const [brandIconState, setBrandIconState] = useState("");
  const [bannerState, setBannerState] = useState("");
  const [point1TitleState, setPoint1TitleState] = useState("");
  const [point1SmallTitleState, setPoint1SmallTitleState] = useState("");
  const [point1DescState, setPoint1DescState] = useState("");
  const [point2TitleState, setPoint2TitleState] = useState("");
  const [point2SmallTitleState, setPoint2SmallTitleState] = useState("");
  const [point2DescState, setPoint2DescState] = useState("");
  const [point3TitleState, setPoint3TitleState] = useState("");
  const [point3SmallTitleState, setPoint3SmallTitleState] = useState("");
  const [point3DescState, setPoint3DescState] = useState("");

  useImperativeHandle(ref, () => ({
    validate: () => validateFields(),
    getData: () => ({
      titleH1,
      titleH1Smaller,
      description,
      brandIcon,
      banner,
      point1Title,
      point1SmallTitle,
      point1Desc,
      point2Title,
      point2SmallTitle,
      point2Desc,
      point3Title,
      point3SmallTitle,
      point3Desc,
    }),
  }));

  const verifyLength = (value) => {
    if (typeof value === "string") return value.trim().length > 0;
    return value !== null;
  };

  const validateFields = () => {
    let isValid = true;
    const fieldSetterMap = {
      titleH1: setTitleH1State,
      titleH1Smaller: setTitleH1SmallerState,
      description: setDescriptionState,
      brandIcon: setBrandIconState,
      banner: setBannerState,
      point1Title: setPoint1TitleState,
      point1SmallTitle: setPoint1SmallTitleState,
      point1Desc: setPoint1DescState,
      point2Title: setPoint2TitleState,
      point2SmallTitle: setPoint2SmallTitleState,
      point2Desc: setPoint2DescState,
      point3Title: setPoint3TitleState,
      point3SmallTitle: setPoint3SmallTitleState,
      point3Desc: setPoint3DescState,
    };
    const fields = {
      titleH1,
      titleH1Smaller,
      description,
      brandIcon,
      banner,
      point1Title,
      point1SmallTitle,
      point1Desc,
      point2Title,
      point2SmallTitle,
      point2Desc,
      point3Title,
      point3SmallTitle,
      point3Desc,
    };

    for (const [key, value] of Object.entries(fields)) {
      if (!verifyLength(value)) {
        fieldSetterMap[key]("has-danger");
        isValid = false;
      } else {
        fieldSetterMap[key]("has-success");
      }
    }

    return isValid;
  };

  const handleInputChange = (setter, stateSetter, value) => {
    setter(value);
    stateSetter("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Hero Section</CardTitle>
      </CardHeader>
      <CardBody>
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
        <FormGroup className={`has-label ${descriptionState}`}>
          <Label>Description</Label>
          <Input
            type="textarea"
            value={description}
            onChange={(e) =>
              handleInputChange(
                setDescription,
                setDescriptionState,
                e.target.value
              )
            }
          />
          {descriptionState === "has-danger" && (
            <Label className="error">This field is required.</Label>
          )}
        </FormGroup>
        <hr />
        <CardTitle tag="h5">Images</CardTitle>
        <Row>
          <Col md="6">
            <Label>Brand Icon - Icon</Label>
            <FormGroup className={brandIconState}>
              <ImageUpload
                onFileChange={(file) =>
                  handleInputChange(setBrandIcon, setBrandIconState, file)
                }
              />
              {brandIconState === "has-danger" && (
                <Label className="error d-block text-center">
                  Icon is required.
                </Label>
              )}
            </FormGroup>
          </Col>
          <Col md="6">
            <Label>Banner</Label>
            <FormGroup className={bannerState}>
              <ImageUpload
                onFileChange={(file) =>
                  handleInputChange(setBanner, setBannerState, file)
                }
              />
              {bannerState === "has-danger" && (
                <Label className="error d-block text-center">
                  Banner is required.
                </Label>
              )}
            </FormGroup>
          </Col>
        </Row>
        <hr />
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
            <FormGroup className={`has-label ${point1SmallTitleState}`}>
              <Label>Small Title point 1</Label>
              <Input
                type="text"
                value={point1SmallTitle}
                onChange={(e) =>
                  handleInputChange(
                    setPoint1SmallTitle,
                    setPoint1SmallTitleState,
                    e.target.value
                  )
                }
              />
              {point1SmallTitleState === "has-danger" && (
                <Label className="error">This field is required.</Label>
              )}
            </FormGroup>
            <FormGroup className={`has-label ${point1DescState}`}>
              <Label>Title point 1 description</Label>
              <Input
                type="textarea"
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
            <FormGroup className={`has-label ${point2SmallTitleState}`}>
              <Label>Small Title point 2</Label>
              <Input
                type="text"
                value={point2SmallTitle}
                onChange={(e) =>
                  handleInputChange(
                    setPoint2SmallTitle,
                    setPoint2SmallTitleState,
                    e.target.value
                  )
                }
              />
              {point2SmallTitleState === "has-danger" && (
                <Label className="error">This field is required.</Label>
              )}
            </FormGroup>
            <FormGroup className={`has-label ${point2DescState}`}>
              <Label>Title point 2 description</Label>
              <Input
                type="textarea"
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
            <FormGroup className={`has-label ${point3SmallTitleState}`}>
              <Label>Small Title point 3</Label>
              <Input
                type="text"
                value={point3SmallTitle}
                onChange={(e) =>
                  handleInputChange(
                    setPoint3SmallTitle,
                    setPoint3SmallTitleState,
                    e.target.value
                  )
                }
              />
              {point3SmallTitleState === "has-danger" && (
                <Label className="error">This field is required.</Label>
              )}
            </FormGroup>
            <FormGroup className={`has-label ${point3DescState}`}>
              <Label>Title point 3 description</Label>
              <Input
                type="textarea"
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
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
});

export default HeroSection;
