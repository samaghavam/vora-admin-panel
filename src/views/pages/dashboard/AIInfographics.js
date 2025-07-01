import React from 'react';
import { Row, Col, Card, CardHeader, CardBody, CardTitle } from 'reactstrap';
import ReusableLineChartCard from '../../components/LineChartCard';
import ReusableBarChartCard from '../../components/ReusableBarChartCard';
import ReusableDoughnutChart from '../../components/DoughnutChart';
import FunnelRequestChart from '../../components/FunnelRequestChart';

// AIInfographics Component
const AIInfographics = () => {
  // --- ROW 1 DATA ---
  const funnelRequestRateData = [
    { label: "Start operation", value: 78 },
    { label: "All steps gone", value: 64 },
    { label: "Add to card", value: 52 }, 
    { label: "Process page", value: 32 },
    { label: "Purchase", value: 12 },
  ];

  const averageSpendData = {
    labels: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [{ label: "Spendings", data: [85, 102, 70, 68, 105, 128, 82], borderColor: "#e14ec9", pointBackgroundColor: "#e14ec9", pointBorderColor: "#fff", tension: 0.4 }],
  };
  const averageSpendCategory = "Average Week $ 10,000";

  // --- ROW 2 DATA ---
  const roundedTripDurationData = {
    labels: ["2 days and less", "3-4 days", "5-6 days", "7-8 days", "9-10 days", "11 days and more"],
    datasets: [{ label: "Trips", data: [70, 90, 65, 75, 120, 80], barColor: "#e14ec9" }], 
  };

  const averagePackageIntroducedData = {
    labels: ["Travel Assist", "budget Calculator", "travel on budget"],
    datasets: [{ label: "Packages", data: [90, 115, 80], barColor: "#e14ec9" }], 
  };
  
  const colorSet1 = ["rgba(54, 162, 235, 1)", "rgba(75, 192, 192, 1)", "rgba(255, 159, 64, 1)"];
  const colorSet5Items = [
    "rgba(255, 159, 64, 1)", // Orange
    "rgba(75, 192, 192, 1)", // Teal/Green
    "rgba(54, 162, 235, 1)",  // Blue
    "rgba(255, 99, 132, 1)",  // Red
    "rgba(153, 102, 255, 1)" // Purple
  ];
   const colorSet4Items = [ 
    "rgba(255, 159, 64, 1)", // Orange
    "rgba(75, 192, 192, 1)", // Teal/Green
    "rgba(54, 162, 235, 1)",  // Blue
    "rgba(201, 203, 207, 1)"  // Grey for "Not important"
  ];


  // --- ROW 3 DATA (Doughnut Charts) ---
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

  // --- ROW 4 DATA (Doughnut Charts) ---
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


  // Helper component for consistent Doughnut chart card styling
  const DoughnutCard = ({ title, chartDataItems }) => (
    <Card className="card-chart h-100">
      <CardHeader>
        <CardTitle tag="h5" className="text-muted mb-0" style={{fontSize:'0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{title}</CardTitle>
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
    <div className="content" >
      <h2 className="title text-white mb-4">AI infographics</h2>

      {/* Row 1 */}
      <Row >
        <Col lg="6" md="12" className='mb-4'>
           <FunnelRequestChart 
            title="Funnel request rate" 
            funnelDataItems={funnelRequestRateData} 
            chartCanvasHeight="260px"
            chartBackgroundColor="#27293D"
          />
        </Col>
        <Col lg="6" md="12">
          <ReusableLineChartCard 
            cardTitleText="Average Spend daily Past week" 
            cardCategoryText={averageSpendCategory} 
            chartData={averageSpendData} 
            chartHeight="280px" 
          />
        </Col>
      </Row>

      {/* Row 2 */}
      <Row >
        <Col lg="6" md="12">
          <ReusableBarChartCard 
            cardTitleText="Rounded trip duration" 
            chartData={roundedTripDurationData} 
            chartHeight="300px" 
          />
        </Col>
        <Col lg="6" md="12">
          <ReusableBarChartCard 
            cardTitleText="Average package introduced" 
            chartData={averagePackageIntroducedData} 
            chartHeight="300px" 
          />
        </Col>
      </Row>
      
      {/* Row 3 - Doughnut Charts */}
      <Row className='mb-4'>
        <Col lg="4" md="6" sm="12"  >
            <DoughnutCard title="AI type used" chartDataItems={aiTypeUsedData} />
        </Col>
        <Col lg="4" md="6" sm="12">
            <DoughnutCard title="Most Popular destinations" chartDataItems={popularDestinationsData} />
        </Col>
        <Col lg="4" md="6" sm="12" >
            <DoughnutCard title="Most Popular Origins" chartDataItems={popularOriginsData} />
        </Col>
      </Row>

      {/* Row 4 - Doughnut Charts */}
      <Row> 
        <Col lg="4" md="6" sm="12" >
            <DoughnutCard title="Travel Group percentages" chartDataItems={travelGroupPercentagesData} />
        </Col>
        <Col lg="4" md="6" sm="12" >
            <DoughnutCard title="Most Popular Transport type" chartDataItems={mostPopularTransportTypeData} />
        </Col>
        <Col lg="4" md="6" sm="12" >
            <DoughnutCard title="Most Popular Accommodation type" chartDataItems={mostPopularAccommodationTypeData} />
        </Col>
      </Row>
    </div>
  );
};
export default AIInfographics