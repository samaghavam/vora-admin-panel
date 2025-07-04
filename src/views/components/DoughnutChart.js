import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend as ChartJsLegend 
} from 'chart.js';
import styles from '../../assets/css/ReusableDoughnutChart.module.css'; 

ChartJS.register(ArcElement, Tooltip, ChartJsLegend);

const ReusableDoughnutChart = ({ title, chartDataItems, chartHeight = "150px", chartWidth = "170px" }) => {
  if (!chartDataItems || chartDataItems.length === 0) {
    return <div className={styles.component}>No data to display for the chart.</div>;
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

  return (
    <div className={styles.component}>
      {title && <h4 className={styles.title}>{title}</h4>}
      <div className={styles.chartArea}>
        <div className={styles.chartWrapper} style={{ height: chartHeight, width: chartWidth }}>
          <Doughnut data={chartJsData} options={chartJsOptions} />
        </div>
        <div className={styles.legendWrapper}>
          <ul className={styles.legendList}>
            {chartDataItems.map((item) => (
              <li key={item.label} className={styles.legendItem}>
                <span className={styles.legendColorDot} style={{ backgroundColor: item.color }} />
                <span className={styles.legendText}>{item.label}</span>
                <span className={styles.legendValue}>{item.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReusableDoughnutChart;
