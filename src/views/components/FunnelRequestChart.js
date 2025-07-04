import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartJsTitle,
  Tooltip,
  Legend as ChartJsLegend
} from 'chart.js';

// Register necessary ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartJsTitle,
  Tooltip,
  ChartJsLegend
);

// Helper function to convert hex to rgba
const hexToRgba = (hex, alpha) => {
  if (!hex || typeof hex !== 'string' || hex.length < 4) {
    console.warn("Invalid hex color provided to hexToRgba:", hex);
    return `rgba(0, 0, 0, ${alpha})`;
  }
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    console.warn("Error parsing hex color:", hex);
    return `rgba(0, 0, 0, ${alpha})`;
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const FunnelRequestChart = ({
  title,
  funnelDataItems,
  // MODIFIED: Changed default class to be more theme-friendly.
  // The theme's CSS for '.card-title' will handle color changes in light/dark mode.
  chartTitleClass = 'card-title',
  chartCanvasHeight = null
}) => {
  // MODIFIED: The 'card' class will handle the background color via the theme's CSS.
  // Text color will also be handled by the theme, so 'text-light' is removed.
  if (!Array.isArray(funnelDataItems) || funnelDataItems.length === 0) {
    return <div className="card text-center p-3">No data to display.</div>;
  }

  const sortedFunnelData = [...funnelDataItems].sort((a, b) => b.value - a.value);

  const baseColorHex = '#349AEF';
  const opacities = [1, 0.8, 0.6, 0.4, 0.2];

  const chartLabels = sortedFunnelData.map(item => item.label);

  const maxAxisValue = 100;
  const chartDataValues = sortedFunnelData.map(item => {
    const value = item.value;
    const effectiveValue = Math.min(value, maxAxisValue);
    const start = (maxAxisValue - effectiveValue) / 2;
    const end = start + effectiveValue;
    return [start, end];
  });

  const backgroundColors = sortedFunnelData.map((item, index) =>
    hexToRgba(baseColorHex, opacities[index % opacities.length])
  );

  const chartJsData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Request Rate',
        data: chartDataValues,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        borderWidth: 1,
        borderSkipped: false,
        borderRadius: {
          topLeft: 8,
          topRight: 8,
          bottomLeft: 8,
          bottomRight: 8,
        },
        barThickness: 25,
      },
    ],
  };

  const chartJsOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
        min: 0,
        max: maxAxisValue,
      },
      y: {
        display: false,
        reverse: false,
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        callbacks: {
          label: function (context) {
            const originalItem = sortedFunnelData[context.dataIndex];
            let label = context.dataset.label || '';
            if (label) { label += ': '; }
            if (originalItem && originalItem.value !== null) {
              label += originalItem.value + '%';
            }
            return label;
          },
          labelColor: function() {
            return { borderColor: 'rgba(0,0,0,0)', backgroundColor: 'rgba(0,0,0,0)', borderWidth: 0 };
          }
        },
      },
    },
    layout: { padding: { top: 5, bottom: 5, left: 5, right: 5 } },
  };

  const barSpacing = 15;
  const calculatedCanvasHeight = `${(sortedFunnelData.length * (25 + barSpacing)) - barSpacing + 10}px`;
  const finalCanvasHeight = chartCanvasHeight || calculatedCanvasHeight;

  return (
    // MODIFIED:
    // 1. Replaced inline 'backgroundColor' with the 'card' class. The dashboard's theme will now control the background.
    // 2. Removed the 'chartBackgroundColor' prop as it's no longer needed.
    <div className="card p-3" style={{ borderRadius: '0.25rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* MODIFIED: Removed inline 'color' style. The 'card-title' class will handle this. */}
      {title && <h4 className={chartTitleClass} style={{ flexShrink: 0 }}>{title}</h4>}
      <div className="d-flex align-items-center" style={{flexGrow: 1}}>
        <div className="w-60" style={{ position: 'relative', height: finalCanvasHeight, minWidth: '120px' }}>
          <Bar data={chartJsData} options={chartJsOptions} />
        </div>
        <div className="w-40 ml-3 d-flex flex-column justify-content-center">
          <ul className="list-unstyled p-0 m-0">
            {sortedFunnelData.map((item, index) => (
              <li
                key={item.label}
                className="d-flex align-items-center justify-content-between mb-2"
              >
                <div className="d-flex align-items-center">
                  <span
                    className="rounded-circle mr-2"
                    style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: backgroundColors[index],
                      display: 'inline-block',
                      flexShrink: 0
                    }}
                  />
                  {/* MODIFIED: Removed 'text-light'. The theme will set the correct text color inside a '.card'. */}
                  <span style={{ fontSize: '0.875rem' }}>
                    {item.label}
                  </span>
                </div>
                {/* MODIFIED: Removed 'text-light'. The theme will set the correct text color. */}
                <span
                  className="font-weight-bold"
                  style={{
                    fontSize: '0.875rem',
                    flexShrink: 0,
                    paddingLeft: '0.5rem'
                  }}
                >
                  {item.value}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FunnelRequestChart;
