import React from "react";
// react plugin used to create a form with multiple steps
import ReactWizard from "react-bootstrap-wizard";

// reactstrap components
import { Col } from "reactstrap";

// wizard steps
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

  const handleFinish = (allStates) => {
    console.log("Wizard finished. Gathering data from all steps...");
    console.log(allStates); // Let's check this again after the fix

    // ===================================================================================
    // START: Corrected Code
    // ===================================================================================
    // This logic was correct in principle. Now that we've diagnosed the ref issue,
    // it should work once the `validate` prop is removed.

    // Add safety checks to provide a clear error if it still fails.
    if (!allStates.About || !allStates.Rooms || !allStates.Highlights) {
      alert("A step component failed to load correctly. Check the console for errors.");
      console.error("One of the step refs is still undefined:", allStates);
      return;
    }

    const step1Data = allStates.About.getStepData();
    const step2Data = allStates.Rooms.getStepData();
    const step3Data = allStates.Highlights.getStepData();
    // ===================================================================================
    // END: Corrected Code
    // ===================================================================================

    const finalPayload = {
      ...step1Data,
      ...step2Data,
      ...step3Data,
    };
    
    console.log("Final API Payload:", finalPayload);
    alert("New accommodation added!");
  };

  return (
    <>
      <div className="content">
        <Col className="mr-auto ml-auto">
          <ReactWizard
            steps={steps}
            navSteps
            // validate // <-- THE 'validate' PROP HAS BEEN REMOVED
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