import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import ReusableLineChartCard from '../../components/LineChartCard';
import ReusableBarChartCard from '../../components/ReusableBarChartCard';
import ReusableDoughnutChart from '../../components/DoughnutChart';
import FunnelRequestChart from '../../components/FunnelRequestChart';


const StaystAnalyticalOveral = () => {
  // 1. Average Spend daily Past week (Line Chart)
  const averageSpendData = {
    labels: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [
      {
        label: "Daily Spend",
        data: [80, 100, 80, 70, 90, 120, 80], 
      },
    ],
  };

  // 2. Most applied filters (Bar Chart)
  const mostAppliedFiltersData = {
    labels: ["Date", "Price", "Duration", "Class", "Baggage", "Layover"],
    datasets: [
      {
        label: "Applied Count",
        data: [80, 100, 70, 80, 120, 80], 
      },
    ],
  };

  // 3. Reservation Duration (Bar Chart)
  const reservationDurationData = {
    labels: ["< 2 days", "2 days", "3-4 days", "5-6 days", "7-8 days", "9-10 days", "> 10 days"],
    datasets: [
      {
        label: "Reservations",
        data: [70, 100, 120, 90, 110, 80, 60], 
        barColor: "#1f8ef1", 
        borderColor: "#1f8ef1",
      },
    ],
  };
   const reservationDurationOptions = {
    scales: {
      y: {
        suggestedMin: 0, 
        suggestedMax: 130, 
        ticks: {
          stepSize: 20
        }
      }
    }
  };


  // 4. Funnel request rate (Funnel Chart)
  const funnelRequestData = [
    { label: "Total search", value: 78 },
    { label: "Select accommodation", value: 65 }, 
    { label: "Select Rooms", value: 50 },
    { label: "Process page", value: 35 }, 
    { label: "Purchase", value: 22 },
  ];

  // 5. Accommodation type (Doughnut Chart)
  const accommodationTypeData = [
    { label: "Hotel", value: 78, color: "#00d6b4" }, 
    { label: "Accommodation", value: 22, color: "#1f8ef1" }, 
  ];

  // 6. Ration of reserved rooms per booking (Doughnut Chart)
  const reservedRoomsData = [
    { label: "1 room", value: 78, color: "#00d6b4" }, 
    { label: "2 rooms", value: 22, color: "#1f8ef1" }, 
    { label: "3 rooms", value: 15, color: "#ff8d72" }, 
    { label: "4 rooms", value: 10, color: "#ba54f5" }, 
    { label: "5 rooms and more", value: 5, color: "#fd5d93" }, 
  ];
  const smallDoughnutSize = "120px"; 


  // 7. UAE visa request ratio (Doughnut Chart)
  const uaeVisaData = [
    { label: "Total bookings to UAE", value: 78, color: "#00d6b4" }, 
    { label: "Visa Requested", value: 22, color: "#ff8d72" }, 
  ];


  // Define a common height for the chart drawing areas in the second row
  const secondRowChartCanvasHeight = "230px"; 

  return (
    <div className="content"> 
      <h2 className="title text-white mb-4">Overall</h2>
      <Row>
        <Col lg="6" md="12" > 
          <ReusableLineChartCard
            cardTitleText="Average Spend daily Past week"
            cardCategoryText="Average Week $ 10,000"
            chartData={averageSpendData}
            chartHeight="265px" 
          />
        </Col>
        <Col lg="6" md="12" > 
          <ReusableBarChartCard
            cardTitleText="Most applied filters"
            chartData={mostAppliedFiltersData}
            chartHeight="300px" 
          />
        </Col>
      </Row>

      {/* Second Row of Charts (Reservation Duration and Funnel Chart) */}
      <Row className="d-flex align-items-stretch">
        <Col lg="6" md="12" className=" d-flex"> 
           <ReusableBarChartCard
            cardTitleText="Reservation Duration"
            chartData={reservationDurationData}
            defaultBarColor="#1f8ef1" 
            customOptions={reservationDurationOptions}
            chartHeight={secondRowChartCanvasHeight} 
          />
        </Col>
        <Col lg="6" md="12" className=" d-flex"> 
          <Card className="card-chart d-flex flex-column flex-grow-1"> 
            <CardBody className="d-flex flex-column flex-grow-1"> 
              <FunnelRequestChart
                title="Funnel request rate"
                funnelDataItems={funnelRequestData}
                chartCanvasHeight={secondRowChartCanvasHeight} 
                chartBackgroundColor="transparent" 
              />
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Third Row of Charts (3 Doughnut Charts) */}
      <Row>
        <Col lg="4" md="6" sm="12" className="mb-4">
          <Card className="card-chart">
            <CardBody>
              <ReusableDoughnutChart
                title="Accommodation type"
                chartDataItems={accommodationTypeData}
                chartHeight={smallDoughnutSize}
                chartWidth={smallDoughnutSize}
              />
            </CardBody>
          </Card>
        </Col>
        <Col lg="4" md="6" sm="12" className="mb-4">
          <Card className="card-chart">
            <CardBody>
              <ReusableDoughnutChart
                title="Ration of reserved rooms per booking"
                chartDataItems={reservedRoomsData}
                chartHeight={smallDoughnutSize}
                chartWidth={smallDoughnutSize}
              />
            </CardBody>
          </Card>
        </Col>
        <Col lg="4" md="6" sm="12" className="mb-4">
          <Card className="card-chart">
            <CardBody>
              <ReusableDoughnutChart
                title="UAE visa request ratio"
                chartDataItems={uaeVisaData}
                chartHeight={smallDoughnutSize}
                chartWidth={smallDoughnutSize}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StaystAnalyticalOveral;
