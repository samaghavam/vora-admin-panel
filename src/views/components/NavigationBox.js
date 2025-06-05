import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';
import classnames from 'classnames';

const NavigationBox = ({ to, title, className, bgColor = 'blue' }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    minWidth: '300px',
    height: '264px',
    borderRadius: '6px', 
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
    boxShadow: isHovered ? '0 8px 20px rgba(0, 0, 0, 0.2)' : '0 4px 12px rgba(0, 0, 0, 0.15)',
    textDecoration: 'none', 
  };

  const titleClasses = " font-weight-bold text-white m-0 text-center";

  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <Card
        className={classnames(
          `bg-${bgColor}`, 
          'h-100', 
          className 
        )}
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardBody
          className="d-flex flex-column justify-content-center align-items-center h-100"
          style={{ padding: "3rem 1.5rem" }}
        >
          <h3 className={titleClasses}>{title}</h3>
        </CardBody>
      </Card>
    </Link>
  );
};

export default NavigationBox;
