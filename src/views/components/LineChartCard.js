import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from 'reactstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartJsTitle,
  Tooltip,
  Legend as ChartJsLegend,
  Filler // Required for area fill (gradients)
} from 'chart.js';

// Register necessary ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartJsTitle,
  Tooltip,
  ChartJsLegend,
  Filler
);

// Helper function to create the gradient fill for the line chart
// This is similar to how Black Dashboard PRO React's charts.js might define gradients
const createGradientFill = (canvas, mainColorHex) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Convert mainColorHex to RGB and then create RGBA strings for the gradient
  let mainR = 0, mainG = 0, mainB = 0;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(mainColorHex)) {
    let c = mainColorHex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    mainR = (c >> 16) & 255;
    mainG = (c >> 8) & 255;
    mainB = c & 255;
  }

  const gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
  gradientStroke.addColorStop(1, `rgba(${mainR},${mainG},${mainB},0.2)`); // More transparent at the top
  gradientStroke.addColorStop(0.4, `rgba(${mainR},${mainG},${mainB},0.0)`); // Fully transparent in the middle
  gradientStroke.addColorStop(0, `rgba(${mainR},${mainG},${mainB},0.1)`); // Slightly visible at the bottom

  return gradientStroke;
};


const ReusableLineChartCard = ({
  cardTitleText,      // e.g., "Average Spend daily Past week"
  cardCategoryText,   // e.g., "Average Week $ 10,000"
  chartData,          // { labels: [...], datasets: [{ data: [...], label: '...', ... }] }
  chartHeight = "250px", // Default height for the chart area
  lineColor = "#e14ec9", // Default purple line color from "Chart 1.png"
  pointBorderColor = "#fff",
  pointBackgroundColor = "#e14ec9",
  pointHoverBackgroundColor = "#e14ec9",
  pointHoverBorderColor = "#fff",
  customOptions = {} // Allow overriding default chart options
}) => {

  // Prepare chart data with gradient
  const preparedChartData = (canvas) => {
    const datasetsWithGradient = chartData.datasets.map(dataset => ({
      ...dataset,
      fill: true,
      backgroundColor: createGradientFill(canvas, dataset.borderColor || lineColor),
      borderColor: dataset.borderColor || lineColor,
      pointBorderColor: dataset.pointBorderColor || pointBorderColor,
      pointBackgroundColor: dataset.pointBackgroundColor || pointBackgroundColor,
      pointHoverBackgroundColor: dataset.pointHoverBackgroundColor || pointHoverBackgroundColor,
      pointHoverBorderColor: dataset.pointHoverBorderColor || pointHoverBorderColor,
      pointRadius: dataset.pointRadius === undefined ? 4 : dataset.pointRadius,
      pointHoverRadius: dataset.pointHoverRadius === undefined ? 5 : dataset.pointHoverRadius,
      borderWidth: dataset.borderWidth === undefined ? 2 : dataset.borderWidth,
      tension: dataset.tension === undefined ? 0.4 : dataset.tension, // Makes the line curved
    }));

    return {
      labels: chartData.labels,
      datasets: datasetsWithGradient,
    };
  };

  // Default options similar to Black Dashboard PRO React charts and "Chart 1.png"
  const defaultChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Legend is typically not shown in these card charts
      },
      tooltip: {
        backgroundColor: '#f5f5f5',
        titleColor: '#333',
        bodyColor: '#666',
        bodySpacing: 4,
        padding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
    },
    scales: {
      y: {
        // display: true, // Keep Y axis visible as per "Chart 1.png"
        grid: {
          drawBorder: false,
          color: "rgba(225,78,202,0.1)", // Light purple grid lines
          zeroLineColor: "transparent",
        },
        ticks: {
          suggestedMin: 60, // As per "Chart 1.png"
          suggestedMax: 130, // As per "Chart 1.png"
          padding: 10,
          color: "#9e9e9e", // Light grey ticks
          font: {
            size: 11,
          },
        },
      },
      x: {
        // display: true, // Keep X axis visible
        grid: {
          drawBorder: false,
          color: "rgba(225,78,202,0.0)", // Almost transparent for X grid lines
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 10,
          color: "#9e9e9e", // Light grey ticks
          font: {
            size: 11,
          },
        },
      },
    },
  };

  const options = { ...defaultChartOptions, ...customOptions };

  return (
    <Card className="card-chart">
      <CardHeader>
        <Row>
          <Col className="text-left" sm="8">
            {/* Card title (main title on the left) */}
            <CardTitle tag="h3" className="text-white">{cardTitleText}</CardTitle>
          </Col>
          <Col sm="4">
            {/* Card category (smaller text on the top right) */}
            <div className="text-right">
              <h5 className="card-category text-muted" style={{ marginTop: '5px', marginBottom: '0' }}>
                {cardCategoryText}
              </h5>
            </div>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <div className="chart-area" style={{ height: chartHeight }}>
          <Line data={preparedChartData} options={options} />
        </div>
      </CardBody>
    </Card>
  );
};

ReusableLineChartCard.propTypes = {
  cardTitleText: PropTypes.string.isRequired,
  cardCategoryText: PropTypes.string,
  chartData: PropTypes.shape({
    labels: PropTypes.array.isRequired,
    datasets: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      data: PropTypes.array.isRequired,
      borderColor: PropTypes.string, // Optional: dataset specific line color
      // Add other dataset-specific props if needed
    })).isRequired,
  }).isRequired,
  chartHeight: PropTypes.string,
  lineColor: PropTypes.string,
  pointBorderColor: PropTypes.string,
  pointBackgroundColor: PropTypes.string,
  pointHoverBackgroundColor: PropTypes.string,
  pointHoverBorderColor: PropTypes.string,
  customOptions: PropTypes.object,
};

export default ReusableLineChartCard;
