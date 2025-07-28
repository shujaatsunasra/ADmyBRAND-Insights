import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/UI';
import { LineChart, BarChart, DoughnutChart } from '../components/Charts';
import { TrendingUp, Users, DollarSign, Target, BarChart3, PieChart, Activity } from 'lucide-react';
import { 
  generateRevenueChartData, 
  generateTaskStatusChartData, 
  generateCustomerSourceChartData,
  generateProjectProgressData 
} from '../utils/mockData';

const Analytics: React.FC = () => {
  const revenueData = generateRevenueChartData();
  const taskData = generateTaskStatusChartData();
  const customerData = generateCustomerSourceChartData();
  const projectData = generateProjectProgressData();

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-3xl font-bold text-warm-900 dark:text-warm-100 font-['Plus_Jakarta_Sans']">
          Business Analytics
        </h1>
        <p className="text-warm-600 dark:text-warm-400 mt-1 font-medium">
          Comprehensive insights into your business performance and growth metrics
        </p>
      </motion.div>

      {/* Enhanced KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 hover:shadow-glow-lg transition-all duration-300" hover={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-warm-600 dark:text-warm-400">Growth Rate</p>
                <p className="text-3xl font-bold text-warm-900 dark:text-warm-100">+24.5%</p>
                <p className="text-sm text-emerald-600 font-medium mt-1">
                  <TrendingUp className="w-4 h-4 inline mr-1" />
                  +5.2% vs last month
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
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 hover:shadow-glow-lg transition-all duration-300" hover={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-warm-600 dark:text-warm-400">Customer Retention</p>
                <p className="text-3xl font-bold text-warm-900 dark:text-warm-100">94.2%</p>
                <p className="text-sm text-emerald-600 font-medium mt-1">
                  <Activity className="w-4 h-4 inline mr-1" />
                  Excellent performance
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl">
                <Users className="w-8 h-8 text-emerald-600" />
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
                <p className="text-sm font-medium text-warm-600 dark:text-warm-400">Average Deal Size</p>
                <p className="text-3xl font-bold text-warm-900 dark:text-warm-100">$45.2K</p>
                <p className="text-sm text-blue-600 font-medium mt-1">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  +12% increase
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-xl">
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 hover:shadow-glow-lg transition-all duration-300" hover={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-warm-600 dark:text-warm-400">Conversion Rate</p>
                <p className="text-3xl font-bold text-warm-900 dark:text-warm-100">18.7%</p>
                <p className="text-sm text-cream-accent-yellow font-medium mt-1">
                  <Target className="w-4 h-4 inline mr-1" />
                  Above target
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-cream-accent-yellow/20 to-orange-500/20 rounded-xl">
                <Target className="w-8 h-8 text-cream-accent-yellow" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Enhanced Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-cream-accent-yellow" />
              <h3 className="text-xl font-bold text-warm-900 dark:text-warm-100 font-['Plus_Jakarta_Sans']">
                Revenue Analytics
              </h3>
            </div>
            <LineChart data={revenueData} />
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-6 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-bold text-warm-900 dark:text-warm-100 font-['Plus_Jakarta_Sans']">
                Task Completion
              </h3>
            </div>
            <DoughnutChart data={taskData} />
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="p-6 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-emerald-600" />
              <h3 className="text-xl font-bold text-warm-900 dark:text-warm-100 font-['Plus_Jakarta_Sans']">
                Customer Acquisition
              </h3>
            </div>
            <BarChart data={customerData} />
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card className="p-6 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-purple-600" />
              <h3 className="text-xl font-bold text-warm-900 dark:text-warm-100 font-['Plus_Jakarta_Sans']">
                Project Performance
              </h3>
            </div>
            <BarChart data={projectData} />
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Analytics;
