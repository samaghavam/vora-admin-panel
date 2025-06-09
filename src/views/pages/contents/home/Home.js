import React, { useRef, useState } from "react";
import { Row, Col, Form, Button, Card, CardBody } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";

// Your existing components
import SimpleBreadcrumb from "views/components/BreadCrumbs";
import HeroSection from "./HeroSection";
import Section2 from "./Section2"; // <-- Import Section2

const Home = () => {
  const heroSectionRef = useRef(null);
  const section2Ref = useRef(null); // <-- Add ref for Section2
  const [alert, setAlert] = useState(null);

  const breadcrumbItems = [
    { label: "Home", to: "/admin/dashboard" },
    { label: "Content management", to: "/admin/contents" },
    { label: "Home" },
  ];

  const hideAlert = () => {
    setAlert(null);
  };

  const showSuccessAlert = () => {
    setAlert(
      <SweetAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Success!"
        onConfirm={hideAlert}
        onCancel={hideAlert}
        confirmBtnBsStyle="success"
        confirmBtnText="OK"
      >
        Your data has been saved successfully.
      </SweetAlert>
    );
  };

  const showErrorAlert = (message) => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: "block", marginTop: "-100px" }}
        title="Error!"
        onConfirm={hideAlert}
        onCancel={hideAlert}
        confirmBtnBsStyle="danger"
        confirmBtnText="OK"
      >
        {message}
      </SweetAlert>
    );
  };

  // Mock API call function
  const mockApiCall = (data) => {
    console.log("Sending combined data to API:", data);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = true;
        if (isSuccess) {
          resolve({ status: 200, message: "Data saved!" });
        } else {
          reject({
            status: 500,
            message: "Failed to save data on the server.",
          });
        }
      }, 1500);
    });
  };

  const handleSave = async (event) => {
    event.preventDefault();

    // 1. Validate both child components
    const isHeroSectionValid = heroSectionRef.current.validate();
    const isSection2Valid = section2Ref.current.validate(); // <-- Validate Section2

    // 2. Proceed only if ALL forms are valid
    if (isHeroSectionValid && isSection2Valid) {
      // 3. Get data from both components
      const heroData = heroSectionRef.current.getData();
      const section2Data = section2Ref.current.getData();

      // 4. Combine data and prepare for API
      //const combinedData = {
      //  heroSection: heroData,
      //section2: section2Data,
      //};

      // When working with files, FormData is recommended
      const formData = new FormData();

      // Append hero data (prefixing keys to avoid clashes)
      Object.keys(heroData).forEach((key) => {
        formData.append(`hero_${key}`, heroData[key]);
      });

      // Append section 2 data
      Object.keys(section2Data).forEach((key) => {
        formData.append(`section2_${key}`, section2Data[key]);
      });

      // 5. Send data to API
      try {
        await mockApiCall(formData);
        showSuccessAlert();
      } catch (error) {
        showErrorAlert(error.message);
      }
    } else {
      console.log("Validation failed. Please check the form fields.");
    }
  };

  return (
    <div className="content">
      {alert}
      <Row>
        <Col md="12">
          <SimpleBreadcrumb
            items={breadcrumbItems}
            olClassName="screenshot-style-breadcrumb"
          />
        </Col>
      </Row>

      <Form onSubmit={handleSave}>
        <HeroSection ref={heroSectionRef} />
        <Section2 ref={section2Ref} /> {/* <-- Add Section2 component */}
        <Card>
          <CardBody>
            <Row>
              <Col className="text-right">
                <Button color="primary" type="submit">
                  Save
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Form>
    </div>
  );
};

export default Home;
