import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import ReusableDoughnutChart from '../../components/DoughnutChart';
import InfoStatCard from '../../components/InfoStateCard';
import ReusableBarChartCard from '../../components/ReusableBarChartCard';
import ReusableLineChartCard from '../../components/LineChartCard';

const VisaAnalyticMonth = () => {
  const visaChannelData = {
    labels: ["Airplane ticket", "Accommodation", "Direct"],
    datasets: [
      {
        label: "Requests",
        data: [80, 100, 70], 
        barColor: "#e14ec9", 
      },
    ],
  };
  const dailySpendingsData = {
    labels: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [
      {
        label: "Spendings",
        data: [85, 102, 70, 68, 105, 128, 82], 
        borderColor: "#e14ec9", 
        pointBackgroundColor: "#e14ec9",
        pointBorderColor: "#fff",
        tension: 0.4, 
      },
    ],
  };
  const dailySpendingsCategory = "Average Week $ 10,000"; // From image

  // Data for Doughnut Chart: Visa type
  // Based on the uploaded image
  const visaTypeData = [
    { label: "Tourism", value: 78, color: "rgba(75, 192, 192, 1)" }, // Teal/Greenish from image
    { label: "Other", value: 22, color: "rgba(54, 162, 235, 1)" },   // Blueish from image
  ];

  // Data for InfoStatCards
  // Using the same icon and gradient as the original FlightAnalyticMonth for consistency,
  // as the image shows similar styled cards.
  const iconForStatCards = "icon-chat-33"; // Chat bubble icon, as seen in image
  const defaultIconGradient = "linear-gradient(135deg, #FF607D 0%, #FF8A65 100%)"; // Pink/Orange gradient

  return (
    <div>
      <h3 className="title text-white mb-4">This month</h3> {/* Added mb-4 for spacing */}
      
      {/* Top Row: Bar Chart and Line Chart */}
      <Row>
        <Col lg="5" md="12" className="mb-4 mb-lg-0">
          <ReusableBarChartCard
            cardTitleText="Visa Request channel"
            chartData={visaChannelData}
            chartHeight="280px" // Adjust height as needed
            // defaultBarColor can be overridden by dataset's barColor if ReusableBarChartCard supports it
          />
        </Col>
        <Col lg="7" md="12">
          <ReusableLineChartCard
            cardTitleText="Daily spendings on visa requests"
            cardCategoryText={dailySpendingsCategory}
            chartData={dailySpendingsData}
            chartHeight="280px" // Adjust height as needed
            // lineColor can be overridden by dataset's borderColor if ReusableLineChartCard supports it
          />
        </Col>
      </Row>

      {/* Bottom Row: Doughnut Chart and InfoStatCards */}
      <Row className="mt-4"> {/* Added margin-top for spacing between rows */}
        <Col lg="5" md="12" className="mb-4 mb-lg-0">
          {/* ReusableDoughnutChart does not include Card, so we wrap it here for consistent styling */}
          <Card className="card-chart h-100"> {/* Added h-100 for consistent height if needed */}
            <CardBody className="d-flex flex-column justify-content-center"> {/* Centering content */}
              <ReusableDoughnutChart
                title="Visa type" // This title is styled internally by ReusableDoughnutChart
                chartDataItems={visaTypeData}
                chartHeight="180px" // Adjust as needed
                chartWidth="100%"  // Make chart responsive within card body, adjust as per ReusableDoughnutChart's capability
              />
            </CardBody>
          </Card>
        </Col>
        <Col lg="7" md="12">
          <Row>
            <Col md="6" sm="6" className="mb-4">
              <InfoStatCard
                icon={iconForStatCards}
                iconGradient={defaultIconGradient}
                title="Number of in progress visa"
                value="150" // From image
              />
            </Col>
            <Col md="6" sm="6" className="mb-4">
              <InfoStatCard
                icon={iconForStatCards}
                iconGradient={defaultIconGradient}
                title="Number of failed requests"
                value="150" // From image
              />
            </Col>
            <Col md="6" sm="6" className="mb-4 mb-md-0"> {/* Adjusted mb for responsiveness */}
              <InfoStatCard
                icon={iconForStatCards}
                iconGradient={defaultIconGradient}
                title="Total Number of requested visa"
                value="150" // From image
              />
            </Col>
            <Col md="6" sm="6">
              <InfoStatCard
                icon={iconForStatCards}
                iconGradient={defaultIconGradient}
                title="Number of successful requests"
                value="150" // From image
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default VisaAnalyticMonth;
