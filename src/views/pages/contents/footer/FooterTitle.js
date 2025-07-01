import React, { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
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

const FooterTitles = forwardRef(({ onDataChange }, ref) => {
  // --- 1. Internal State for this block ---
  const [mainTitle, setMainTitle] = useState("");
  const [items, setItems] = useState([
    { id: 1, title: "", link: "" },
    { id: 2, title: "", link: "" },
    { id: 3, title: "", link: "" },
  ]);

  // State for validation feedback
  const [mainTitleState, setMainTitleState] = useState("");
  const [itemsState, setItemsState] = useState([
    { titleState: "", linkState: "" },
    { titleState: "", linkState: "" },
    { titleState: "", linkState: "" },
  ]);

  // --- 2. Expose validation and data functions to the parent ---
  useImperativeHandle(ref, () => ({
    validate: () => {
      let isValid = true;
      if (mainTitle.trim() === "") {
        setMainTitleState("has-danger");
        isValid = false;
      } else {
        setMainTitleState("has-success");
      }
      const newItemsState = items.map((item) => {
        const state = { titleState: "has-success", linkState: "has-success" };
        if (item.title.trim() === "") {
          state.titleState = "has-danger";
          isValid = false;
        }
        if (item.link.trim() === "") {
          state.linkState = "has-danger";
          isValid = false;
        }
        return state;
      });
      setItemsState(newItemsState);
      return isValid;
    },
    getData: () => ({ mainTitle, items }),
  }));

  // --- 3. Functions to manage the internal list of links ---
  const removeItem = (indexToRemove) => {
    const newItems = items.filter((_, index) => index !== indexToRemove);
    const newItemsState = itemsState.filter((_, index) => index !== indexToRemove);
    setItems(newItems);
    setItemsState(newItemsState);
    onDataChange({ mainTitle, items: newItems });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
    onDataChange({ mainTitle, items: newItems });
  };

  const handleMainTitleChange = (e) => {
    setMainTitle(e.target.value);
    onDataChange({ mainTitle: e.target.value, items });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Footer Titles</CardTitle>
      </CardHeader>
      <CardBody>
        {/* Main Title Input */}
        <Row>
          <Col md="12">
            <FormGroup className={classnames(mainTitleState)}>
              <Label>Footer Title 1</Label>
              <Input
                type="text"
                value={mainTitle}
                onChange={handleMainTitleChange}
              />
              {mainTitleState === "has-danger" && (
                <label className="error">This field is required.</label>
              )}
            </FormGroup>
          </Col>
        </Row>
        <hr />
        {/* List of Link Items */}
        {items.map((item, index) => (
          <Row key={item.id} className="align-items-center mb-2">
            <Col md="5">
              <FormGroup className={classnames(itemsState[index]?.titleState)}>
                <Label>Footer title</Label>
                <Input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleItemChange(index, "title", e.target.value)}
                />
                 {itemsState[index]?.titleState === "has-danger" && (
                  <label className="error">This field is required.</label>
                )}
              </FormGroup>
            </Col>
            <Col md="5">
              <FormGroup className={classnames(itemsState[index]?.linkState)}>
                <Label>Link to</Label>
                <Input
                  type="text"
                  value={item.link}
                  onChange={(e) => handleItemChange(index, "link", e.target.value)}
                />
                 {itemsState[index]?.linkState === "has-danger" && (
                  <label className="error">This field is required.</label>
                )}
              </FormGroup>
            </Col>
            <Col md="2">
              {/*
               * **THE FIX IS HERE:**
               * Using size="sm" and adjusting font size and padding to make the button more compact.
              */}
              <Button
                color="danger"
                size="sm"
                onClick={() => removeItem(index)}
                className="mt-3"
                style={{ fontSize: "0.85rem", padding: "0.6rem 0.8rem" }}
              >
                <i className="tim-icons icon-simple-remove" />
                &nbsp;Remove Item
              </Button>
            </Col>
          </Row>
        ))}
        {/* The "Add" button functionality has been completely removed. */}
      </CardBody>
    </Card>
  );
});

FooterTitles.propTypes = {
  onDataChange: PropTypes.func.isRequired,
};

export default FooterTitles;
