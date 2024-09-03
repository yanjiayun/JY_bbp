"use client";
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface TimeSeriesChartProps {
  data: Array<{ time: string, value: number, parameter: string }>;
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data }) => {
  // Extract the data for X and Y axes
  const labels = data.map(item => parseFloat(item.time));
  const values = data.map(item => item.value);

  // Calculate the minimum and maximum values for X and Y axes
  const minTime = Math.min(...labels);
  const maxTime = Math.max(...labels);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  // Ensure that X-axis labels are unique
  const uniqueLabels = Array.from(new Set(labels)).map(time => time.toString());

  // Group the datasets by parameter
  const datasets = data.reduce((acc, item) => {
    const dataset = acc.find(ds => ds.label === item.parameter);
    if (dataset) {
      dataset.data.push(item.value);
    } else {
      acc.push({
        label: item.parameter,
        data: [item.value],
        borderColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
        backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
        fill: false,
      });
    }
    return acc;
  }, [] as Array<{ label: string, data: number[], borderColor: string, backgroundColor: string, fill: boolean }>);

  const chartData = {
    labels: uniqueLabels,
    datasets,
  };

  // Define the options object
  const options = {
    scales: {
      x: {
        type: 'linear' as const,
        min: minTime,
        max: maxTime,
        ticks: {
          stepSize: (maxTime - minTime) / 10,
          callback: function(value) {
            return `${value}s`;
          }
        },
        title: {
          display: true,
          text: 'Time (s)'
        }
      },
      y: {
        beginAtZero: false,
        min: minValue,
        max: maxValue,
        ticks: {
          callback: function(value) {
            return `${value}`;
          }
        },
        title: {
          display: true,
          text: 'Value'
        }
      }
    }
  };

  return (
    <div className='max-w-screen-2xl min-h-[300px] w-full mx-auto'>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TimeSeriesChart;