import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";

// Assuming these components are located in your project's '../../components/' directory
import ReusableDoughnutChart from "../../components/DoughnutChart";
import InfoStatCard from "../../components/InfoStateCard"; // Using the import name from your provided code

const StaysAnalyticMonth = () => {
  const searchBookedData = [
    { label: "Searched", value: 78, color: "rgba(75, 192, 192, 1)" },
    { label: "Booked", value: 22, color: "rgba(54, 162, 235, 1)" },
  ];

  const searchBookedData2 = [
    { label: "Adult", value: 18, color: "rgba(52, 154, 239, 1)" },
    { label: "Children", value: 42, color: "rgba(82, 204, 103, 1)" },
    { label: "Infants", value: 62, color: "rgba(255, 255, 255, 1)" },
  ];


  // Common props for InfoStatCards from the image
  const iconForStatCards = "icon-chat-33"; // Chat bubble icon from image
  const defaultIconGradient =
    "linear-gradient(135deg, #FF607D 0%, #FF8A65 100%)"; // Pink/Orange gradient from image

  return (
    <div className="content">
      {" "}
      {/* Added a generic className for potential global styling */}
      <h3 className="title text-white ">This month</h3>
      <Row>
        <Col lg="4" md="12">
          <Card className="card-chart">
            <CardBody className="p-3">
              <ReusableDoughnutChart
                title="Ratio of search and booked accommodations"
                chartDataItems={searchBookedData}
                chartHeight="175px"
                chartWidth="170px"
              />
            </CardBody>
          </Card>
        </Col>
        <Col lg="8" md="12">
          <Row>
            <Col lg="6" md="12">
              <InfoStatCard
                icon={iconForStatCards}
                iconGradient={defaultIconGradient}
                title="Number of booked flights this month"
                value="150"
              />
            </Col>
            <Col lg="6">
              <InfoStatCard
                icon={iconForStatCards}
                iconGradient={defaultIconGradient}
                title="Number of booked flights this month"
                value="150"
              />
            </Col>
          </Row>
          <Row>
            <Col lg="6" md="12">
              <InfoStatCard
                icon={iconForStatCards}
                iconGradient={defaultIconGradient}
                title="Number of booked flights this month"
                value="150"
              />
            </Col>
            <Col lg="6">
              <InfoStatCard
                icon={iconForStatCards}
                iconGradient={defaultIconGradient}
                title="Number of booked flights this month"
                value="150"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col lg='4'>
        <Card className="card-chart">
            <CardBody className="p-3">
              <ReusableDoughnutChart
                title="Ratio of search and booked accommodations"
                chartDataItems={searchBookedData}
                chartHeight="175px"
                chartWidth="170px"
              />
            </CardBody>
          </Card> 
        </Col>
        <Col lg='4'>
        <Card className="card-chart">
            <CardBody className="p-3">
              <ReusableDoughnutChart
                title="Ratio of search and booked accommodations"
                chartDataItems={searchBookedData2}
                chartHeight="175px"
                chartWidth="170px"
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StaysAnalyticMonth;
