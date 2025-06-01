import React from 'react';
import {  Card, CardBody} from 'reactstrap'; // Using reactstrap for layout
import FunnelRequestChart from '../../components/FunnelRequestChart'; 

const FlightAnalyticalOveral = () => {
  const funnelChartData = [
    { label: "Total search", value: 78 },
    { label: "Select ticket", value: 92 },
    { label: "Buying Process", value: 32 },
    { label: "Payment page", value: 22 },
    { label: "Purchase", value: 12 },
  ];

  return (
    <Card className="card-plain"> 
      <CardBody>
        <FunnelRequestChart
          title="Funnel request rate" 
          funnelDataItems={funnelChartData}
        />
      </CardBody>
    </Card>
  );
};

export default FlightAnalyticalOveral;
