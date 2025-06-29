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
} from "reactstrap";

const HeaderImage = forwardRef((props, ref) => {
  const [brandIcon, setBrandIcon] = useState(null);
  const [brandIconState, setBrandIconState] = useState("");

  useImperativeHandle(ref, () => ({
    validate: () => {
      let isValid = true;
      if (!brandIcon) {
        setBrandIconState("has-danger");
        isValid = false;
      } else {
        setBrandIconState("has-success");
      }
      return isValid;
    },
    getData: () => ({
      brandIcon,
    }),
  }));

  const handleFileChange = (file) => {
    setBrandIcon(file);
    if (brandIconState === "has-danger") {
      setBrandIconState("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Header</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md="4">
            <Label>Brand icon - Icon</Label>
            <FormGroup className={brandIconState}>
              <ImageUpload onFileChange={handleFileChange} />
              {brandIconState === "has-danger" && (
                <Label className="error d-block text-center">Icon is required.</Label>
              )}
            </FormGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
});

export default HeaderImage;
