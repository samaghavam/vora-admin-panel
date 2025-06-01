import React from 'react';
import { Card, CardBody } from 'reactstrap'; 

const InfoStatCard = ({
  icon,
  iconGradient = 'linear-gradient(135deg, #FF6B8A 0%, #FF9A8B 100%)', 
  title,
  value,
  cardClassName = '',
  iconWrapperClass = '',
  textWrapperClass = ''
}) => {

  const iconCircleStyle = {
    background: iconGradient,
    width: '60px',  
    height: '60px',
    flexShrink: 0, 
  };

  return (
    <Card className={`card-stats ${cardClassName}`}>
      <CardBody className="d-flex align-items-center p-3"> 
        <div
          className={`rounded-circle d-flex align-items-center justify-content-center mr-3 ${iconWrapperClass}`}
          style={iconCircleStyle}
        >
          <i className={`tim-icons ${icon} text-white`} style={{ fontSize: '1.75rem' }} /> 
        </div>

        <div className={`d-flex flex-column justify-content-center ${textWrapperClass}`}>
          <p className="text-muted" style={{ fontSize: '0.875rem' }}> 
            {title}
          </p>
          <h2 className="font-weight-bold text-white my-0" style={{ fontSize: '1.2rem' }}> 
            {value}
          </h2>
        </div>
      </CardBody>
    </Card>
  );
};

export default InfoStatCard;
