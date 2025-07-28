import React from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { ChartData } from '../../types';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartProps {
  data: ChartData;
  height?: number;
  options?: any;
  title?: string;
  gradient?: boolean;
  animated?: boolean;
}

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  animation: {
    duration: 2000,
    easing: 'easeInOutQuart',
  },
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 24,
        font: {
          size: 13,
          family: 'Plus Jakarta Sans',
          weight: '500'
        },
        color: '#64748b',
        boxWidth: 8,
        boxHeight: 8
      }
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      titleColor: '#f1f5f9',
      bodyColor: '#cbd5e1',
      borderColor: 'rgba(148, 163, 184, 0.2)',
      borderWidth: 1,
      cornerRadius: 12,
      padding: 16,
      titleFont: {
        size: 14,
        family: 'Plus Jakarta Sans',
        weight: '600'
      },
      bodyFont: {
        size: 13,
        family: 'Plus Jakarta Sans',
        weight: '500'
      },
      boxPadding: 6,
      usePointStyle: true,
      filter: function(tooltipItem: any) {
        return tooltipItem.parsed.y !== null;
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false
      },
      ticks: {
        font: {
          size: 12,
          family: 'Plus Jakarta Sans',
          weight: '500'
        },
        color: '#94a3b8',
        padding: 8
      }
    },
    y: {
      grid: {
        color: 'rgba(148, 163, 184, 0.1)',
        drawBorder: false
      },
      ticks: {
        font: {
          size: 12,
          family: 'Plus Jakarta Sans',
          weight: '500'
        },
        color: '#94a3b8',
        padding: 12
      }
    }
  }
};

export const BarChart: React.FC<ChartProps> = ({ 
  data, 
  height = 300, 
  options = {},
  title,
  gradient = false,
  animated = true
}) => {
  const chartOptions = {
    ...defaultOptions,
    ...options,
    elements: {
      bar: {
        borderRadius: 8,
        borderSkipped: false,
      }
    },
    animation: animated ? {
      duration: 2000,
      easing: 'easeInOutQuart',
      delay: (context: any) => context.dataIndex * 100
    } : false
  };

  return (
    <motion.div 
      className={`chart-container ${gradient ? 'premium-gradient' : ''}`} 
      style={{ height }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {title && (
        <motion.h3 
          className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {title}
        </motion.h3>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Bar data={data} options={chartOptions} />
      </motion.div>
    </motion.div>
  );
};

export const LineChart: React.FC<ChartProps> = ({ 
  data, 
  height = 300, 
  options = {},
  title,
  gradient = false,
  animated = true
}) => {
  const chartOptions = {
    ...defaultOptions,
    ...options,
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 3,
        fill: true
      },
      point: {
        radius: 6,
        hoverRadius: 8,
        borderWidth: 3,
        backgroundColor: '#ffffff',
        borderColor: '#3b82f6',
        hoverBorderWidth: 4
      }
    },
    animation: animated ? {
      duration: 2500,
      easing: 'easeInOutQuart',
      delay: (context: any) => context.dataIndex * 150
    } : false
  };

  return (
    <motion.div 
      className={`chart-container ${gradient ? 'premium-gradient' : ''}`} 
      style={{ height }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {title && (
        <motion.h3 
          className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {title}
        </motion.h3>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Line data={data} options={chartOptions} />
      </motion.div>
    </motion.div>
  );
};

export const DoughnutChart: React.FC<ChartProps> = ({ 
  data, 
  height = 300, 
  options = {},
  title,
  gradient = false,
  animated = true
}) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 24,
          font: {
            size: 13,
            family: 'Plus Jakarta Sans',
            weight: '500'
          },
          color: '#64748b',
          boxWidth: 10,
          boxHeight: 10
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(148, 163, 184, 0.2)',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 16,
        titleFont: {
          size: 14,
          family: 'Plus Jakarta Sans',
          weight: '600'
        },
        bodyFont: {
          size: 13,
          family: 'Plus Jakarta Sans',
          weight: '500'
        },
        boxPadding: 6,
        usePointStyle: true
      }
    },
    cutout: '65%',
    animation: animated ? {
      duration: 2000,
      easing: 'easeInOutQuart',
      animateRotate: true,
      animateScale: true
    } : false,
    elements: {
      arc: {
        borderWidth: 0,
        hoverBorderWidth: 4,
        hoverBorderColor: '#ffffff'
      }
    },
    ...options
  };

  return (
    <motion.div 
      className={`chart-container ${gradient ? 'premium-gradient' : ''}`} 
      style={{ height }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {title && (
        <motion.h3 
          className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {title}
        </motion.h3>
      )}
      <motion.div
        initial={{ opacity: 0, rotate: -10 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <Doughnut data={data} options={chartOptions} />
      </motion.div>
    </motion.div>
  );
};
