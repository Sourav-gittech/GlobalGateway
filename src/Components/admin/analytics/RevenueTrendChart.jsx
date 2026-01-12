import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

export default function RevenueTrendChart() {
  const [activeView, setActiveView] = useState('revenue');

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Sample data for Revenue
  const revenueData = [45000, 48000, 52000, 58000, 62000, 68000, 72000, 76000, 81000, 85000, 88000, 92000];
  const revenueTarget = [50000, 50000, 50000, 60000, 60000, 60000, 70000, 70000, 70000, 80000, 80000, 80000];

  // Sample data for Course Purchases
  const coursePurchasesData = [120, 145, 168, 195, 210, 238, 265, 290, 315, 340, 365, 390];
  const coursePurchasesTarget = [100, 150, 150, 200, 200, 200, 250, 250, 250, 300, 350, 400];

  const getChartData = () => {
    let actualData, targetData, actualLabel;
    
    if (activeView === 'revenue') {
      actualData = revenueData;
      targetData = revenueTarget;
      actualLabel = 'Revenue';
    } else if (activeView === 'purchases') {
      actualData = coursePurchasesData;
      targetData = coursePurchasesTarget;
      actualLabel = 'Course Purchases';
    } else {
      // Both view - show both datasets
      actualData = revenueData;
      targetData = revenueTarget;
      actualLabel = 'Revenue';
    }

    return {
      labels: months,
      datasets: [
        {
          label: actualLabel,
          data: actualData,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          tension: 0,
          pointRadius: 4,
          pointBackgroundColor: '#06b6d4',
          pointBorderColor: '#1e293b',
          pointBorderWidth: 2,
          fill: true,
        },
        {
          label: 'Target',
          data: targetData,
          borderColor: '#f59e0b',
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderDash: [8, 4],
          tension: 0.4,
          pointRadius: 0,
          fill: false,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            size: 12,
          },
          color: '#9ca3af',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        padding: 12,
        titleFont: {
          size: 13,
        },
        bodyFont: {
          size: 12,
        },
        titleColor: '#f3f4f6',
        bodyColor: '#f3f4f6',
        borderColor: '#374151',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (activeView === 'revenue') {
              label += '$' + context.parsed.y.toLocaleString();
            } else {
              label += context.parsed.y.toLocaleString();
            }
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: 'rgba(255, 255, 255, 0.05)',
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
          color: '#6b7280',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(255, 255, 255, 0.05)',
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
          color: '#6b7280',
          callback: function(value) {
            if (activeView === 'revenue') {
              return value >= 1000 ? (value / 1000) + 'k' : value;
            }
            return value >= 1000 ? (value / 1000) + 'k' : value;
          },
        },
      },
    },
  };

  return (
    <div className=" border border-gray-700/50 rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-md font-semibold text-gray-100">
            Revenue & Course Purchase Trend
          </h2>
          <p className="text-sm text-gray-400 mt-1">Monthly performance overview for 2025</p>
        </div>
        <div className="flex gap-2 bg-gray-700 rounded-lg p-1" style={{ backgroundColor: '#334155' }}>
          <button
            onClick={() => setActiveView('revenue')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeView === 'revenue'
                ? 'bg-gray-600 text-white shadow'
                : 'text-gray-300 hover:text-white'
            }`}
            style={activeView === 'revenue' ? { backgroundColor: '#475569' } : {}}
          >
            Revenue
          </button>
          <button
            onClick={() => setActiveView('purchases')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeView === 'purchases'
                ? 'bg-blue-600 text-white shadow'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Course Purchases
          </button>
          <button
            onClick={() => setActiveView('both')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeView === 'both'
                ? 'bg-gray-600 text-white shadow'
                : 'text-gray-300 hover:text-white'
            }`}
            style={activeView === 'both' ? { backgroundColor: '#475569' } : {}}
          >
            Both
          </button>
        </div>
      </div>
      <div style={{ height: '400px' }}>
        <Line data={getChartData()} options={options} />
      </div>
    </div>
  );
}