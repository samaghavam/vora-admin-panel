import React from "react";
// PropTypes import removed
import { Bar } from "react-chartjs-2";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartJsTitle,
  Tooltip,
  Legend as ChartJsLegend,
  Filler,
} from "chart.js";

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

  let mainR = 0,
    mainG = 0,
    mainB = 0;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(mainColorHex)) {
    let c = mainColorHex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    mainR = (c >> 16) & 255;
    mainG = (c >> 8) & 255;
    mainB = c & 255;
  } else {
    console.warn("Invalid hex color for gradient:", mainColorHex);
    mainR = 253;
    mainG = 93;
    mainB = 147; // Default to #FD5D93
  }

  const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
  gradient.addColorStop(0, `rgba(${mainR},${mainG},${mainB},0.45)`);
  gradient.addColorStop(1, `rgba(${mainR},${mainG},${mainB},0.1)`);

  return gradient;
};

const ReusableBarChartCard = ({
  cardTitleText,
  chartData,
  defaultBarColor = "#FD5D93",
  customOptions = {},
}) => {
  const preparedChartData = (canvas) => {
    const datasetsWithGradient = chartData.datasets.map((dataset) => {
      const barBaseColor = dataset.barColor || defaultBarColor;
      return {
        ...dataset,
        backgroundColor: createBarGradient(canvas, barBaseColor),
        borderColor: barBaseColor,
        borderWidth:
          dataset.borderWidth === undefined ? 1.5 : dataset.borderWidth,
        hoverBackgroundColor: `rgba(${parseInt(
          barBaseColor.slice(1, 3),
          16
        )},${parseInt(barBaseColor.slice(3, 5), 16)},${parseInt(
          barBaseColor.slice(5, 7),
          16
        )},0.6)`,
        hoverBorderColor: barBaseColor,
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
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
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
          color: "rgba(225,78,202,0.05)",
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
    <Card className="card-chart h-100">
      <CardHeader>
        <CardTitle tag="h4" className="text-white">
          {cardTitleText}
        </CardTitle>
      </CardHeader>
      <CardBody className="d-flex flex-column">
        <div className="chart-area flex-grow-1 position-relative">
          <Bar data={preparedChartData} options={options} />
        </div>
      </CardBody>
    </Card>
  );
};

export default ReusableBarChartCard;
