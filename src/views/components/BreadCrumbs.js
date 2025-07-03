import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'; // Import reactstrap components
import PropTypes from 'prop-types';

const SimpleBreadcrumb = ({ items, listClassName = '' }) => {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <>
      {/*
        This targeted style block is the cleanest way to override the separator color
        and link colors without affecting other parts of the theme.
      */}
      <style>{`
        .breadcrumb-item + .breadcrumb-item::before {
          color: #fff !important;
        }
        /* **THE FIX IS HERE:** These rules override the theme's default purple for links */
        .breadcrumb-links .breadcrumb-item a {
          color: #1D8CF8 !important;
          text-decoration: none;
        }
        .breadcrumb-links .breadcrumb-item a:hover {
          color: #4e9de0 !important; /* A slightly lighter blue for hover */
        }
      `}</style>
      
      {/*
        Using the reactstrap Breadcrumb component for semantic HTML and accessibility.
        The `listClassName` prop allows for additional custom styling if needed.
      */}
      <Breadcrumb listClassName={`breadcrumb-links ${listClassName}`}>
        {items.map((item, index) => {
          const isActive = index === items.length - 1;

          if (!item || typeof item.label === 'undefined') {
            console.warn('Breadcrumb item or item.label is undefined at index:', index);
            return null; 
          }

          return (
            <BreadcrumbItem key={index} active={isActive}>
              {isActive ? (
                // The active (last) item is plain text with a white color.
                <span className="text-white font-weight-bold">{item.label}</span>
              ) : (
                // The `text-primary` class has been removed to allow our custom style to take effect.
                <Link to={item.to || '#'}>
                  {item.label}
                </Link>
              )}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </>
  );
};

SimpleBreadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string, // 'to' is optional for non-link items
    })
  ).isRequired,
  // Renamed for clarity to match reactstrap's prop name
  listClassName: PropTypes.string, 
};

export default SimpleBreadcrumb;
