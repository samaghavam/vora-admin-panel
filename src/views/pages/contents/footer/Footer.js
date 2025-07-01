import React, { useState, useRef } from "react";
import { Row, Col, Form, Button, Card, CardBody } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import SimpleBreadcrumb from "views/components/BreadCrumbs";
import FooterDescription from "./FooterDescription";
import FooterImages from "./FooterImage";
import FooterTitles from "./FooterTitle";
import FooterTitles2 from "./FooterTitle2";
import FooterTitles3 from "./FooterTitle3";

const Footer = () => {
  const breadcrumbItems = [
    { label: "Home", to: "/admin/dashboard" },
    { label: "Content management", to: "/admin/contents" },
    { label: "Footer" },
  ];

  // Create a ref for each section component
  const footerImagesRef = useRef(null);
  const footerDescriptionRef = useRef(null);
  const footerTitles1Ref = useRef(null);
  const footerTitles2Ref = useRef(null);
  const footerTitles3Ref = useRef(null);

  // --- 1. Form Data State ---
  const [formData, setFormData] = useState({
    footerImages: {},
    footerDescription: {},
    footerTitles1: {},
    footerTitles2: {},
    footerTitles3: {},
  });

  // --- 2. Alert State ---
  const [alert, setAlert] = useState(null);

  // --- 3. Update Handler ---
  const handleDataChange = (sectionName, data) => {
    setFormData((prev) => ({ ...prev, [sectionName]: data }));
  };

  // --- 4. Submission Handler ---
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate each section using its ref
    const isFooterImagesValid = footerImagesRef.current.validate();
    const isFooterDescriptionValid = footerDescriptionRef.current.validate();
    const isFooterTitles1Valid = footerTitles1Ref.current.validate();
    const isFooterTitles2Valid = footerTitles2Ref.current.validate();
    const isFooterTitles3Valid = footerTitles3Ref.current.validate();

    // Check if all sections are valid
    if (isFooterImagesValid && isFooterDescriptionValid && isFooterTitles1Valid && isFooterTitles2Valid && isFooterTitles3Valid) {
      try {
        // Get data from each section
        const imagesData = footerImagesRef.current.getData();
        const descriptionData = footerDescriptionRef.current.getData();
        const titles1Data = footerTitles1Ref.current.getData();
        const titles2Data = footerTitles2Ref.current.getData();
        const titles3Data = footerTitles3Ref.current.getData();
        
        const apiData = new FormData();
        apiData.append('bg_image', imagesData.bgImage);
        apiData.append('icon_image', imagesData.iconImage);
        apiData.append('description', descriptionData.description);
        apiData.append('titles_1', JSON.stringify(titles1Data));
        apiData.append('titles_2', JSON.stringify(titles2Data));
        apiData.append('titles_3', JSON.stringify(titles3Data));
        
        console.log("Validation successful. Submitting data...");
        successAlert("Footer content saved successfully!");

      } catch (error) {
        errorAlert(error.message || "Data could not be sent.");
      }
    } else {
      console.log("Validation failed. Check inline errors.");
    }
  };

  // --- 5. Alert Functions ---
  const successAlert = (message) => setAlert(<SweetAlert success style={{ display: "block", marginTop: "-100px" }} title="Success!" onConfirm={() => hideAlert()} onCancel={() => hideAlert()} confirmBtnBsStyle="primary">{message}</SweetAlert>);
  const errorAlert = (message) => setAlert(<SweetAlert danger style={{ display: "block", marginTop: "-100px" }} title="Error" onConfirm={() => hideAlert()} onCancel={() => hideAlert()} confirmBtnBsStyle="primary">{message}</SweetAlert>);
  const hideAlert = () => setAlert(null);

  return (
    <>
      {alert}
      <div className="content">
        <Row><Col md="12"><SimpleBreadcrumb items={breadcrumbItems} /></Col></Row>
        <Form onSubmit={handleSubmit} noValidate>
          <FooterImages ref={footerImagesRef} onDataChange={(data) => handleDataChange("footerImages", data)} />
          <FooterDescription ref={footerDescriptionRef} onDataChange={(data) => handleDataChange("footerDescription", data)} />
          <FooterTitles ref={footerTitles1Ref} onDataChange={(data) => handleDataChange("footerTitles1", data)} />
          <FooterTitles2 ref={footerTitles2Ref} onDataChange={(data) => handleDataChange("footerTitles2", data)} />
          <FooterTitles3 ref={footerTitles3Ref} onDataChange={(data) => handleDataChange("footerTitles3", data)} />

          <Card>
            <CardBody><Row><Col className="text-right"><Button color="primary" type="submit">Save All Changes</Button></Col></Row></CardBody>
          </Card>
        </Form>
      </div>
    </>
  );
};

export default Footer;
