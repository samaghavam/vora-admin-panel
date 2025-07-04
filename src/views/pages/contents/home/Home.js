import React, { useRef, useState } from "react";
import { Row, Col, Form, Button, Card, CardBody } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import SimpleBreadcrumb from "views/components/BreadCrumbs";
import HeroSection from "./HeroSection";
import Section2 from "./Section2";
import Section3 from "./Section3"; 
import AI2CardDescription from "./AI2CardDescription";
import AI3CardDescription from "./AI3CArdDescription";
import Section4 from "./Section4";
import Section5 from "./Section5";
import Section6 from "./Section6";

const Home = () => {
  const heroSectionRef = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null); 
  const sectionAL2Ref = useRef(null);
  const sectionAL3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);
  const section6Ref = useRef(null);

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

  // --- MOCK API & SAVE HANDLER ---
  const mockApiCall = (data) => {
    console.log("Sending combined data to API. FormData details:");
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }
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

    // 1. Validate ALL child components
    const isHeroSectionValid = heroSectionRef.current.validate();
    const isSection2Valid = section2Ref.current.validate();
    const isSection3Valid = section3Ref.current.validate(); 
    const isSection4Valid = section4Ref.current.validate();
    const isSection5Valid = section5Ref.current.validate(); 
    const isSection6Valid = section6Ref.current.validate(); 
    const isSectionAI2Valid = sectionAL2Ref.current.validate();
    const isSectionAI3Valid = sectionAL3Ref.current.validate();

    // 2. Proceed only if ALL forms are valid
    if (
      isHeroSectionValid &&
      isSection2Valid &&
      isSection3Valid &&
      isSectionAI2Valid &&
      isSectionAI3Valid &&
      isSection4Valid &&
      isSection5Valid &&
      isSection6Valid
    ) {
      // 3. Get data from ALL components
      const heroData = heroSectionRef.current.getData();
      const section2Data = section2Ref.current.getData();
      const section3Data = section3Ref.current.getData(); 
      const sectionAI2Data = sectionAL2Ref.current.getData();
      const sectionAI3Data = sectionAL3Ref.current.getData();
      const section4Data = section4Ref.current.getData();
      const section5Data = section5Ref.current.getData();
      const section6Data = section6Ref.current.getData();

      // 4. Combine data into a single FormData object
      const formData = new FormData();

      // Append hero data with a prefix
      Object.keys(heroData).forEach((key) => {
        formData.append(`hero_${key}`, heroData[key]);
      });

      // Append section 2 data with a prefix
      Object.keys(section2Data).forEach((key) => {
        formData.append(`section2_${key}`, section2Data[key]);
      });

      // Append section 3 data with a prefix
      Object.keys(section3Data).forEach((key) => {
        formData.append(`section3_${key}`, section3Data[key]);
      });
      // Append sectionAI2 data with a prefix
      Object.keys(sectionAI2Data).forEach((key) => {
        formData.append(`sectionAL2_${key}`, sectionAI2Data[key]);
      });
      // Append sectionAI3 data with a prefix
      Object.keys(sectionAI3Data).forEach((key) => {
        formData.append(`sectionAL3_${key}`, sectionAI3Data[key]);
      });
      // Append section 4 data with a prefix
      Object.keys(section4Data).forEach((key) =>
        formData.append(`section4_${key}`, section4Data[key])
      );
      // Append section 5 data with a prefix
      Object.keys(section5Data).forEach((key) =>
        formData.append(`section5_${key}`, section5Data[key])
      );
      // Append section 6 data with a prefix
      Object.keys(section5Data).forEach((key) =>
        formData.append(`section6_${key}`, section6Data[key])
      );

      // 5. Send the combined data to the API
      try {
        await mockApiCall(formData);
        showSuccessAlert();
      } catch (error) {
        showErrorAlert(error.message);
      }
    } else {
      console.log(
        "Validation failed. Please check the forms for required fields."
      );
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
        <Section2 ref={section2Ref} />
        <Section3 ref={section3Ref} /> 
        <AI2CardDescription ref={sectionAL2Ref} />
        <AI3CardDescription ref={sectionAL3Ref} />
        <Section4 ref={section4Ref} />
        <Section5 ref={section5Ref} />
        <Section6 ref={section6Ref}/>
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
