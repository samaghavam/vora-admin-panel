import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import ReusableDoughnutChart from '../../components/DoughnutChart';
import InfoStatCard from '../../components/InfoStateCard';
import ReusableBarChartCard from '../../components/ReusableBarChartCard';
import ReusableLineChartCard from '../../components/LineChartCard';

const VisaAnalyticAllTime = () => {
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
  const dailySpendingsCategory = "Average Week $ 10,000"; 
  const visaTypeData = [
    { label: "Tourism", value: 78, color: "rgba(75, 192, 192, 1)" }, 
    { label: "Other", value: 22, color: "rgba(54, 162, 235, 1)" },   
  ];

  const iconForStatCards = "icon-chat-33"; 
  const defaultIconGradient = "linear-gradient(135deg, #FF607D 0%, #FF8A65 100%)"; 

  return (
    <div>
      <h3 className="title text-white mb-4">All Time</h3> 
      
      <Row>
        <Col lg="5" md="12" className="mb-4 mb-lg-0">
          <ReusableBarChartCard
            cardTitleText="Visa Request channel"
            chartData={visaChannelData}
            chartHeight="280px" 
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

      <Row className="mt-4"> 
        <Col lg="5" md="12" className="mb-4 mb-lg-0">
          <Card className="card-chart h-100"> 
            <CardBody className="d-flex flex-column justify-content-center"> 
              <ReusableDoughnutChart
                title="Visa type" 
                chartDataItems={visaTypeData}
                chartHeight="180px" 
                chartWidth="100%"  
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
                value="150" 
              />
            </Col>
            <Col md="6" sm="6" className="mb-4">
              <InfoStatCard
                icon={iconForStatCards}
                iconGradient={defaultIconGradient}
                title="Number of failed requests"
                value="150" 
              />
            </Col>
            <Col md="6" sm="6" className="mb-4 mb-md-0"> 
              <InfoStatCard
                icon={iconForStatCards}
                iconGradient={defaultIconGradient}
                title="Total Number of requested visa"
                value="150" 
              />
            </Col>
            <Col md="6" sm="6">
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

export default VisaAnalyticAllTime;
