import React, { useRef, useState } from "react";
import { Row, Col, Form, Button, Card, CardBody } from "reactstrap";
import SweetAlert from 'react-bootstrap-sweetalert';

// Your existing components
import SimpleBreadcrumb from "views/components/BreadCrumbs";
import HeroSection from "./HeroSection"; // Make sure the path is correct

const Home = () => {
  const heroSectionRef = useRef(null);
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
    console.log("Sending data to API:", data);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // To test the error case, you can change this to `false`
        const isSuccess = true; 
        if (isSuccess) {
          resolve({ status: 200, message: "Data saved!" });
        } else {
          reject({ status: 500, message: "Failed to save data on the server." });
        }
      }, 1500); // Simulate network delay
    });
  };


  const handleSave = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // 1. Validate the child component's form
    const isHeroSectionValid = heroSectionRef.current.validate();
    
    if (isHeroSectionValid) {
        // 2. If valid, get data from child component
        const heroData = heroSectionRef.current.getData();

        // 3. Prepare data for API (using FormData for file uploads)
        const formData = new FormData();
        Object.keys(heroData).forEach(key => {
            formData.append(key, heroData[key]);
        });

        // 4. Send data to API
        try {
            await mockApiCall(formData);
            showSuccessAlert();
        } catch (error) {
            showErrorAlert(error.message);
        }

    } else {
      console.log("Validation failed in HeroSection.");
      // The validation messages will automatically appear in the HeroSection component
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