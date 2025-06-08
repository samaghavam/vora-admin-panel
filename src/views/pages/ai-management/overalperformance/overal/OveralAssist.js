import React from "react";
import { Row, Col, Card, CardHeader, CardBody, CardTitle } from "reactstrap";

// Assuming these chart components are located in your project's code base as specified
import ReusableDoughnutChart from "../../../../components/DoughnutChart";
import FunnelRequestChart from "../../../../components/FunnelRequestChart";
import InfoStatCard from "../../../../components/InfoStateCard";

const OveralAsist = () => {
  // --- Data based on the "Travel Assist" screenshot ---

  const aiBookingPercentageData = [
    { label: "Used", value: 78, color: "rgba(75, 192, 192, 1)" },
    { label: "Booked", value: 22, color: "#d93a54" }, // A reddish color
  ];

  const travelGroupPercentagesData = [
    { label: "Adults", value: 78, color: "rgba(75, 192, 192, 1)" },
    { label: "Children", value: 22, color: "rgba(255, 99, 132, 1)" },
    { label: "Infants", value: 22, color: "rgba(54, 162, 235, 1)" },
  ];

  const funnelRequestRateData = [
    { label: "Start operation", value: 78 },
    { label: "All steps gone", value: 22 },
    { label: "Add to Card", value: 22 },
    { label: "Process page", value: 22 },
    { label: "Purchase", value: 22 },
  ];

  const noPackagesFoundData = [
    { label: "All usage", value: 78, color: "rgba(75, 192, 192, 1)" },
    { label: "No package to show", value: 22, color: "#d93a54" }, // A reddish color
  ];

  const iconForStatCards = "icon-chat-33";
  const defaultIconGradient =
    "linear-gradient(135deg, #FF607D 0%, #FF8A65 100%)";

  // Helper component for consistent Doughnut chart card styling
  const DoughnutCard = ({ title, chartDataItems }) => (
    <Card className="card-chart h-100">
      <CardHeader>
        <CardTitle tag="h5" className="text-muted mb-0">
          {title}
        </CardTitle>
      </CardHeader>
      <CardBody className="p-3 d-flex flex-column justify-content-center align-items-center">
        <ReusableDoughnutChart
          chartDataItems={chartDataItems}
          chartHeight="180px"
          //chartWidth="100%"
        />
      </CardBody>
    </Card>
  );

  return (
    <div>
      <Row className="justify-content-center">
        {/* Using a single column for the vertical layout */}
        <Col>
          <h4 className="title text-white mb-4 text-center">Travel Assist</h4>

          {/* Each component is placed in its own row within the main column */}
          <Row className="mb-2">
            <Col>
              <DoughnutCard
                title="AI's Booking percentage"
                chartDataItems={aiBookingPercentageData}
              />
            </Col>
          </Row>

          <Row className="mb-2">
            <Col>
              <InfoStatCard
                icon={iconForStatCards}
                iconGradient={defaultIconGradient}
                title="Number of requests"
                value="150"
              />
            </Col>
          </Row>

          <Row className="mb-2">
            <Col>
              <InfoStatCard
                icon={iconForStatCards}
                iconGradient={defaultIconGradient}
                title="Number of add to cards requests"
                value="150"
              />
            </Col>
          </Row>

          <Row className="mb-2">
            <Col>
              <InfoStatCard
                icon={iconForStatCards}
                iconGradient={defaultIconGradient}
                title="Number of Purchases"
                value="150"
              />
            </Col>
          </Row>

          <Row className="mb-2">
            <Col>
              <DoughnutCard
                title="Travel Group percentages"
                chartDataItems={travelGroupPercentagesData}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <InfoStatCard
                icon={iconForStatCards}
                iconGradient={defaultIconGradient}
                title="Number of packages made"
                value="150"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <InfoStatCard
                icon={iconForStatCards}
                iconGradient={defaultIconGradient}
                title="Average loading time"
                value="150"
              />
            </Col>
          </Row>

          <Row className="mb-2">
            <Col>
              <FunnelRequestChart
                title="Funnel request rate"
                funnelDataItems={funnelRequestRateData}
                chartBackgroundColor="#27293D" // Assuming this is the desired card background from your theme
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <InfoStatCard
                icon={iconForStatCards}
                iconGradient={defaultIconGradient}
                title="Number of time with no packages found"
                value="150"
              />
            </Col>
          </Row>

          <Row className="mb-2">
            <Col>
              <DoughnutCard
                title="Ratio of no packages found"
                chartDataItems={noPackagesFoundData}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <InfoStatCard
                icon={iconForStatCards}
                iconGradient={defaultIconGradient}
                title="Average number of packages made per request"
                value="150"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default OveralAsist;
