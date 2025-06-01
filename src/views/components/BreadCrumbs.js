import React from 'react';
import { Link } from 'react-router-dom'; 

const SimpleBreadcrumb = ({ items, navClassName = '', olClassName = '' }) => {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="breadcrumb" role="navigation" className={navClassName}>
      <ol className={`breadcrumb ${olClassName}`}>
        {items.map((item, index) => {
          const isActive = index === items.length - 1;

          if (!item || typeof item.label === 'undefined') {
            console.warn('Breadcrumb item or item.label is undefined at index:', index);
            return null; 
          }

          if (isActive) {
            return (
              <li key={index} className="breadcrumb-item active" aria-current="page">
                {item.label}
              </li>
            );
          } else if (item.to) { 
            return (
              <li key={index} className="breadcrumb-item">
                <Link to={item.to}>{item.label}</Link>
              </li>
            );
          } else {
            return (
              <li key={index} className="breadcrumb-item">
                {item.label}
              </li>
            );
          }
        })}
      </ol>
    </nav>
  );
};

export default SimpleBreadcrumb;
