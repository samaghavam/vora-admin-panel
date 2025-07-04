import React, { useState } from "react";
import ReactWizard from "react-bootstrap-wizard";
import { Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

import Step1 from "./step1/Step1";
import Step2 from "./step2/Step2.js";
import Step3 from "./step3/Step3.js";

const steps = [
  {
    stepName: "About",
    stepIcon: "tim-icons icon-single-02",
    component: Step1,
  },
  {
    stepName: "Rooms",
    stepIcon: "tim-icons icon-settings-gear-63",
    component: Step2,
  },
  {
    stepName: "Highlights",
    stepIcon: "tim-icons icon-delivery-fast",
    component: Step3,
  },
];

const AddNewAccommodations = () => {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  // The wizardRef is no longer needed for the finish handler.

  // **THE FIX IS HERE:**
  // The `handleFinish` function now correctly accepts the `allStates` object
  // as an argument directly from the ReactWizard component.
  const handleFinish = (allStates) => {
    console.log("Wizard finished. Gathering data from all steps...");
    
    // Now, we directly use the `allStates` argument.
    if (!allStates || !allStates.About || !allStates.Rooms || !allStates.Highlights) {
      console.error("One of the step refs is still undefined:", allStates);
      setAlert(
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "-100px" }}
          title="Error!"
          onConfirm={() => setAlert(null)}
          onCancel={() => setAlert(null)}
          confirmBtnBsStyle="primary"
        >
          A step component failed to load correctly. Please refresh and try again.
        </SweetAlert>
      );
      return;
    }

    // Collect data from each step's exposed `getStepData` method
    const step1Data = allStates.About.getStepData();
    const step2Data = allStates.Rooms.getStepData();
    const step3Data = allStates.Highlights.getStepData();

    const finalPayload = {
      ...step1Data,
      ...step2Data,
      ...step3Data,
    };
    
    console.log("Final API Payload:", finalPayload);
    
    // Show success alert and navigate on confirm
    setAlert(
        <SweetAlert
          success
          style={{ display: "block", marginTop: "-100px" }}
          title="Success!"
          onConfirm={() => {
              setAlert(null);
              navigate('/admin/stays/accommodations');
          }}
          onCancel={() => setAlert(null)}
          confirmBtnBsStyle="primary"
        >
          New accommodation created successfully!
        </SweetAlert>
    );
  };

  return (
    <>
      {alert}
      <div className="content">
        <Col className="mr-auto ml-auto">
          <ReactWizard
            // The ref is no longer needed here.
            steps={steps}
            navSteps
            validate
            headerTextCenter
            finishButtonClick={handleFinish}
            finishButtonClasses="btn-wd btn-info"
            nextButtonClasses="btn-wd btn-info"
            previousButtonClasses="btn-wd"
            progressbar
            color="blue"
          />
        </Col>
      </div>
    </>
  );
};

export default AddNewAccommodations;
