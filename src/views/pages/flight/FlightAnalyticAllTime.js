import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import ReusableDoughnutChart from '../../components/DoughnutChart'; 
import InfoStatCard from '../../components/InfoStateCard';

const FlightAnalyticAllTime = () => {
  console.log("FlightAnalyticMonth component rendering");

  const searchBookedData = [
    { label: "Searched", value: 78, color: "rgba(75, 192, 192, 1)" }, 
    { label: "Booked", value: 22, color: "rgba(54, 162, 235, 1)" },   
  ];

  const bookedAIData = [
    { label: "Shown in packages", value: 78, color: "rgba(75, 192, 192, 1)" }, 
    { label: "Booked", value: 22, color: "rgba(255, 99, 132, 1)" },          
  ];

  const iconForStatCards = "icon-chat-33"; 
  const defaultIconGradient = "linear-gradient(135deg, #FF607D 0%, #FF8A65 100%)";

  return (
    <div>
      <h3 className="title text-white ">All Time</h3>
      <Row>
        <Col lg="4" md="12" className=" mb-lg-0">
          <Row>
            <Col md="12" >
              <Card className="card-chart">
                <CardBody className='p-3'>
                  <ReusableDoughnutChart
                    title="Ratio of search and booked flights this month"
                    chartDataItems={searchBookedData}
                    chartHeight="150px"
                    chartWidth="170px"
                  />
                </CardBody>
              </Card>
            </Col>
            <Col md="12">
              <Card className="card-chart">
                <CardBody  className='p-3'>
                  <ReusableDoughnutChart
                    title="Ratio of booked flights with AI"
                    chartDataItems={bookedAIData}
                    chartHeight="150px"
                    chartWidth="150px"
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>

        <Col lg="8" md="12">
          <Row>
            <Col sm="6" >
              <InfoStatCard
                icon={iconForStatCards}
                iconGradient={defaultIconGradient}
                title="Number of booked flights this month"
                value="150"
              />
            </Col>
            <Col sm="6" >
              <InfoStatCard
                icon={iconForStatCards}
                iconGradient={defaultIconGradient}
                title="Number of searched flights this month"
                value="150" 
              />
            </Col>
            <Col sm="6" >
              <InfoStatCard
                icon={iconForStatCards}
                iconGradient={defaultIconGradient}
                title="Number of booked flights with AI this month"
                value="150" 
              />
            </Col>
            <Col sm="6">
              <InfoStatCard
                icon={iconForStatCards}
                iconGradient={defaultIconGradient}
                title="Number of Travelers this month"
                value="150" 
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default FlightAnalyticAllTime;
