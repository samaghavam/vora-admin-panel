import React from 'react';
import { Row, Col, Card, CardHeader, CardBody, CardTitle } from 'reactstrap';
import ReusableBarChartCard from '../../components/ReusableBarChartCard'; 
import ReusableLineChartCard from '../../components/LineChartCard'; 
import ReusableDoughnutChart from '../../components/DoughnutChart'; 
import InfoStatCard from '../../components/InfoStateCard'; 

const VisaRequestInfographics = () => {
  // --- ROW 1 DATA ---
  const visaRequestChannelData = {
    labels: ["Airplane ticket", "Accommodation", "Direct"],
    datasets: [{ 
      label: "Requests", 
      data: [80, 100, 70], 
      barColor: "rgba(255, 99, 132, 0.8)" 
    }],
  };
  // Custom options for the "Visa Request channel" bar chart to match Y-axis from image
  const visaChannelChartOptions = {
    scales: {
      y: {
        min: 60,
        max: 130,
        ticks: {
          stepSize: 10,
        }
      }
    }
  };

  const dailySpendingsData = {
    labels: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [{ 
      label: "Spendings", 
      data: [85, 102, 70, 68, 105, 128, 82], 
      borderColor: "#e14ec9", 
      pointBackgroundColor: "#e14ec9",
      pointBorderColor: "#fff",
      tension: 0.4 
    }],
  };
  const dailySpendingsCategory = "Average Week $ 10,000";

  // --- ROW 2 DATA ---
  const visaTypeData = [ 
    { label: "Tourism", value: 78, color: "rgba(75, 192, 192, 1)" }, // Teal/Green from image
    { label: "Other", value: 22, color: "rgba(54, 162, 235, 1)" },   // Blue from image
  ];

  // InfoStatCard Data
  const iconForStatCards = "icon-chat-33"; // From image (chat bubble)
  const defaultIconGradient = "linear-gradient(135deg, #ff607d 0%, #ff8a65 100%)"; // Pink/Orange gradient

  return (
    <div className="content"> {/* Use className for global styling if needed */}
      <h2 className="title text-white mb-4">Visa request infographics</h2>

      {/* Row 1: Bar Chart & Line Chart */}
      <Row className="mb-4"> 
        <Col lg="5" md="12" className="mb-4 mb-lg-0"> 
          <ReusableBarChartCard 
            cardTitleText="Visa Request channel" 
            chartData={visaRequestChannelData} 
            chartHeight="280px" 
            customOptions={visaChannelChartOptions} 
          />
        </Col>
        <Col lg="7" md="12">
          <ReusableLineChartCard 
            cardTitleText="Daily spendings on visa requests" 
            cardCategoryText={dailySpendingsCategory} 
            chartData={dailySpendingsData} 
            chartHeight="280px" 
          />
        </Col>
      </Row>

      {/* Row 2: Doughnut Chart & InfoStatCards */}
      <Row className="mb-4"> 
        <Col lg="5" md="12" className="mb-4 mb-lg-0">
          <Card className="card-chart h-100">
            <CardHeader>
                <CardTitle tag="h4" className="mb-0">Visa type</CardTitle> 
            </CardHeader>
            <CardBody className="p-2 d-flex flex-column justify-content-center align-items-center">
                <ReusableDoughnutChart
                    chartDataItems={visaTypeData}
                    chartHeight="160px" 
                    chartWidth="150px"  
                />
            </CardBody>
          </Card>
        </Col>
        <Col lg="7" md="12">
          <Row>
            <Col md="6" sm="12" >
              <InfoStatCard
                icon={iconForStatCards}
                iconGradient={defaultIconGradient}
                title="Number of in progress visa"
                value="150" 
              />
            </Col>
            <Col md="6" sm="12" >
              <InfoStatCard
                icon={iconForStatCards}
                iconGradient={defaultIconGradient}
                title="Number of failed requests"
                value="150" 
              />
            </Col>
            <Col md="6" sm="12" > 
              <InfoStatCard
                icon={iconForStatCards}
                iconGradient={defaultIconGradient}
                title="Total Number of requested visa"
                value="150" 
              />
            </Col>
            <Col md="6" sm="12">
              <InfoStatCard
                icon={iconForStatCards}
                iconGradient={defaultIconGradient}
                title="Number of successful requests"
                value="150" 
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
export default VisaRequestInfographics