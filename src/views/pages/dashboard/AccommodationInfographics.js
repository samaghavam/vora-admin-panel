import React from 'react';
import { Row, Col, Card, CardHeader, CardBody, CardTitle } from 'reactstrap';
import ReusableLineChartCard from '../../components/LineChartCard';
import ReusableBarChartCard from '../../components/ReusableBarChartCard';
import ReusableDoughnutChart from '../../components/DoughnutChart';
import FunnelRequestChart from '../../components/FunnelRequestChart';

const AccommodationInfographics = () => {
  const averageSpendData = {
    labels: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [{ label: "Spendings", data: [85, 102, 70, 68, 105, 128, 82], borderColor: "#e14ec9", pointBackgroundColor: "#e14ec9", pointBorderColor: "#fff", tension: 0.4 }],
  };
  const averageSpendCategory = "Average Week $ 10,000";

  const appliedFiltersData = {
    labels: ["Date", "Price", "Duration", "Cities", "Layover"], 
    datasets: [{ label: "Times Applied", data: [90, 105, 70, 80, 120], barColor: "#e14ec9" }],
  };

   const reservationDurationData = {
    labels: ["2 days and less", "3-4 days", "5-6 days", "7-8 days", "9-10 days", "11 days and more"],
    datasets: [{ label: "Reservations", data: [70, 90, 65, 75, 120, 80], barColor: "#e14ec9" }],
  };

  const funnelRequestDataItems = [
    { label: "Total search", value: 78 }, { label: "Select accommodation", value: 22 },
    { label: "Select Rooms", value: 22 }, { label: "Process page", value: 22 },
    { label: "Purchase", value: 22 },
  ];

  const accommodationTypeData = [
    { label: "Hotel", value: 78, color: "rgba(54, 162, 235, 1)" },
    { label: "Accommodation", value: 22, color: "rgba(75, 192, 192, 1)" },
  ];

  const reservedRoomsData = [
    { label: "1 room", value: 78, color: "rgba(54, 162, 235, 1)" }, 
    { label: "2 rooms", value: 52, color: "rgba(75, 192, 192, 1)" },
    { label: "3 rooms", value: 42, color: "rgba(255, 159, 64, 1)" }, 
    { label: "4 rooms", value: 22, color: "rgba(255, 99, 132, 1)" },
    { label: "5 rooms and more", value: 12, color: "rgba(153, 102, 255, 1)" },
  ];

  const uaeVisaRequestData = [ 
    { label: "Total bookings to UAE", value: 78, color: "rgba(75, 192, 192, 1)" },
    { label: "Visa Requested", value: 22, color: "rgba(255, 206, 86, 1)" },
  ];

   const popularDestinationsData = [
    { label: "USA", value: 78, color: "rgba(255, 159, 64, 1)" }, 
    { label: "Germany", value: 22, color: "rgba(75, 192, 192, 1)" },
    { label: "Australia", value: 22, color: "rgba(54, 162, 235, 1)" }, 
    { label: "United Kingdom", value: 22, color: "rgba(255, 99, 132, 1)" },
    { label: "Canada", value: 22, color: "rgba(153, 102, 255, 1)" },
  ];

  const travelGroupData = [
    { label: "Adults", value: 78, color: "rgba(75, 192, 192, 1)" }, 
    { label: "Children", value: 22, color: "rgba(255, 159, 64, 1)" },
    { label: "Infants", value: 22, color: "rgba(153, 102, 255, 1)" },
  ];

  const popularAccommodationData = [
    { label: "Accommodation-name", value: 78, color: "rgba(255, 159, 64, 1)" }, 
    { label: "Accommodation name", value: 62, color: "rgba(75, 192, 192, 1)" },
    { label: "Accommodation name", value: 42, color: "rgba(54, 162, 235, 1)" }, 
    { label: "Accommodation name", value: 32, color: "rgba(255, 99, 132, 1)" },
    { label: "Accommodation name", value: 22, color: "rgba(153, 102, 255, 1)" },
  ];

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
  
  const chartRowStyle = { marginBottom: '1.5rem' }; 

  return (
    <div className="content" >
      <h2 className="title text-white mb-4" style={{borderBottom: '1px solid #444', paddingBottom: '10px'}}>Accommodation Infographics</h2>

      {/* Row 1 */}
      <Row style={chartRowStyle}>
        <Col lg="6" md="12" className="mb-4 mb-lg-0">
          <ReusableLineChartCard 
            cardTitleText="Average Spend daily Past week" 
            cardCategoryText={averageSpendCategory} 
            chartData={averageSpendData} 
            chartHeight="280px" 
          />
        </Col>
        <Col lg="6" md="12">
          <ReusableBarChartCard 
            cardTitleText="Most applied filters" 
            chartData={appliedFiltersData} 
            chartHeight="280px" 
          />
        </Col>
      </Row>

      {/* Row 2 */}
      <Row style={chartRowStyle}>
        <Col lg="6" md="12" className="mb-4 mb-lg-0">
          <ReusableBarChartCard 
            cardTitleText="Reservation Duration" 
            chartData={reservationDurationData} 
            chartHeight="300px" 
          />
        </Col>
        <Col lg="6" md="12">
          <FunnelRequestChart 
            title="Funnel request rate" 
            funnelDataItems={funnelRequestDataItems} 
            chartCanvasHeight="260px" 
            chartBackgroundColor="#27293D" 
          />
        </Col>
      </Row>
      
      {/* Row 3 - Doughnut Charts */}
      <Row style={chartRowStyle}>
        <Col lg="4" md="6" sm="12" className="mb-4">
            <DoughnutCard title="Accommodation type" chartDataItems={accommodationTypeData} />
        </Col>
        <Col lg="4" md="6" sm="12" className="mb-4">
            <DoughnutCard title="Ratio of reserved rooms per booking" chartDataItems={reservedRoomsData} />
        </Col>
        <Col lg="4" md="6" sm="12" className="mb-4"> 
            <DoughnutCard title="UAE visa request ratio" chartDataItems={uaeVisaRequestData} />
        </Col>
      </Row>

      {/* Row 4 - Doughnut Charts */}
      <Row> 
        <Col lg="4" md="6" sm="12" className="mb-4">
            <DoughnutCard title="Most Popular destinations" chartDataItems={popularDestinationsData} />
        </Col>
        <Col lg="4" md="6" sm="12" className="mb-4">
            <DoughnutCard title="Travel Group percentages" chartDataItems={travelGroupData} />
        </Col>
        <Col lg="4" md="6" sm="12" className="mb-4">
            <DoughnutCard title="Most Popular Accommodation" chartDataItems={popularAccommodationData} />
        </Col>
      </Row>
    </div>
  );
};
export default AccommodationInfographics