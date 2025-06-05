import React from "react";
import FlightInfographics from "./FlightInfographics";
import AccommodationInfographics from "./AccommodationInfographics";
import AIInfographics from "./AIInfographics";
import { VisaRequestInfographics } from "./VisaRequestInfographics";

const Dashboard = () => {

  return (
    <>
      <FlightInfographics />
      <AccommodationInfographics />
      <AIInfographics />
      <VisaRequestInfographics />
    </>
  );
};

export default Dashboard;
