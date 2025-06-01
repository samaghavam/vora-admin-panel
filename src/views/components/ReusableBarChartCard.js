import React from 'react';
// PropTypes import removed
import { Bar } from 'react-chartjs-2';
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartJsTitle,
  Tooltip,
  Legend as ChartJsLegend,
  Filler 
} from 'chart.js';

// Register necessary ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartJsTitle,
  Tooltip,
  ChartJsLegend,
  Filler
);

// Helper function to create the gradient fill for the bars
const createBarGradient = (canvas, mainColorHex) => {
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
  } else { 
    console.warn("Invalid hex color for gradient:", mainColorHex);
    mainR = 253; mainG = 93; mainB = 147; // Default to #FD5D93
  }

  // Create a more transparent gradient for the fill
  const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height); 
  // Start with a lower opacity and end with an even lower one for a subtle fill
  gradient.addColorStop(0, `rgba(${mainR},${mainG},${mainB},0.45)`); // More transparent top
  gradient.addColorStop(1, `rgba(${mainR},${mainG},${mainB},0.1)`);  // Even more transparent bottom

  return gradient;
};


const ReusableBarChartCard = ({
  cardTitleText,      
  chartData,          
  chartHeight = "250px",
  defaultBarColor = "#FD5D93", 
  customOptions = {}
}) => {

  const preparedChartData = (canvas) => {
    const datasetsWithGradient = chartData.datasets.map(dataset => {
      const barBaseColor = dataset.barColor || defaultBarColor; // Use a new prop or default for solid border
      return {
        ...dataset,
        backgroundColor: createBarGradient(canvas, barBaseColor), // More transparent gradient fill
        borderColor: barBaseColor, // Solid border color
        borderWidth: dataset.borderWidth === undefined ? 1.5 : dataset.borderWidth, // Make border visible
        hoverBackgroundColor: `rgba(${parseInt(barBaseColor.slice(1,3),16)},${parseInt(barBaseColor.slice(3,5),16)},${parseInt(barBaseColor.slice(5,7),16)},0.6)`, // Slightly more opaque solid color on hover
        hoverBorderColor: barBaseColor,
        // borderRadius: 5, // Optional: slight rounding of bar tops
      };
    });

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
        enabled: true,
        backgroundColor: '#333', 
        titleColor: '#fff',
        bodyColor: '#fff',
        bodySpacing: 4,
        padding: 10,
        mode: "index", 
        intersect: false,
      },
    },
    scales: {
      y: {
        grid: {
          drawBorder: false,
          color: "rgba(225,78,202,0.05)", // Very faint grid lines, adjust alpha as needed
          zeroLineColor: "transparent",
        },
        ticks: {
          suggestedMin: 60, 
          suggestedMax: 130, 
          padding: 10,
          color: "#9a9a9a", 
          font: {
            size: 11,
          },
          stepSize: 10, 
        },
      },
      x: {
        grid: {
          drawBorder: false,
          display: false, 
        },
        ticks: {
          padding: 10,
          color: "#9a9a9a", 
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
        <CardTitle tag="h4" className="text-white">{cardTitleText}</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="chart-area" style={{ height: chartHeight }}>
          <Bar data={preparedChartData} options={options} />
        </div>
      </CardBody>
    </Card>
  );
};

export default ReusableBarChartCard;
