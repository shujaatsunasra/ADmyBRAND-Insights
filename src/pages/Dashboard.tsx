import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { Card, Button, Badge } from '../components/UI';
import { BarChart, LineChart, DoughnutChart } from '../components/Charts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  CheckSquare,
  Briefcase,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Filter,
  Download,
  Calendar,
  Target,
  Zap,
  Star,
  Activity,
  Clock
} from 'lucide-react';
import {
  generateDashboardMetrics,
  generateRevenueChartData,
  generateTaskStatusChartData,
  generateCustomerSourceChartData,
  generateMockActivityLogs,
  generateMockCustomers,
  generateMockTasks
} from '../utils/mockData';
import { formatCurrency, formatNumber, formatRelativeTime } from '../utils/helpers';

// Session-based welcome tracking
const WELCOME_SHOWN_KEY = 'dashboard-welcome-shown';

const Dashboard: React.FC = () => {
  const { addNotification } = useApp();
  const [metrics, setMetrics] = useState(generateDashboardMetrics());
  const [revenueData, setRevenueData] = useState(generateRevenueChartData());
  const [taskData, setTaskData] = useState(generateTaskStatusChartData());
  const [customerSourceData, setCustomerSourceData] = useState(generateCustomerSourceChartData());
  const [activityLogs, setActivityLogs] = useState(generateMockActivityLogs(8));
  const [recentCustomers, setRecentCustomers] = useState(generateMockCustomers(5));
  const [recentTasks, setRecentTasks] = useState(generateMockTasks(5));
  const [loading, setLoading] = useState(true);
  const hasShownWelcome = useRef(false);

  useEffect(() => {
    // Check if welcome has been shown this session
    const welcomeShown = sessionStorage.getItem(WELCOME_SHOWN_KEY);
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Only show welcome notification once per session
      if (!welcomeShown && !hasShownWelcome.current) {
        hasShownWelcome.current = true;
        sessionStorage.setItem(WELCOME_SHOWN_KEY, 'true');
        
        addNotification({
          type: 'success',
          title: 'Dashboard Loaded',
          message: 'Welcome back! Your dashboard is ready.'
        });
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [addNotification]);

  // Circular Progress Component (Crextio-style)
  const CircularProgress: React.FC<{
    percentage: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
    children?: React.ReactNode;
  }> = ({ percentage, size = 120, strokeWidth = 8, color = '#fbbf24', children }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(217, 119, 6, 0.1)"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      </div>
    );
  };

  // Enhanced Metric Card (Premium Crextio-style)
  const PremiumMetricCard: React.FC<{
    title: string;
    value: string | number;
    change: number;
    icon: React.ElementType;
    color: string;
    format?: 'currency' | 'number' | 'percentage';
    showProgress?: boolean;
    progress?: number;
    delay?: number;
  }> = ({ title, value, change, icon: Icon, color, format = 'number', showProgress = false, progress = 0, delay = 0 }) => {
    const isPositive = change >= 0;
    const formattedValue = format === 'currency' 
      ? formatCurrency(Number(value))
      : format === 'percentage'
      ? `${value}%`
      : formatNumber(Number(value));

    return (
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
        whileHover={{ 
          y: -8,
          scale: 1.02,
          transition: { duration: 0.3, type: "spring", stiffness: 400 }
        }}
        className="group cursor-pointer"
      >
        <Card className="p-8 h-full hover:shadow-soft-xl transition-all duration-500" hover={true} gradient={true}>
          <div className="flex items-start justify-between mb-6">
            <div className="space-y-2">
              <p className="text-sm font-bold text-warm-600 dark:text-warm-400 uppercase tracking-wider">
                {title}
              </p>
              <motion.p 
                className="text-4xl font-bold text-warm-900 dark:text-warm-100 font-['Plus_Jakarta_Sans']"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
              >
                {formattedValue}
              </motion.p>
              <div className={`flex items-center space-x-2 ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: delay + 0.4 }}
                >
                  {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                </motion.div>
                <span className="text-sm font-bold">
                  {isPositive ? '+' : ''}{change.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="relative">
              <motion.div 
                className={`p-3 rounded-2xl ${color} shadow-glow group-hover:shadow-glow-lg group-hover:scale-110 transition-all duration-300`}
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Icon className="w-6 h-6 text-white" />
              </motion.div>
              <div className={`absolute inset-0 ${color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-300`} />
            </div>
          </div>
          
          {showProgress && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-warm-500 dark:text-warm-400 font-medium">Progress</span>
                <span className="text-warm-700 dark:text-warm-300 font-bold">{progress}%</span>
              </div>
              <div className="w-full bg-warm-200/30 dark:bg-warm-700/30 rounded-full h-3 overflow-hidden">
                <motion.div
                  className={`h-full ${color} rounded-full shadow-glow`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.5, delay: delay + 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          )}
        </Card>
      </motion.div>
    );
  };

  // Time Tracker Widget (Premium style)
  const TimeTrackerWidget: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const workHours = 7.5;
    const workedHours = 5.2;
    const progressPercentage = (workedHours / workHours) * 100;

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(timer);
    }, []);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="glass-surface p-6 rounded-2xl col-span-1"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-warm-900 dark:text-warm-100">
            Time Tracker
          </h3>
          <Clock className="w-5 h-5 text-cream-accent-yellow" />
        </div>
        
        <div className="flex flex-col items-center space-y-4">
          <CircularProgress percentage={progressPercentage} size={100} strokeWidth={6}>
            <div className="text-center">
              <div className="text-lg font-bold text-warm-900 dark:text-warm-100">
                {workedHours}h
              </div>
              <div className="text-xs text-warm-600 dark:text-warm-400">
                of {workHours}h
              </div>
            </div>
          </CircularProgress>
          
          <div className="text-center">
            <div className="text-sm font-medium text-warm-700 dark:text-warm-300">
              Current Time
            </div>
            <motion.div 
              className="text-xl font-bold text-cream-accent-yellow"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  };
  // Task Widget (Crextio-style)
  const TaskWidget: React.FC = () => {
    const tasks = [
      { id: 1, title: 'Design Review', status: 'completed', priority: 'high' },
      { id: 2, title: 'Client Meeting', status: 'in-progress', priority: 'urgent' },
      { id: 3, title: 'Weekly Sync', status: 'pending', priority: 'medium' },
      { id: 4, title: 'Code Review', status: 'completed', priority: 'low' }
    ];

    const getPriorityColor = (priority: string) => {
      switch (priority) {
        case 'urgent': return 'bg-red-500';
        case 'high': return 'bg-orange-500';
        case 'medium': return 'bg-cream-accent-yellow';
        case 'low': return 'bg-green-500';
        default: return 'bg-gray-500';
      }
    };

    const getStatusIcon = (status: string) => {
      switch (status) {
        case 'completed': return '✓';
        case 'in-progress': return '◐';
        case 'pending': return '○';
        default: return '○';
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass-surface p-6 rounded-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-warm-900 dark:text-warm-100">
            Tasks
          </h3>
          <CheckSquare className="w-5 h-5 text-cream-accent-yellow" />
        </div>
        
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/20 dark:hover:bg-black/10 transition-all duration-200"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getStatusIcon(task.status)}</span>
                <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${
                  task.status === 'completed' 
                    ? 'text-warm-600 dark:text-warm-400 line-through' 
                    : 'text-warm-900 dark:text-warm-100'
                }`}>
                  {task.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  // User Card Widget (Crextio-style)
  const UserCard: React.FC<{ 
    name: string; 
    role: string; 
    earnings: string; 
    avatar?: string; 
    status: 'online' | 'offline' | 'away';
  }> = ({ name, role, earnings, avatar, status }) => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'online': return 'bg-green-500';
        case 'away': return 'bg-yellow-500';
        case 'offline': return 'bg-gray-400';
        default: return 'bg-gray-400';
      }
    };

    return (
      <motion.div
        whileHover={{ y: -2, scale: 1.02 }}
        className="glass-surface p-6 rounded-2xl text-center"
      >
        <div className="relative inline-block mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-cream-accent-yellow to-orange-500 rounded-2xl flex items-center justify-center shadow-glow">
            {avatar ? (
              <img src={avatar} alt={name} className="w-full h-full rounded-2xl object-cover" />
            ) : (
              <span className="text-white text-xl font-bold">
                {name.split(' ').map(n => n[0]).join('')}
              </span>
            )}
          </div>
          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${getStatusColor(status)}`} />
        </div>
        
        <h4 className="text-lg font-bold text-warm-900 dark:text-warm-100 mb-1">
          {name}
        </h4>
        <p className="text-sm text-warm-600 dark:text-warm-400 mb-3">
          {role}
        </p>
        <div className="text-2xl font-bold text-cream-accent-yellow">
          {earnings}
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <motion.div 
          className="flex justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="space-y-2">
            <div className="h-8 w-48 bg-white/20 rounded-xl animate-shimmer" />
            <div className="h-4 w-64 bg-white/10 rounded-lg animate-shimmer" />
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <motion.div 
              key={i} 
              className="glass-surface p-6 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="space-y-4">
                <div className="h-4 w-24 bg-white/20 rounded-lg animate-shimmer" />
                <div className="h-8 w-32 bg-white/20 rounded-lg animate-shimmer" />
                <div className="h-4 w-20 bg-white/20 rounded-lg animate-shimmer" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="space-y-10 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Premium Header */}
      <motion.div 
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <div className="space-y-4">
          <motion.h1 
            className="text-5xl font-bold text-warm-900 dark:text-warm-100 font-['Plus_Jakarta_Sans']"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Dashboard
          </motion.h1>
          <motion.p 
            className="text-lg text-warm-600 dark:text-warm-400 font-medium max-w-2xl leading-relaxed"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Welcome back to ADmyBRAND Insights Pro! Monitor your business performance with real-time analytics and comprehensive reports.
          </motion.p>
        </div>
        
        <motion.div 
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass-surface px-4 py-2 rounded-xl text-sm font-medium text-warm-700 dark:text-warm-300 hover:glass-elevated transition-all duration-200"
          >
            <Filter className="w-4 h-4 mr-2 inline" />
            Filter
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass-surface px-4 py-2 rounded-xl text-sm font-medium text-warm-700 dark:text-warm-300 hover:glass-elevated transition-all duration-200"
          >
            <Calendar className="w-4 h-4 mr-2 inline" />
            Today
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Modern Metrics Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <PremiumMetricCard
          title="Total Customers"
          value={metrics.totalCustomers}
          change={12.5}
          icon={Users}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
          showProgress={true}
          progress={85}
          delay={0.1}
        />
        <PremiumMetricCard
          title="Monthly Revenue"
          value={metrics.monthlyRevenue}
          change={8.2}
          icon={DollarSign}
          color="bg-gradient-to-r from-emerald-500 to-emerald-600"
          format="currency"
          showProgress={true}
          progress={92}
          delay={0.2}
        />
        <PremiumMetricCard
          title="Active Projects"
          value={metrics.activeProjects}
          change={-2.4}
          icon={Briefcase}
          color="bg-gradient-to-r from-purple-500 to-purple-600"
          showProgress={true}
          progress={67}
          delay={0.3}
        />
        <PremiumMetricCard
          title="Completed Tasks"
          value={metrics.completedTasks}
          change={15.8}
          icon={CheckSquare}
          color="bg-gradient-to-r from-amber-400 to-orange-500"
          showProgress={true}
          progress={78}
          delay={0.4}
        />
      </motion.div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-fr">
        {/* Time Tracker */}
        <div className="lg:col-span-3 flex">
          <div className="w-full">
            <TimeTrackerWidget />
          </div>
        </div>
        
        {/* Progress Chart */}
        <motion.div 
          className="lg:col-span-6 glass-surface p-6 rounded-2xl flex flex-col"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-warm-900 dark:text-warm-100">
              Weekly Progress
            </h3>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="ghost" 
                size="sm"
                className="p-2 rounded-xl hover:bg-warm-100/60 dark:hover:bg-warm-700/40"
              >
                <MoreVertical className="w-4 h-4 text-warm-600 dark:text-warm-400" />
              </Button>
            </motion.div>
          </div>
          <div className="flex-1 min-h-64">
            <BarChart data={customerSourceData} />
          </div>
        </motion.div>
        
        {/* Tasks Widget */}
        <div className="lg:col-span-3 flex">
          <div className="w-full">
            <TaskWidget />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Members */}
        <div className="lg:col-span-2">
          <motion.div 
            className="glass-surface p-6 rounded-2xl h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-warm-900 dark:text-warm-100">
                Team Performance
              </h3>
              <button className="text-sm text-cream-accent-yellow hover:text-orange-500 transition-colors">
                View All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <UserCard 
                name="Sarah Chen" 
                role="Senior Designer" 
                earnings="$4,350"
                status="online"
              />
              <UserCard 
                name="Mike Johnson" 
                role="Frontend Dev" 
                earnings="$3,890"
                status="away"
              />
              <UserCard 
                name="Emily Davis" 
                role="Project Manager" 
                earnings="$4,120"
                status="online"
              />
            </div>
          </motion.div>
        </div>
        
        {/* Calendar Widget */}
        <div className="lg:col-span-1">
          <motion.div 
            className="glass-surface p-6 rounded-2xl h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-warm-900 dark:text-warm-100">
                Upcoming Events
              </h3>
              <Calendar className="w-5 h-5 text-cream-accent-yellow" />
            </div>
            
            <div className="space-y-4">
              {[
                { time: '10:00 AM', title: 'Weekly Sync', attendees: 3 },
                { time: '2:30 PM', title: 'Client Review', attendees: 5 },
                { time: '4:00 PM', title: 'Team Meeting', attendees: 8 }
              ].map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-200"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-cream-accent-yellow to-orange-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{event.time.split(':')[0]}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-warm-900 dark:text-warm-100">{event.title}</p>
                    <p className="text-sm text-warm-600 dark:text-warm-400">{event.time}</p>
                  </div>
                  <div className="flex -space-x-1">
                    {[...Array(event.attendees)].slice(0, 3).map((_, i) => (
                      <div 
                        key={i}
                        className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white"
                      />
                    ))}
                    {event.attendees > 3 && (
                      <div className="w-6 h-6 bg-warm-400 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-xs text-white font-medium">+{event.attendees - 3}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
