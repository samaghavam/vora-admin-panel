import React from 'react';
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

const createGradientFill = (canvas, mainColorHex) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

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
  gradientStroke.addColorStop(1, `rgba(${mainR},${mainG},${mainB},0.2)`);
  gradientStroke.addColorStop(0.4, `rgba(${mainR},${mainG},${mainB},0.0)`);
  gradientStroke.addColorStop(0, `rgba(${mainR},${mainG},${mainB},0.1)`);

  return gradientStroke;
};


const ReusableLineChartCard = ({
  cardTitleText,     // e.g., "Average Spend daily Past week"
  cardCategoryText,  // e.g., "Average Week $ 10,000"
  chartData,         // { labels: [...], datasets: [{ data: [...], label: '...', ... }] }
  // chartHeight prop is no longer needed for consistent height
  lineColor = "#e14ec9",
  pointBorderColor = "#fff",
  pointBackgroundColor = "#e14ec9",
  pointHoverBackgroundColor = "#e14ec9",
  pointHoverBorderColor = "#fff",
  customOptions = {}
}) => {

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
      tension: dataset.tension === undefined ? 0.4 : dataset.tension, 
    }));

    return {
      labels: chartData.labels,
      datasets: datasetsWithGradient,
    };
  };

  const defaultChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, 
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
        grid: {
          drawBorder: false,
          color: "rgba(225,78,202,0.1)",
          zeroLineColor: "transparent",
        },
        ticks: {
          suggestedMin: 60,
          suggestedMax: 130,
          padding: 10,
          color: "#9e9e9e",
          font: {
            size: 10,
          },
        },
      },
      x: {
        grid: {
          drawBorder: false,
          color: "rgba(225,78,202,0.0)",
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 10,
          color: "#9e9e9e",
          font: {
            size: 11,
          },
        },
      },
    },
  };

  const options = { ...defaultChartOptions, ...customOptions };

  return (
    // **THE FIX IS HERE:**
    // 1. Added `h-100` to make the card fill its parent's height.
    <Card className="card-chart h-100">
      <CardHeader>
        <Row>
          <Col className="text-left" sm="8">
            <CardTitle tag="h4" className="text-white">{cardTitleText}</CardTitle>
          </Col>
          <Col sm="4">
            <div className="text-right">
              <h5 className="card-category text-muted" style={{ marginTop: '5px', marginBottom: '0' }}>
                {cardCategoryText}
              </h5>
            </div>
          </Col>
        </Row>
      </CardHeader>
      {/* 2. Made CardBody a flex container to allow the chart to grow. */}
      <CardBody className="d-flex flex-column">
        {/* 3. The chart-area now grows to fill the available space. */}
        <div className="chart-area flex-grow-1" style={{ position: 'relative' }}>
          <Line data={preparedChartData} options={options} />
        </div>
      </CardBody>
    </Card>
  );
};


export default ReusableLineChartCard;
