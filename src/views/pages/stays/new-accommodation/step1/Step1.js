import React, { useRef, useImperativeHandle, forwardRef } from "react";
import FacilitiesSection from "./FacilitiesSection";
import GeneralInfoSection from "./GeneralInfoSection";
import RulesSection from "./RulesSection";

// This component is now a simple container that delegates all logic to its children.
const Step1 = forwardRef((props, ref) => {
  // Create refs for each child section component
  const generalInfoRef = useRef(null);
  const facilitiesRef = useRef(null);
  const rulesRef = useRef(null);

  // Expose the validation and data-gathering functions to the parent wizard
  useImperativeHandle(ref, () => ({
    // This function is called when you click "Next"
    isValidated: () => {
      // Call the validate method on each child component using its ref
      const isGeneralValid = generalInfoRef.current.validate();
      const isFacilitiesValid = facilitiesRef.current.validate();
      const isRulesValid = rulesRef.current.validate();
      
      // The step is valid only if all child sections return true
      return isGeneralValid && isFacilitiesValid && isRulesValid;
    },
    // This function is called at the final step to get all data
    getStepData: () => {
      // Collect data from each child component
      return {
        generalInfo: generalInfoRef.current.getData(),
        facilities: facilitiesRef.current.getData(),
        rules: rulesRef.current.getData(),
      };
    },
  }));

  return (
    <>
      {/* Pass the refs to the child components.
        No other props (like data or state setters) are needed,
        as each component is now self-contained.
      */}
      <GeneralInfoSection ref={generalInfoRef} />
      <FacilitiesSection ref={facilitiesRef} />
      <RulesSection ref={rulesRef} />
    </>
  );
});

export default Step1;
