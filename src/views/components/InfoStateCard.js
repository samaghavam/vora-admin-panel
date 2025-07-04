import React from 'react';
import { Card, CardBody } from 'reactstrap';
import styles from '../../assets/css/InfoStatCard.module.css'; 

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
  };

  return (
    <Card className={`card-stats ${cardClassName}`}>
      <CardBody className="d-flex align-items-center p-3"> 
        <div
          className={`rounded-circle d-flex align-items-center justify-content-center mr-3 ${styles.iconWrapper} ${iconWrapperClass}`}
          style={iconCircleStyle}
        >
          <i className={`tim-icons ${icon} text-white ${styles.icon}`} /> 
        </div>

        <div className={`d-flex flex-column justify-content-center ${textWrapperClass}`}>
          <p className={`text-muted ${styles.title}`}> 
            {title}
          </p>
          <h2 className={`font-weight-bold text-white my-0 ${styles.value}`}> 
            {value}
          </h2>
        </div>
      </CardBody>
    </Card>
  );
};

export default InfoStatCard;
