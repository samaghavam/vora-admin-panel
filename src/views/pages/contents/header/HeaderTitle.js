import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

const HeaderTitle = forwardRef((props, ref) => {
  // --- STATE MANAGEMENT ---
  // A dynamic list to hold header titles and links, starting with one item.
  const [headerItems, setHeaderItems] = useState([
    { id: 1, title: "", link: "", titleState: "", linkState: "" },
  ]);

  // --- DYNAMIC ITEM HANDLERS ---
  const addItem = () => {
    setHeaderItems([
      ...headerItems,
      { id: Date.now(), title: "", link: "", titleState: "", linkState: "" },
    ]);
  };

  const removeItem = (idToRemove) => {
    // This logic ensures the first item cannot be removed.
    if (idToRemove !== 1) {
      setHeaderItems(headerItems.filter((item) => item.id !== idToRemove));
    }
  };

  const handleItemChange = (id, field, value) => {
    const newItems = headerItems.map((item) => {
      if (item.id === id) {
        // Clear validation state on change
        return { ...item, [field]: value, [`${field}State`]: "" };
      }
      return item;
    });
    setHeaderItems(newItems);
  };

  // --- IMPERATIVE HANDLE ---
  // Expose functions to the parent component
  useImperativeHandle(ref, () => ({
    validate: () => validateFields(),
    getData: () => ({
      // Return a clean array of titles and links
      headerTitles: headerItems.map(({ title, link }) => ({ title, link })),
    }),
  }));

  // --- VALIDATION LOGIC ---
  const verifyLength = (value) => {
    return value && typeof value === 'string' && value.trim().length > 0;
  };

  const validateFields = () => {
    let isAllValid = true;
    const validatedItems = headerItems.map(item => {
        let titleState = "has-success";
        let linkState = "has-success";
        
        if (!verifyLength(item.title)) {
            titleState = "has-danger";
            isAllValid = false;
        }
        if (!verifyLength(item.link)) {
            linkState = "has-danger";
            isAllValid = false;
        }

        return { ...item, titleState, linkState };
    });
    setHeaderItems(validatedItems);
    
    return isAllValid;
  };


  // --- RENDER ---
  return (
    <Card>
      <CardBody>
        {headerItems.map((item, index) => (
          <div key={item.id}>
            {/* First item has a full-width layout */}
            {index === 0 && (
              <>
                <FormGroup className={`has-label ${item.titleState}`}>
                  <Label>{`Header title ${index + 1}`}</Label>
                  <Input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleItemChange(item.id, "title", e.target.value)}
                  />
                  {item.titleState === "has-danger" && <Label className="error">This field is required.</Label>}
                </FormGroup>
                <FormGroup className={`has-label ${item.linkState}`}>
                  <Label>Link to</Label>
                  <Input
                    type="text"
                    value={item.link}
                    onChange={(e) => handleItemChange(item.id, "link", e.target.value)}
                  />
                  {item.linkState === "has-danger" && <Label className="error">This field is required.</Label>}
                </FormGroup>
              </>
            )}

            {/* Subsequent items have the split layout */}
            {index > 0 && (
              <Row>
                <Col lg="9">
                  <FormGroup className={`has-label ${item.titleState}`}>
                    <Label>{`Header title ${index + 1}`}</Label>
                    <Input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleItemChange(item.id, "title", e.target.value)}
                    />
                    {item.titleState === "has-danger" && <Label className="error">This field is required.</Label>}
                  </FormGroup>
                  <FormGroup className={`has-label ${item.linkState}`}>
                    <Label>Link to</Label>
                    <Input
                      type="text"
                      value={item.link}
                      onChange={(e) => handleItemChange(item.id, "link", e.target.value)}
                    />
                    {item.linkState === "has-danger" && <Label className="error">This field is required.</Label>}
                  </FormGroup>
                </Col>
                <Col lg="3" className="d-flex align-items-center justify-content-center">
                  <Button
                    className="btn-round"
                    color="danger"
                    onClick={() => removeItem(item.id)}
                    style={{
                      background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
                      border: 'none',
                      color: 'white',
                      width: '100%',
                    }}
                  >
                    <i className="fa fa-times" style={{ marginRight: '5px' }} />
                    Remove Header title
                  </Button>
                </Col>
              </Row>
            )}
            {index < headerItems.length - 1 && <hr />}
          </div>
        ))}
        
        <Button color="primary" outline onClick={addItem} className="mt-3">
          <i className="tim-icons icon-simple-add" /> Add Subtitle
        </Button>
      </CardBody>
    </Card>
  );
});

export default HeaderTitle;
