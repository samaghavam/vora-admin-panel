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
    { label: "Select ticket", value: 27 },
    { label: "Buying Process", value: 22 },
    { label: "Payment page", value: 22 },
    { label: "Purchase", value: 22 },
  ];

  // --- ROW 3 DATA (Doughnut Charts) ---
  const popularDestinationsData = [
    { label: "USA", value: 78, color: "rgba(255, 159, 64, 1)" },
    { label: "Germany", value: 22, color: "rgba(75, 192, 192, 1)" },
    { label: "Australia", value: 22, color: "rgba(54, 162, 235, 1)" },
    { label: "United Kingdom", value: 22, color: "rgba(255, 99, 132, 1)" },
    { label: "Canada", value: 22, color: "rgba(153, 102, 255, 1)" },
  ];
  const popularOriginsData = [...popularDestinationsData]; 
  const popularFaresData = [
    { label: "Economy", value: 78, color: "rgba(255, 159, 64, 1)" },
    { label: "Economy Plus", value: 22, color: "rgba(75, 192, 192, 1)" },
    { label: "Economy Pro", value: 22, color: "rgba(54, 162, 235, 1)" },
    { label: "Business", value: 22, color: "rgba(255, 99, 132, 1)" },
    { label: "Business Plus", value: 22, color: "rgba(153, 102, 255, 1)" },
  ];


  // --- ROW 4 DATA (Doughnut Charts) ---
  const popularAirlinesData = [
    { label: "American airlines", value: 78, color: "rgba(255, 159, 64, 1)" },
    { label: "Fly Emirates", value: 22, color: "rgba(75, 192, 192, 1)" },
    { label: "Turkish Airline", value: 22, color: "rgba(54, 162, 235, 1)" },
    { label: "Air France", value: 22, color: "rgba(255, 99, 132, 1)" },
    { label: "Qatar Airline", value: 22, color: "rgba(153, 102, 255, 1)" },
  ];
  const travelTypeData = [
    { label: "One way", value: 78, color: "rgba(54, 162, 235, 1)" }, // Blue
    { label: "Rounded", value: 22, color: "rgba(75, 192, 192, 1)" }, // Teal/Green
  ];
  const uaeVisaRequestData = [
    { label: "Total flights to UAE", value: 78, color: "rgba(75, 192, 192, 1)" }, // Teal/Green
    { label: "Visa Requested", value: 22, color: "rgba(255, 206, 86, 1)" }, // Yellow/Orange
  ];

  // --- ROW 5 DATA (Doughnut Chart) ---
  const travelGroupData = [
    { label: "Adults", value: 78, color: "rgba(75, 192, 192, 1)" }, 
    { label: "Children", value: 22, color: "rgba(255, 159, 64, 1)" }, 
    { label: "Infants", value: 22, color: "rgba(153, 102, 255, 1)" }, 
  ];

  // Helper component to wrap Doughnut charts in Cards for consistent styling
  const DoughnutCard = ({ title, chartDataItems }) => (
    <Card className="card-chart h-100">
      <CardHeader>
        <CardTitle tag="h5" className="text-muted mb-0">{title}</CardTitle> 
      </CardHeader>
      <CardBody className="d-flex flex-column justify-content-center align-items-center">
        <ReusableDoughnutChart
          chartDataItems={chartDataItems}
          chartHeight="160px" 
          chartWidth="100%"   
          title="" 
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
            chartHeight="300px" 
          />
        </Col>
        <Col lg="6" md="12">
          <FunnelRequestChart
            title="Funnel request rate"
            funnelDataItems={funnelRequestDataItems}
            chartCanvasHeight="260px" 
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
