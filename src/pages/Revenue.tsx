import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Badge } from '../components/UI';
import { LineChart } from '../components/Charts';
import { Plus, TrendingUp, DollarSign, Calendar, Download, BarChart3 } from 'lucide-react';
import { generateMockRevenue, generateRevenueChartData } from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils/helpers';

const Revenue: React.FC = () => {
  const [revenue] = useState(generateMockRevenue(100));
  const chartData = generateRevenueChartData();

  const totalRevenue = revenue.reduce((sum, item) => sum + item.amount, 0);
  const confirmedRevenue = revenue.filter(item => item.status === 'confirmed').reduce((sum, item) => sum + item.amount, 0);

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Enhanced Header */}
      <motion.div 
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-warm-900 dark:text-warm-100 font-['Plus_Jakarta_Sans']">
            Revenue Management
          </h1>
          <p className="text-warm-600 dark:text-warm-400 mt-1 font-medium">
            Track and analyze your revenue streams
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              variant="secondary" 
              size="md"
              className="min-h-[48px] px-6 font-semibold text-center whitespace-nowrap backdrop-blur-md"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              variant="primary" 
              size="md"
              className="min-h-[48px] px-6 font-semibold text-center whitespace-nowrap shadow-glow"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Revenue
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 hover:shadow-glow-lg transition-all duration-300" hover={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-warm-600 dark:text-warm-400">Total Revenue</p>
                <p className="text-3xl font-bold text-warm-900 dark:text-warm-100">{formatCurrency(totalRevenue)}</p>
                <p className="text-sm text-emerald-600 font-medium mt-1">
                  <TrendingUp className="w-4 h-4 inline mr-1" />
                  +12.5% from last month
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl">
                <DollarSign className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 hover:shadow-glow-lg transition-all duration-300" hover={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-warm-600 dark:text-warm-400">Confirmed Revenue</p>
                <p className="text-3xl font-bold text-warm-900 dark:text-warm-100">{formatCurrency(confirmedRevenue)}</p>
                <p className="text-sm text-blue-600 font-medium mt-1">
                  <BarChart3 className="w-4 h-4 inline mr-1" />
                  {Math.round((confirmedRevenue / totalRevenue) * 100)}% of total
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 hover:shadow-glow-lg transition-all duration-300" hover={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-warm-600 dark:text-warm-400">This Month</p>
                <p className="text-3xl font-bold text-warm-900 dark:text-warm-100">{formatCurrency(284750)}</p>
                <p className="text-sm text-cream-accent-yellow font-medium mt-1">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Current period
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-cream-accent-yellow/20 to-orange-500/20 rounded-xl">
                <Calendar className="w-8 h-8 text-cream-accent-yellow" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Enhanced Chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6 backdrop-blur-md">
          <h3 className="text-xl font-bold text-warm-900 dark:text-warm-100 mb-4 font-['Plus_Jakarta_Sans']">
            Revenue Trend Analysis
          </h3>
          <LineChart data={chartData} />
        </Card>
      </motion.div>

      {/* Enhanced Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="overflow-hidden backdrop-blur-md">
          <div className="p-6 border-b border-warm-200/30 dark:border-warm-700/30">
            <h3 className="text-xl font-bold text-warm-900 dark:text-warm-100 font-['Plus_Jakarta_Sans']">
              Recent Transactions
            </h3>
            <p className="text-warm-600 dark:text-warm-400 mt-1">
              Latest revenue entries and updates
            </p>
          </div>
          <div className="divide-y divide-warm-200/30 dark:divide-warm-700/30">
            {revenue.slice(0, 10).map((item, index) => (
              <motion.div 
                key={item.id} 
                className="p-6 hover:bg-warm-50/50 dark:hover:bg-warm-800/30 transition-colors duration-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + (index * 0.05) }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-warm-900 dark:text-warm-100 mb-1">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-warm-500 dark:text-warm-400">
                      <span className="font-medium">{formatDate(item.date)}</span>
                      <span>•</span>
                      <span className="font-medium">{item.source}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge 
                      variant={
                        item.status === 'confirmed' ? 'success' :
                        item.status === 'pending' ? 'warning' : 'error'
                      }
                      className="font-medium"
                    >
                      {item.status}
                    </Badge>
                    <span className="font-bold text-xl text-warm-900 dark:text-warm-100">
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Revenue;
