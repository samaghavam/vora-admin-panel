import React, { useRef, useState } from "react";
import { Row, Col, Form, Button, Card, CardBody } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import SimpleBreadcrumb from "views/components/BreadCrumbs";
import Faq from "./Faq";

const CardContent = () => {
  const FaqRef = useRef(null);
  const [alert, setAlert] = useState(null);
  const breadcrumbItems = [
    { label: "Home", to: "/admin/dashboard" },
    { label: "Content management", to: "/admin/contents" },
    { label: "Card" },
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

    const isFaqValid = FaqRef.current.validate();
    if (isFaqValid) {
      const faqData = FaqRef.current.getData();

      const formData = new FormData();

      Object.keys(faqData).forEach((key) => {
        formData.append(`faq_${key}`, faqData[key]);
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
        <Faq ref={FaqRef} />
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

export default CardContent;
