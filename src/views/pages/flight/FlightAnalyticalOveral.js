import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap"; // Using reactstrap for layout
import FunnelRequestChart from "../../components/FunnelRequestChart";
import ReusableLineChartCard from "views/components/LineChartCard";

const FlightAnalyticalOveral = () => {
  const funnelChartData = [
    { label: "Total search", value: 78 },
    { label: "Select ticket", value: 92 },
    { label: "Buying Process", value: 32 },
    { label: "Payment page", value: 22 },
    { label: "Purchase", value: 12 },
  ];

  const weeklySpendData = {
    labels: [
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ],
    datasets: [
      {
        label: "Daily Spend", // This will show in tooltips
        data: [80, 100, 80, 70, 90, 120, 80], // Example data from Chart 1.png
        // You can override lineColor per dataset if needed:
        // borderColor: '#00d6b4', // Example: a teal color
      },
    ],
  };
  return (
    <>
      <Card className="card-plain">
        <CardBody>
          <FunnelRequestChart
            title="Funnel request rate"
            funnelDataItems={funnelChartData}
          />
        </CardBody>
      </Card>

      <Row>
        <Col md="12">
          {" "}
          {/* Or md="8", lg="6" depending on desired width */}
          <ReusableLineChartCard
            cardTitleText="Average Spend daily Past week"
            cardCategoryText="Average Week $ 10,000"
            chartData={weeklySpendData}
            // You can customize further with other props:
            // lineColor="#1f8ef1" // Example: change to blue
            // chartHeight="300px"
          />
        </Col>
      </Row>
    </>
  );
};

export default FlightAnalyticalOveral;
