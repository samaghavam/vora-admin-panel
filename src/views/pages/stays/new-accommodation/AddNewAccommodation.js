import React from "react";
import ReactWizard from "react-bootstrap-wizard";
import { Col } from "reactstrap";
import Step1 from "./step1/Step1";
import Step2 from "./step2/Step2.js";
import Step3 from "./Step3.js";

var steps = [
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
  return (
    <>
      <div className="content">
        <Col >
          <ReactWizard
            steps={steps}
            navSteps
            validate
            headerTextCenter
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
