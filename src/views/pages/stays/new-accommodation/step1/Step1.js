import FacilitiesSection from "./FacilitiesSection";
import GeneralInfoSection from "./GeneralInfoSection";
import RulesSection from "./RulesSection";
import React from "react";

const Step1 = React.forwardRef((props, ref) => {
  const [formData, setFormData] = React.useState({
    accommodationName: "",
    accommodationType: "Accommodation",
    stars: "",
    address: "",
    description: "",
    facilities: (() => { 
      const initialFacilities = {}; // Corrected: removed underscore and const keyword mismatch
      for (let i = 1; i <= 48; i++) initialFacilities[`facility${i}`] = false; // Corrected: used correct variable name
      return initialFacilities; // Corrected: used correct variable name
    })(),
    rules: [{ ruleName: "", ruleIconFile: null, ruleIconPreview: null, ruleDescription: "", checkInTime: "", checkOutTime: "" }],
  });

  // Centralized state for validation statuses
  const [validationStates, setValidationStates] = React.useState({
    accommodationNameState: "",
    starsState: "",
    addressState: "",
    descriptionState: "",
  });

  const fileInputRef = React.useRef(null);
  const [currentRuleIndexForUpload, setCurrentRuleIndexForUpload] = React.useState(null);

  // --- Handlers passed to sub-components or used for rules ---
  const handleFacilityChange = (event) => {
    setFormData(prev => ({
      ...prev,
      facilities: {
        ...prev.facilities,
        [event.target.name]: event.target.checked,
      }
    }));
  };
  
  const handleRuleChange = (index, field, value) => {
    const newRules = [...formData.rules];
    newRules[index][field] = value;
    setFormData(prev => ({ ...prev, rules: newRules }));
  };

  const addNewRule = () => {
    setFormData(prev => ({
      ...prev,
      rules: [...prev.rules, { ruleName: "", ruleIconFile: null, ruleIconPreview: null, ruleDescription: "", checkInTime: "", checkOutTime: "" }]
    }));
  };
  
  const triggerIconUpload = (index) => {
    setCurrentRuleIndexForUpload(index);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRuleIconChange = (event) => {
    const file = event.target.files[0];
    if (file && currentRuleIndexForUpload !== null) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newRules = [...formData.rules];
        newRules[currentRuleIndexForUpload].ruleIconPreview = reader.result;
        newRules[currentRuleIndexForUpload].ruleIconFile = file; 
        setFormData(prev => ({ ...prev, rules: newRules }));
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) {
        fileInputRef.current.value = ""; 
    }
    setCurrentRuleIndexForUpload(null);
  };

  // --- Validation ---
  const isValidated = () => {
    let valid = true;
    let newStates = { ...validationStates };

    if (!formData.accommodationName) { newStates.accommodationNameState = "has-danger"; valid = false; } 
    else { newStates.accommodationNameState = "has-success"; }
    
    if (formData.stars === "") { newStates.starsState = "has-danger"; valid = false; } 
    else { newStates.starsState = "has-success"; }

    if (!formData.address) { newStates.addressState = "has-danger"; valid = false; } 
    else { newStates.addressState = "has-success"; }

    if (!formData.description) { newStates.descriptionState = "has-danger"; valid = false; } 
    else { newStates.descriptionState = "has-success"; }
    
    // Basic validation for first rule's check-in/out for demonstration
    // Ideally, this logic would be more robust or within the RulesSection
    if (formData.rules[0] && !formData.rules[0].checkInTime) { valid = false; /* Set specific rule state here */ }
    if (formData.rules[0] && !formData.rules[0].checkOutTime) { valid = false; /* Set specific rule state here */ }


    setValidationStates(newStates);
    return valid;
  };

  React.useImperativeHandle(ref, () => ({
    isValidated: isValidated,
    getStepData: () => {
      return {
        generalInfo: {
          name: formData.accommodationName,
          type: formData.accommodationType,
          stars: formData.stars,
          address: formData.address,
          description: formData.description,
        },
        facilities: formData.facilities, 
        rules: formData.rules.map(rule => ({
          name: rule.ruleName,
          description: rule.ruleDescription,
          checkIn: rule.checkInTime,
          checkOut: rule.checkOutTime,
          iconFile: rule.ruleIconFile, 
        })),
      };
    },
  }));

  return (
    <>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleRuleIconChange} 
        style={{ display: 'none' }} 
        accept="image/*"
      />

      <GeneralInfoSection 
        data={formData} 
        setData={setFormData} 
        states={validationStates} 
        setStates={setValidationStates} 
      />
      <FacilitiesSection 
        facilities={formData.facilities} 
        onFacilityChange={handleFacilityChange} 
      />
      <RulesSection 
        rules={formData.rules} 
        onRuleChange={handleRuleChange} 
        onAddNewRule={addNewRule}
        onIconUploadTrigger={triggerIconUpload}
      />
    </>
  );
});

export default Step1;