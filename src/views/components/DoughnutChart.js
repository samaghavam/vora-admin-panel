import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend as ChartJsLegend // Renamed to avoid conflict if you use a variable named Legend
} from 'chart.js';

// Registering ChartJS elements, tooltip, and legend.
// This can also be done globally in your App.js or index.js.
ChartJS.register(ArcElement, Tooltip, ChartJsLegend);

const ReusableDoughnutChart = ({ title, chartDataItems, chartHeight = "150px", chartWidth = "150px" }) => {
  if (!chartDataItems || chartDataItems.length === 0) {
    return <div style={{ color: '#fff' }}>No data to display for the chart.</div>;
  }

  const labels = chartDataItems.map(item => item.label);
  const dataValues = chartDataItems.map(item => item.value);
  const backgroundColors = chartDataItems.map(item => item.color);

  const chartJsData = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: backgroundColors,
        // It's good to have border colors slightly different or matching the background
        // For a clean look like the image, a thin border matching the segment color but darker or a background color can work.
        // Or use the segment color itself if no distinct border is seen.
        borderColor: backgroundColors, // You can customize this, e.g., make them darker or use a common color
        borderWidth: 1, // Adjust as needed, 0 for no border
        hoverOffset: 4,
      },
    ],
  };

  const chartJsOptions = {
    responsive: true,
    maintainAspectRatio: false, // Important for custom sizing via wrapper
    cutout: '70%', // Makes it a doughnut chart. Adjust for thickness.
    plugins: {
      legend: {
        display: false, // We are using a custom HTML legend
      },
      tooltip: {
        enabled: true,
        // You can customize tooltips further if needed
        // Example:
        // callbacks: {
        //   label: function (context) {
        //     let label = context.label || '';
        //     if (label) {
        //       label += ': ';
        //     }
        //     if (context.parsed !== null) {
        //       label += context.parsed + '%';
        //     }
        //     return label;
        //   },
        // },
      },
    },
    layout: {
      padding: 0, // Remove padding around the chart area
    },
  };

  // Styles (can be moved to a CSS file for better organization)
  const componentStyle = {
    // Assuming a dark theme, text should be light.
    // This component would typically be placed inside a Card or a themed container.
    // fontFamily: inherited from theme
    color: '#E3E3E3', // Light text color for title and legend
  };

  const titleStyle = {
    fontSize: '1rem', // Adjust as per your theme's h4 or similar
    marginBottom: '15px', // Space below title
    textAlign: 'left', // As per image
    color: '#E3E3E3', // Ensure title color is light on dark background
  };

  const chartAreaStyle = {
    display: 'flex',
    alignItems: 'center', // Vertically align chart and legend
    // justifyContent: 'space-around', // Or 'flex-start'
  };

  const chartWrapperStyle = {
    position: 'relative', // Needed for chart.js responsiveness within a sized div
    height: chartHeight,
    width: chartWidth,
  };

  const legendWrapperStyle = {
    marginLeft: '25px', // Space between chart and legend
    fontSize: '0.875rem', // Smaller font for legend items
  };

  const legendListStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  };

  const legendItemStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px', // Space between legend items
  };

  const legendColorDotBaseStyle = {
    display: 'inline-block',
    width: '10px', // Size of the color dot
    height: '10px',
    borderRadius: '50%', // Make it a circle
    marginRight: '10px', // Space between dot and text
  };

  const legendTextStyle = {
     // color: '#E3E3E3', // Inherits from componentStyle
  };
  
  const legendValueStyle = {
    marginLeft: 'auto', // Pushes the percentage to the right
    paddingLeft: '10px', // Space before percentage
    // color: '#E3E3E3',
  };


  return (
    <div style={componentStyle}>
      {title && <h4 style={titleStyle}>{title}</h4>}
      <div style={chartAreaStyle}>
        <div style={chartWrapperStyle}>
          <Doughnut data={chartJsData} options={chartJsOptions} />
        </div>
        <div style={legendWrapperStyle}>
          <ul style={legendListStyle}>
            {chartDataItems.map((item) => (
              <li key={item.label} style={legendItemStyle}>
                <span style={{ ...legendColorDotBaseStyle, backgroundColor: item.color }} />
                <span style={legendTextStyle}>{item.label}</span>
                <span style={legendValueStyle}>{item.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

ReusableDoughnutChart.propTypes = {
  title: PropTypes.string,
  chartDataItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  chartHeight: PropTypes.string, // e.g., "150px", "10rem"
  chartWidth: PropTypes.string,  // e.g., "150px", "10rem"
};

export default ReusableDoughnutChart;
