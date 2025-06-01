import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend as ChartJsLegend 
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, ChartJsLegend);

const ReusableDoughnutChart = ({ title, chartDataItems, chartHeight = "150px", chartWidth = "170px" }) => {
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
        borderColor: backgroundColors, 
        borderWidth: 1, 
        hoverOffset: 4,
      },
    ],
  };

  const chartJsOptions = {
    responsive: true,
    maintainAspectRatio: false, 
    cutout: '70%', 
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        enabled: true,
      },
    },
    layout: {
      padding: 0, 
    },
  };

  const componentStyle = {
    color: '#9A9A9A', 
  };

  const titleStyle = {
    fontSize: '0.8rem', 
    marginBottom: '15px', 
    textAlign: 'left', 
    color: '#9A9A9A', 
  };

  const chartAreaStyle = {
    display: 'flex',
    alignItems: 'center', 
  };

  const chartWrapperStyle = {
    position: 'relative', 
    height: chartHeight,
    width: chartWidth,
  };

  const legendWrapperStyle = {
    marginLeft: '35px', 
    fontSize: '0.65rem', 
  };

  const legendListStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  };

  const legendItemStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px', 
  };

  const legendColorDotBaseStyle = {
    display: 'inline-block',
    width: '10px', 
    height: '10px',
    borderRadius: '50%', 
    marginRight: '10px', 
  };

  const legendTextStyle = {
     color: '#9A9A9A', 
  };
  
  const legendValueStyle = {
    marginLeft: 'auto', 
    paddingLeft: '10px', 
    color: '#9A9A9A',
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

export default ReusableDoughnutChart;
