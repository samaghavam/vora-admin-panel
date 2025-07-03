import React, { useState, forwardRef, useImperativeHandle } from "react";
import classnames from "classnames";
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
  Button,
} from "reactstrap";
import ImageUpload from "components/CustomUpload/ImageUpload"; // Assuming path is correct

const HeaderSubtitle = forwardRef((props, ref) => {
  // --- Internal State for the list of subtitle blocks ---
  const [subtitles, setSubtitles] = useState([
    { id: 1, title: "", link: "", iconFile: null, titleState: "", linkState: "", iconState: "" },
    { id: 2, title: "", link: "", iconFile: null, titleState: "", linkState: "", iconState: "" },
  ]);

  // --- Validation Logic ---
  const verifyLength = (value) => value && value.trim().length > 0;

  useImperativeHandle(ref, () => ({
    validate: () => {
      let isAllValid = true;
      const validatedSubtitles = subtitles.map(item => {
        const newItem = { ...item };
        // Validate Title
        if (!verifyLength(item.title)) {
          newItem.titleState = "has-danger";
          isAllValid = false;
        } else {
          newItem.titleState = "has-success";
        }
        // Validate Link
        if (!verifyLength(item.link)) {
          newItem.linkState = "has-danger";
          isAllValid = false;
        } else {
          newItem.linkState = "has-success";
        }
        // Validate Icon
        if (!item.iconFile) {
          newItem.iconState = "has-danger";
          isAllValid = false;
        } else {
          newItem.iconState = "has-success";
        }
        return newItem;
      });
      setSubtitles(validatedSubtitles);
      return isAllValid;
    },
    getData: () => ({
      subtitles: subtitles.map(s => ({ title: s.title, link: s.link, icon: s.iconFile })),
    }),
  }));

  // --- Handlers for dynamic list ---
  const addSubtitlePair = () => {
    const newId1 = Date.now();
    const newId2 = newId1 + 1;
    const newPair = [
      { id: newId1, title: "", link: "", iconFile: null, titleState: "", linkState: "", iconState: "" },
      { id: newId2, title: "", link: "", iconFile: null, titleState: "", linkState: "", iconState: "" },
    ];
    setSubtitles(prevSubtitles => [...prevSubtitles, ...newPair]);
  };

  const removeSubtitle = (idToRemove) => {
    // Prevent removing if it would leave only one item behind
    if (subtitles.length > 2) {
      setSubtitles(subtitles.filter((s) => s.id !== idToRemove));
    }
  };

  const handleSubtitleChange = (id, field, value) => {
    const newSubtitles = subtitles.map(item => {
      if (item.id === id) {
        // Clear validation state for the field being changed
        return { ...item, [field]: value, [`${field}State`]: "" };
      }
      return item;
    });
    setSubtitles(newSubtitles);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Header Subtitles</CardTitle>
      </CardHeader>
      <CardBody>
        {/* Dynamic Subtitle List */}
        {subtitles.map((item, index) => (
          <React.Fragment key={item.id}>
            {/* **THE FIX IS HERE:** A gray <hr> is now added between sections */}
            {index > 0 && <hr style={{ backgroundColor: '#2c344c', height: '1px', border: 'none' }} />}
            <div className="pt-3">
              <Row className="align-items-center">
                <Col md="7">
                  <FormGroup className={classnames(item.titleState)}>
                    <Label>Sub header title {index + 1}</Label>
                    <Input type="text" value={item.title} onChange={(e) => handleSubtitleChange(item.id, "title", e.target.value)} />
                    {item.titleState === "has-danger" && <Label className="error">This field is required.</Label>}
                  </FormGroup>
                  <FormGroup className={classnames(item.linkState)}>
                    <Label>Link to</Label>
                    <Input type="text" value={item.link} onChange={(e) => handleSubtitleChange(item.id, "link", e.target.value)} />
                    {item.linkState === "has-danger" && <Label className="error">This field is required.</Label>}
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup className={classnames(item.iconState)}>
                    <Label>Icon</Label>
                    <ImageUpload onFileChange={(file) => handleSubtitleChange(item.id, "iconFile", file)} />
                    {item.iconState === "has-danger" && <Label className="error d-block text-center">Icon is required.</Label>}
                  </FormGroup>
                </Col>
                <Col md="2">
                  <Button color="danger" onClick={() => removeSubtitle(item.id)}>
                    <i className="tim-icons icon-simple-remove" /> Remove Sub title
                  </Button>
                </Col>
              </Row>
            </div>
          </React.Fragment>
        ))}
        <Button color="primary" outline className="mt-3" onClick={addSubtitlePair}>
          <i className="tim-icons icon-simple-add" /> Add Sub header
        </Button>
      </CardBody>
    </Card>
  );
});

export default HeaderSubtitle;
