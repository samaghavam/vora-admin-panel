import React from "react"; // Added useRef and useState
import { Row, Col, Card, CardHeader, CardTitle, CardBody } from "reactstrap"; // Added Button
import ReusableDoughnutChart from "views/components/DoughnutChart";
import FunnelRequestChart from "views/components/FunnelRequestChart";
import InfoStatCard from "views/components/InfoStateCard";
import ReusableLineChartCard from "views/components/LineChartCard";
import ReusableBarChartCard from "views/components/ReusableBarChartCard";
const CostCalculatorOveral = () => {
  // --- Data based on the attached photo ---
  const iconForStatCards = "icon-chat-33";
  const defaultIconGradient =
    "linear-gradient(135deg, #FF607D 0%, #FF8A65 100%)";
  // Row 1 Data
  const funnelRequestRateData = [
    { label: "Start operation", value: 78 },
    { label: "All steps gone", value: 62 },
    { label: "Add to card", value: 52 },
    { label: "Process page", value: 42 },
    { label: "Purchase", value: 22 },
  ];

  const averageSpendData = {
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
        label: "Spendings",
        data: [85, 102, 70, 68, 105, 128, 82],
        borderColor: "#e14ec9",
        pointBackgroundColor: "#e14ec9",
        pointBorderColor: "#fff",
        tension: 0.4,
      },
    ],
  };
  const averageSpendCategory = "Average Week $ 10,000";

  // Row 2 Data
  const roundedTripDurationData = {
    labels: [
      "2 days and less",
      "3-4 days",
      "5-6 days",
      "7-8 days",
      "9-10 days",
      "11 days and more",
    ],
    datasets: [
      { label: "Trips", data: [70, 90, 65, 75, 120, 80], barColor: "#e14ec9" },
    ],
  };

  const averageAIUsageData = {
    labels: [
      "month name",
      "month name",
      "month name",
      "month name",
      "month name",
      "month name",
    ],
    datasets: [
      { label: "Usage", data: [90, 115, 80, 90, 45, 60], barColor: "#e14ec9" },
    ],
  };

  // Row 3 & 4 Data (Doughnut Charts)
  const colorSet1 = [
    "rgba(54, 162, 235, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(255, 159, 64, 1)",
  ];
  const colorSet5Items = [
    "rgba(255, 159, 64, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 99, 132, 1)",
    "rgba(153, 102, 255, 1)",
  ];
  const colorSet4Items = [
    "rgba(255, 159, 64, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(201, 203, 207, 1)",
  ];

  const aiTypeUsedData = [
    { label: "Travel Assists", value: 78, color: colorSet1[0] },
    { label: "Travel based on budget", value: 22, color: colorSet1[1] },
    { label: "Budget calculator", value: 22, color: colorSet1[2] },
  ];
  const popularDestinationsData = [
    { label: "USA", value: 78, color: colorSet5Items[0] },
    { label: "Germany", value: 22, color: colorSet5Items[1] },
    { label: "Australia", value: 22, color: colorSet5Items[2] },
    { label: "United Kingdom", value: 22, color: colorSet5Items[3] },
    { label: "Canada", value: 22, color: colorSet5Items[4] },
  ];
  const popularOriginsData = [...popularDestinationsData];
  const travelGroupPercentagesData = [
    { label: "Adults", value: 78, color: colorSet1[0] },
    { label: "Children", value: 22, color: colorSet1[1] },
    { label: "Infants", value: 22, color: colorSet1[2] },
  ];
  const mostPopularTransportTypeData = [
    { label: "Airplane", value: 78, color: colorSet4Items[0] },
    { label: "Train", value: 22, color: colorSet4Items[1] },
    { label: "Personal", value: 22, color: colorSet4Items[2] },
    { label: "Not important", value: 22, color: colorSet4Items[3] },
  ];
  const mostPopularAccommodationTypeData = [
    { label: "Hotel", value: 78, color: colorSet4Items[0] },
    { label: "Accommodation", value: 22, color: colorSet4Items[1] },
    { label: "Personal", value: 22, color: colorSet4Items[2] },
    { label: "Not important", value: 22, color: colorSet4Items[3] },
  ];

  // Helper component for consistent Doughnut chart card styling (from AIInfographics example)
  const DoughnutCard = ({ title, chartDataItems }) => (
    <Card className="card-chart h-100">
      <CardHeader>
        <CardTitle tag="h5" className="text-muted mb-0">
          {title}
        </CardTitle>
      </CardHeader>
      <CardBody className="p-2 d-flex flex-column justify-content-center align-items-center">
        <ReusableDoughnutChart
          chartDataItems={chartDataItems}
          chartHeight="120px"
          chartWidth="110px"
        />
      </CardBody>
    </Card>
  );

  return (
    <div className="content">
      <h2 className="title text-white mb-4">All Time</h2>

      {/* Row 1 */}
      <Row className="mb-4">
        <Col lg="6" md="12" className="mb-lg-0">
          <FunnelRequestChart
            title="Funnel request rate"
            funnelDataItems={funnelRequestRateData}
            chartCanvasHeight="210px"
            chartBackgroundColor="#27293D" // Assuming this is the desired card background from your theme
          />
        </Col>
        <Col lg="6" md="12">
          <ReusableLineChartCard
            cardTitleText="Average Spend daily Past week"
            cardCategoryText={averageSpendCategory}
            chartData={averageSpendData}
            chartHeight="250px"
          />
        </Col>
      </Row>

      {/* Row 2 */}
      <Row>
        <Col lg="6" md="12" className="mb-4 mb-lg-0">
          <ReusableBarChartCard
            cardTitleText="Rounded trip duration"
            chartData={roundedTripDurationData}
            chartHeight="300px"
          />
        </Col>
        <Col lg="6" md="12">
          <ReusableBarChartCard
            cardTitleText="Average AI Usage"
            chartData={averageAIUsageData}
            chartHeight="300px"
          />
        </Col>
      </Row>

      {/* Row 3 - Doughnut Charts */}
      <Row className="mb-4">
        <Col lg="4" md="6" sm="12" className="mb-4 mb-lg-0">
          <DoughnutCard title="AI type used" chartDataItems={aiTypeUsedData} />
        </Col>
        <Col lg="4" md="6" sm="12" className="mb-4 mb-lg-0">
          <DoughnutCard
            title="Most Popular destinations"
            chartDataItems={popularDestinationsData}
          />
        </Col>
        <Col lg="4" md="6" sm="12" className="mb-4 mb-lg-0">
          <DoughnutCard
            title="Most Popular Origins"
            chartDataItems={popularOriginsData}
          />
        </Col>
      </Row>

      {/* Row 4 - Doughnut Charts */}
      <Row className="mb-4">
        <Col lg="4" md="6" sm="12" className="mb-4 mb-lg-0">
          <DoughnutCard
            title="Travel Group percentages"
            chartDataItems={travelGroupPercentagesData}
          />
        </Col>
        <Col lg="4" md="6" sm="12" className="mb-4 mb-lg-0">
          <DoughnutCard
            title="Most Popular Transport type"
            chartDataItems={mostPopularTransportTypeData}
          />
        </Col>
        <Col lg="4" md="6" sm="12" className="mb-4 mb-lg-0">
          <DoughnutCard
            title="Most Popular Accommodation type"
            chartDataItems={mostPopularAccommodationTypeData}
          />
        </Col>
      </Row>

      {/* Row 5 - Bar Charts */}
      <Row>
        <Col lg="6" md="12" className="mb-4 mb-lg-0">
          <ReusableBarChartCard
            cardTitleText="Average packages made"
            chartData={averageAIUsageData}
            chartHeight="300px"
          />
        </Col>
        <Col lg="6" md="12">
          <ReusableBarChartCard
            cardTitleText="Average loading time Usage"
            chartData={averageAIUsageData}
            chartHeight="300px"
          />
        </Col>
      </Row>
      {/* Row 6 - Bar Charts */}
      <Row>
        <Col lg="6" md="12" className="mb-4 mb-lg-0">
          <ReusableBarChartCard
            cardTitleText="Average packages made"
            chartData={averageAIUsageData}
            chartHeight="300px"
          />
        </Col>
        <Col lg="6" md="12">
          <ReusableBarChartCard
            cardTitleText="Average loading time Usage"
            chartData={averageAIUsageData}
            chartHeight="300px"
          />
        </Col>
      </Row>
      {/* Row 7 - Doughnut Charts */}
      <Row className="mb-4">
        <Col lg="4" md="6" sm="12" className="mb-4 mb-lg-0">
          <DoughnutCard title="AI type used" chartDataItems={aiTypeUsedData} />
        </Col>
        <Col lg="4" md="6" sm="12" className="mb-4 mb-lg-0">
          <DoughnutCard
            title="Most Popular destinations"
            chartDataItems={popularDestinationsData}
          />
        </Col>
        <Col lg="4" md="6" sm="12" className="mb-4 mb-lg-0">
          <DoughnutCard
            title="Most Popular Origins"
            chartDataItems={popularOriginsData}
          />
        </Col>
      </Row>
      {/* Row 8 - Doughnut Charts */}
      <Row className="mb-4">
        <Col lg="4" md="6" sm="12" className="mb-4 mb-lg-0">
          <DoughnutCard title="AI type used" chartDataItems={aiTypeUsedData} />
        </Col>
        <Col lg="4" md="6" sm="12" className="mb-4 mb-lg-0">
          <DoughnutCard
            title="Most Popular destinations"
            chartDataItems={popularDestinationsData}
          />
        </Col>
        <Col lg="4" md="6" sm="12" className=" mb-lg-0">
          <InfoStatCard
            icon={iconForStatCards}
            iconGradient={defaultIconGradient}
            title="Average number of packages made per request"
            value="150"
          />
          <InfoStatCard
            icon={iconForStatCards}
            iconGradient={defaultIconGradient}
            title="Average number of packages made per request"
            value="150"
          />
        </Col>
      </Row>
      {/* Row 8 - Doughnut Charts */}
      <Row className="mb-4">
        <Col lg="4" md="6" sm="12" className=" mb-lg-0">
          <InfoStatCard
            icon={iconForStatCards}
            iconGradient={defaultIconGradient}
            title="Average number of packages made per request"
            value="150"
          />
          <InfoStatCard
            icon={iconForStatCards}
            iconGradient={defaultIconGradient}
            title="Average number of packages made per request"
            value="150"
          />
        </Col>
        <Col lg="4" md="6" sm="12" className=" mb-lg-0">
          <InfoStatCard
            icon={iconForStatCards}
            iconGradient={defaultIconGradient}
            title="Average number of packages made per request"
            value="150"
          />
          <InfoStatCard
            icon={iconForStatCards}
            iconGradient={defaultIconGradient}
            title="Average number of packages made per request"
            value="150"
          />
        </Col>
        <Col lg="4" md="6" sm="12" className=" mb-lg-0">
          <InfoStatCard
            icon={iconForStatCards}
            iconGradient={defaultIconGradient}
            title="Average number of packages made per request"
            value="150"
          />
          <InfoStatCard
            icon={iconForStatCards}
            iconGradient={defaultIconGradient}
            title="Average number of packages made per request"
            value="150"
          />
        </Col>
      </Row>
    </div>
  );
};

export default CostCalculatorOveral;
