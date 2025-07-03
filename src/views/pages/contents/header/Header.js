import React, { useRef, useState } from "react";
import { Row, Col, Form, Button, Card, CardBody } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import SimpleBreadcrumb from "views/components/BreadCrumbs";
import HeaderImage from "./HeaderImage";
import HeaderTitle from "./HeaderTitle";
import HeaderSubtitle from "./HeaderSubtitle";

const HeaderContent = () => {
  const headerImageRef = useRef(null);
  const headerTitleRef = useRef(null);
  const HeaderSubtitleRef = useRef(null)
  const [alert, setAlert] = useState(null);
  const breadcrumbItems = [
    { label: "Home", to: "/admin/dashboard" },
    { label: "Content management", to: "/admin/contents" },
    { label: "Header" },
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

    const isHeaderImageValid = headerImageRef.current.validate();
    const isHeaderTitleValid = headerTitleRef.current.validate();
    const isSubHeaderValid = HeaderSubtitleRef.current.validate()
    if (isHeaderImageValid && isHeaderTitleValid && isSubHeaderValid) {
      const headerImageData = headerImageRef.current.getData();
      const headerTitleData = headerTitleRef.current.getData();
      const subHeaderData = HeaderSubtitleRef.current.getData()

      const formData = new FormData();

      Object.keys(headerImageData).forEach((key) => {
        formData.append(`faq_${key}`, headerImageData[key]);
      });

      Object.keys(headerTitleData).forEach((key) => {
        formData.append(`faq_${key}`, headerTitleData[key]);
      });
      Object.keys(subHeaderData).forEach((key) => {
        formData.append(`faq_${key}`, subHeaderData[key]);
      });
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
      <HeaderImage ref={headerImageRef}/>
      <HeaderTitle ref={headerTitleRef}/>
      <HeaderSubtitle ref={HeaderSubtitleRef}/>
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

export default HeaderContent;
