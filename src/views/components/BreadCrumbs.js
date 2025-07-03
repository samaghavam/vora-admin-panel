import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import PropTypes from 'prop-types';
import styles from '../../assets/css/SimpleBreadcrumb.module.css';

const SimpleBreadcrumb = ({ items, listClassName = '' }) => {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <>
      <Breadcrumb listClassName={`${styles.breadcrumbLinks} ${listClassName}`}>
        {items.map((item, index) => {
          const isActive = index === items.length - 1;

          if (!item || typeof item.label === 'undefined') {
            console.warn('Breadcrumb item or item.label is undefined at index:', index);
            return null; 
          }

          return (
            <BreadcrumbItem key={index} active={isActive}>
              {isActive ? (
                <span className={styles.breadcrumbActive}>{item.label}</span>
              ) : (
                <Link to={item.to || '#'} className={styles.breadcrumbLink}>
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
      to: PropTypes.string,
    })
  ).isRequired,
  listClassName: PropTypes.string, 
};

export default SimpleBreadcrumb;
