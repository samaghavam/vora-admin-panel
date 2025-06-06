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

  // This function will be called when the finish button is clicked.
  // The 'allStates' parameter is an object provided by ReactWizard that contains
  // the refs to each step, allowing you to call their methods.
  const handleFinish = (allStates) => {
    console.log("Wizard finished. Gathering data from all steps...");
    console.log(allStates); // You can inspect this object to see the state of the wizard

    // --- BEST PRACTICE FOR API SUBMISSION ---
    // 1. Call the `getStepData` method from each step's ref.
    //    We defined this method in our Step components using useImperativeHandle.
    // Note: The key for each step in `allStates` is its `stepName`.
    const step1Data = allStates.About.getStepData();
    const step2Data = allStates.Rooms.getStepData();
    const step3Data = allStates.Highlights.getStepData();

    // 2. Combine all data into a single payload for the API.
    const finalPayload = {
      ...step1Data, // Contains { generalInfo, facilities, rules }
      ...step2Data, // Contains { rooms }
      ...step3Data, // Contains { highlightFeatures, coverImage }
    };
    
    // 3. In a real application, you would now create FormData to handle file uploads
    //    and send the payload to your backend API.
    console.log("Final API Payload:", finalPayload);
    //
    // const formData = new FormData();
    // formData.append('generalInfo', JSON.stringify(finalPayload.generalInfo));
    // formData.append('facilities', JSON.stringify(finalPayload.facilities));
    // // Handle rule files
    // finalPayload.rules.forEach((rule, index) => {
    //   formData.append(`rule_icon_${index}`, rule.iconFile);
    // });
    // // Handle room files
    // finalPayload.rooms.forEach((room, index) => {
    //   formData.append(`room_image_${index}`, room.roomImage);
    // });
    // // Handle cover image
    // formData.append('coverImage', finalPayload.coverImage);
    //
    // api.post('/accommodations', formData).then(...);

    // 4. For now, show the alert as requested.
    alert("New accommodation added!");
  };

  return (
    <>
      <div className="content">
        <Col className="mr-auto ml-auto"> {/* Added md="10" for better centering on larger screens */}
          <ReactWizard
            steps={steps}
            navSteps
            validate
            headerTextCenter
            // THE KEY CHANGE: Added the finishButtonClick prop
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
