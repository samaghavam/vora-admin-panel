import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { VectorMap } from "react-jvectormap";

// A local map to look up country names from their codes, avoiding the window.jvm issue.
const countryNameMap = {
  AF: "Afghanistan", AL: "Albania", DZ: "Algeria", AO: "Angola", AR: "Argentina", AM: "Armenia", AU: "Australia", AT: "Austria", AZ: "Azerbaijan",
  BS: "Bahamas", BD: "Bangladesh", BY: "Belarus", BE: "Belgium", BZ: "Belize", BJ: "Benin", BT: "Bhutan", BO: "Bolivia", BA: "Bosnia and Herzegovina", BW: "Botswana", BR: "Brazil", BN: "Brunei Darussalam", BG: "Bulgaria", BF: "Burkina Faso", BI: "Burundi",
  KH: "Cambodia", CM: "Cameroon", CA: "Canada", CF: "Central African Republic", TD: "Chad", CL: "Chile", CN: "China", CO: "Colombia", CG: "Congo", CD: "Congo, Democratic Republic of the", CR: "Costa Rica", HR: "Croatia", CU: "Cuba", CY: "Cyprus", CZ: "Czech Republic",
  CI: "Côte d'Ivoire", DK: "Denmark", DJ: "Djibouti", DO: "Dominican Republic",
  EC: "Ecuador", EG: "Egypt", SV: "El Salvador", GQ: "Equatorial Guinea", ER: "Eritrea", EE: "Estonia", ET: "Ethiopia",
  FK: "Falkland Islands", FJ: "Fiji", FI: "Finland", FR: "France", GF: "French Guiana",
  GA: "Gabon", GM: "Gambia", GE: "Georgia", DE: "Germany", GH: "Ghana", GR: "Greece", GL: "Greenland", GT: "Guatemala", GN: "Guinea", GW: "Guinea-Bissau", GY: "Guyana",
  HT: "Haiti", HN: "Honduras", HU: "Hungary",
  IS: "Iceland", IN: "India", ID: "Indonesia", IR: "Iran", IQ: "Iraq", IE: "Ireland", IL: "Israel", IT: "Italy",
  JM: "Jamaica", JP: "Japan", JO: "Jordan",
  KZ: "Kazakhstan", KE: "Kenya", KP: "Korea, North", KR: "Korea, South", KW: "Kuwait", KG: "Kyrgyzstan",
  LA: "Lao People's Democratic Republic", LV: "Latvia", LB: "Lebanon", LS: "Lesotho", LR: "Liberia", LY: "Libya", LT: "Lithuania", LU: "Luxembourg",
  MK: "Macedonia", MG: "Madagascar", MW: "Malawi", MY: "Malaysia", ML: "Mali", MR: "Mauritania", MX: "Mexico", MD: "Moldova", MN: "Mongolia", ME: "Montenegro", MA: "Morocco", MZ: "Mozambique", MM: "Myanmar",
  NA: "Namibia", NP: "Nepal", NL: "Netherlands", NC: "New Caledonia", NZ: "New Zealand", NI: "Nicaragua", NE: "Niger", NG: "Nigeria", NO: "Norway",
  OM: "Oman",
  PK: "Pakistan", PS: "Palestine", PA: "Panama", PG: "Papua New Guinea", PY: "Paraguay", PE: "Peru", PH: "Philippines", PL: "Poland", PT: "Portugal", PR: "Puerto Rico",
  QA: "Qatar",
  RO: "Romania", RU: "Russian Federation", RW: "Rwanda",
  SA: "Saudi Arabia", SN: "Senegal", RS: "Serbia", SL: "Sierra Leone", SK: "Slovakia", SI: "Slovenia", SB: "Solomon Islands", SO: "Somalia", ZA: "South Africa", ES: "Spain", LK: "Sri Lanka", SD: "Sudan", SS: "South Sudan", SR: "Suriname", SJ: "Svalbard and Jan Mayen", SZ: "Swaziland", SE: "Sweden", CH: "Switzerland", SY: "Syrian Arab Republic",
  TW: "Taiwan", TJ: "Tajikistan", TZ: "Tanzania", TH: "Thailand", TL: "Timor-Leste", TG: "Togo", TR: "Turkey", TM: "Turkmenistan",
  UG: "Uganda", UA: "Ukraine", AE: "United Arab Emirates", GB: "United Kingdom", US: "United States", UY: "Uruguay", UZ: "Uzbekistan",
  VE: "Venezuela", VN: "Viet Nam",
  EH: "Western Sahara",
  YE: "Yemen",
  ZM: "Zambia", ZW: "Zimbabwe"
};

const MapModal = ({ isOpen, onClose, onLocationSelect }) => {
  const [selectedRegion, setSelectedRegion] = useState({ code: null, name: null });

  const handleRegionClick = (e, code) => {
    const countryName = countryNameMap[code] || code;
    setSelectedRegion({ code, name: countryName });
  };
  
  const handleSelect = () => {
    if (selectedRegion.name) {
      onLocationSelect(selectedRegion.name);
    }
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedRegion({ code: null, name: null });
      // **THE FIX IS HERE:**
      // Manually find and remove any lingering tooltip elements created by jvectormap
      // when the modal is closed.
      const tooltips = document.querySelectorAll('.jvectormap-tip');
      tooltips.forEach(tip => tip.remove());
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} toggle={onClose} size="lg" centered>
      <ModalHeader toggle={onClose} className="text-dark">
        Choose a Location
      </ModalHeader>
      <ModalBody>
        <p className="text-center text-dark">
          Selected: <strong className="text-primary">{selectedRegion.name || "None"}</strong>
        </p>
        <div style={{ width: "100%", height: "450px" }}>
          <VectorMap
            map={"world_mill"}
            backgroundColor="transparent"
            zoomOnScroll={false}
            containerStyle={{
              width: "100%",
              height: "100%",
            }}
            onRegionClick={handleRegionClick}
            regionStyle={{
              initial: {
                fill: "#e4e4e4",
                "fill-opacity": 0.9,
                stroke: "none",
                "stroke-width": 0,
                "stroke-opacity": 0,
              },
              hover: {
                "fill-opacity": 0.7,
                cursor: "pointer",
              },
              selected: {
                fill: "#1d8cf8",
              },
            }}
            regionsSelectable={true}
            regionsSelectableOne={true}
            series={{
              regions: [
                {
                  values: { [selectedRegion.code]: 1 },
                  scale: ["#1d8cf8", "#1d8cf8"],
                  normalizeFunction: "polynomial",
                },
              ],
            }}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSelect} disabled={!selectedRegion.code}>
          Select Location
        </Button>
      </ModalFooter>
    </Modal>
  );
};

MapModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLocationSelect: PropTypes.func.isRequired,
};

export default MapModal;
