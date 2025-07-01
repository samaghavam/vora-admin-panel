import React from 'react';
import { Row, Col, Card, CardBody, CardTitle, CardHeader } from 'reactstrap'; 
import ReusableLineChartCard from '../../components/LineChartCard';
import ReusableBarChartCard from '../../components/ReusableBarChartCard';
import ReusableDoughnutChart from '../../components/DoughnutChart';
import FunnelRequestChart from '../../components/FunnelRequestChart'; 

const FlightInfographics = () => {
  // --- ROW 1 DATA ---
  const averageSpendData = {
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
  const averageSpendCategory = "Average Week $ 10,000";

  const appliedFiltersData = {
    labels: ["Date", "Price", "Duration", "Class", "Baggage", "Layover"],
    datasets: [
      {
        label: "Times Applied",
        data: [90, 105, 70, 80, 120, 65], 
        barColor: "#e14ec9", 
      },
    ],
  };

  // --- ROW 2 DATA ---
  const roundedTripsDurationData = {
    labels: ["2 days and less", "3-4 days", "5-6 days", "7-8 days", "9-10 days", "11 days and more"],
    datasets: [
      {
        label: "Trips",
        data: [70, 90, 65, 75, 120, 80], 
        barColor: "#e14ec9", 
      },
    ],
  };

  const funnelRequestDataItems = [
    { label: "Total search", value: 78 },
    { label: "Select ticket", value: 57 },
    { label: "Buying Process", value: 42 },
    { label: "Payment page", value: 22 },
    { label: "Purchase", value: 10 },
  ];

  // --- ROW 3 DATA (Doughnut Charts) ---
  const popularDestinationsData = [
    { label: "USA", value: 50, color: "#FF9F40" },
    { label: "Germany", value: 15, color: "#4BC0C0" },
    { label: "Australia", value: 15, color: "#36A2EB" },
    { label: "United Kingdom", value: 10, color: "#FF6384" },
    { label: "Canada", value: 10, color: "#9966FF" },
  ];
  const popularOriginsData = [...popularDestinationsData]; 
  const popularFaresData = [
    { label: "Economy", value: 50, color: "#FF9F40" },
    { label: "Economy Plus", value: 15, color: "#4BC0C0" },
    { label: "Economy Pro", value: 15, color: "#36A2EB" },
    { label: "Business", value: 10, color: "#FF6384" },
    { label: "Business Plus", value: 10, color: "#9966FF" },
  ];

  // --- ROW 4 DATA (Doughnut Charts) ---
  const popularAirlinesData = [
    { label: "American airlines", value: 50, color: "#FF9F40" },
    { label: "Fly Emirates", value: 15, color: "#4BC0C0" },
    { label: "Turkish Airline", value: 15, color: "#36A2EB" },
    { label: "Air France", value: 10, color: "#FF6384" },
    { label: "Qatar Airline", value: 10, color: "#9966FF" },
  ];
  const travelTypeData = [
    { label: "One way", value: 78, color: "#36A2EB" }, // Blue
    { label: "Rounded", value: 22, color: "#4BC0C0" }, // Teal/Green
  ];
  const uaeVisaRequestData = [
    { label: "Total flights to UAE", value: 78, color: "#4BC0C0" }, // Teal/Green
    { label: "Visa Requested", value: 22, color: "#FFCE56" }, // Yellow/Orange
  ];

  // --- ROW 5 DATA (Doughnut Chart) ---
  const travelGroupData = [
    { label: "Adults", value: 56, color: "#4BC0C0" }, 
    { label: "Children", value: 22, color: "#FF9F40" }, 
    { label: "Infants", value: 22, color: "#36A2EB" }, 
  ];

  // Helper component to wrap Doughnut charts in Cards for consistent styling
  const DoughnutCard = ({ title, chartDataItems }) => (
    <Card className="card-chart h-100">
      <CardHeader>
        <CardTitle tag="h5" className="text-muted mb-0">{title}</CardTitle> 
      </CardHeader>
      <CardBody className="d-flex flex-column justify-content-center align-items-center p-3">
        <div className="w-100 d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
          <ReusableDoughnutChart
            chartDataItems={chartDataItems}
            chartHeight="150px" 
            chartWidth="150px"   
            title="" 
          />
        </div>
      </CardBody>
    </Card>
  );

  // Wrapper component for consistent card height in row 2
  const FunnelCard = ({ title, funnelDataItems }) => (
    <Card className="card-chart h-100">
      <CardHeader>
        <CardTitle tag="h4" className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardBody className="p-0">
        <FunnelRequestChart
          title=""
          funnelDataItems={funnelDataItems}
          chartCanvasHeight="240px"
        />
      </CardBody>
    </Card>
  );

  return (
    <div className='content'>
      <h2 className="title text-white mb-4">Flight Infographics</h2>

      {/* --- ROW 1: Line Chart & Bar Chart --- */}
      <Row className="mb-4">
        <Col lg="6" md="12" className="mb-4 mb-lg-0">
          <ReusableLineChartCard
            cardTitleText="Average Spend daily Past week"
            cardCategoryText={averageSpendCategory}
            chartData={averageSpendData}
            chartHeight="300px"
          />
        </Col>
        <Col lg="6" md="12">
          <ReusableBarChartCard
            cardTitleText="Most applied filters"
            chartData={appliedFiltersData}
            chartHeight="300px"
          />
        </Col>
      </Row>

      {/* --- ROW 2: Bar Chart & Funnel Chart --- */}
      <Row className="mb-4">
        <Col lg="6" md="12" className="mb-4 mb-lg-0">
          <ReusableBarChartCard
            cardTitleText="Rounded Trips Duration Average"
            chartData={roundedTripsDurationData}
            chartHeight="290px" 
          />
        </Col>
        <Col lg="6" md="12" className="mb-4 mb-lg-0">
          <FunnelCard
            title="Funnel request rate"
            funnelDataItems={funnelRequestDataItems}
          />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg="4" md="6" sm="12" >
          <DoughnutCard title="Most Popular destinations" chartDataItems={popularDestinationsData} />
        </Col>
        <Col lg="4" md="6" sm="12">
          <DoughnutCard title="Most Popular Origins" chartDataItems={popularOriginsData} />
        </Col>
        <Col lg="4" md="12" sm="12"> 
          <DoughnutCard title="Most Popular Fares" chartDataItems={popularFaresData} />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg="4" md="6" sm="12">
          <DoughnutCard title="Most Popular Airlines" chartDataItems={popularAirlinesData} />
        </Col>
        <Col lg="4" md="6" sm="12">
          <DoughnutCard title="Travel type ratio" chartDataItems={travelTypeData} />
        </Col>
        <Col lg="4" md="12" sm="12">
          <DoughnutCard title="UAE visa request ratio" chartDataItems={uaeVisaRequestData} />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg="4" md="6" sm="12" className="mb-4"> 
          <DoughnutCard title="Travel Group percentages" chartDataItems={travelGroupData} />
        </Col>
        <Col lg="8" md="6" sm="12"></Col>
      </Row>

    </div>
  );
};

export default FlightInfographics;