import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';

const NavigationBox = ({ to, title, subtitle, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  // The main fix is here: remove `minWidth` and set `width` to '100%'
  const cardStyle = {
    minWidth: '250px', // Makes the card fill its parent <Col>
    height: '250px',
    borderRadius: '6px',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
    boxShadow: isHovered ? '0 8px 20px rgba(0, 0, 0, 0.2)' : '0 4px 12px rgba(0, 0, 0, 0.15)',
    background: 'linear-gradient(to right,#3358F4, #1D8CF8)', // Updated background color to a gradient
  };

  const titleClasses = "font-weight-bold text-white m-0 text-center";
  const subtitleClasses = "text-white-50 m-0 text-center mt-2"; // Style for the subtitle

  return (
    <Link to={to} style={{ textDecoration: 'none', width: '100%' }}>
      <Card
        className={className}
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardBody
          className="d-flex flex-column justify-content-center align-items-center h-100"
          style={{ padding: "3rem 1.5rem" }}
        >
          <h3 className={titleClasses}>{title}</h3>
          {subtitle && <p className={subtitleClasses}>{subtitle}</p>}
        </CardBody>
      </Card>
    </Link>
  );
};

export default NavigationBox;
