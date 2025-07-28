import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Briefcase,
  DollarSign,
  TrendingUp,
  BarChart3,
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { state, toggleSidebar } = useApp();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/customers', icon: Users, label: 'Customers' },
    { path: '/tasks', icon: CheckSquare, label: 'Tasks' },
    { path: '/projects', icon: Briefcase, label: 'Projects' },
    { path: '/revenue', icon: DollarSign, label: 'Revenue' },
    { path: '/pipeline', icon: TrendingUp, label: 'Pipeline' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const sidebarVariants = {
    expanded: {
      width: '18rem',
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    collapsed: {
      width: '5rem',
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  };

  const mobileOverlayVariants = {
    open: {
      opacity: 1,
      backdropFilter: 'blur(4px)',
      transition: { duration: 0.3 }
    },
    closed: {
      opacity: 0,
      backdropFilter: 'blur(0px)',
      transition: { duration: 0.3 }
    }
  };

  const mobileSidebarVariants = {
    open: {
      x: 0,
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    closed: {
      x: '-100%',
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-warm-200/30"
      >
        <Menu className="w-6 h-6 text-warm-700 dark:text-warm-300" />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileOverlayVariants}
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={state.sidebarCollapsed ? 'collapsed' : 'expanded'}
        className="hidden lg:flex fixed left-0 top-0 h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-warm-200/30 dark:border-gray-700/30 z-30"
      >
        <div className="flex flex-col w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-warm-200/30 dark:border-gray-700/30">
            {!state.sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-cream-accent-yellow to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-warm-900 dark:text-warm-100">
                    ADmyBRAND
                  </h2>
                  <p className="text-xs text-warm-600 dark:text-warm-400">
                    Insights
                  </p>
                </div>
              </motion.div>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-warm-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {state.sidebarCollapsed ? (
                <ChevronRight className="w-5 h-5 text-warm-600 dark:text-warm-400" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-warm-600 dark:text-warm-400" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-cream-accent-yellow/20 dark:bg-orange-500/20 text-warm-900 dark:text-warm-100'
                      : 'text-warm-600 dark:text-warm-400 hover:bg-warm-100/50 dark:hover:bg-gray-700/50 hover:text-warm-900 dark:hover:text-warm-100'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-cream-accent-yellow' : ''}`} />
                  {!state.sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileSidebarVariants}
            className="fixed left-0 top-0 h-full w-72 bg-white dark:bg-gray-900 z-50 lg:hidden shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-warm-200/30 dark:border-gray-700/30">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-cream-accent-yellow to-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-warm-900 dark:text-warm-100">
                      ADmyBRAND
                    </h2>
                    <p className="text-xs text-warm-600 dark:text-warm-400">
                      Insights
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-warm-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-warm-600 dark:text-warm-400" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 min-h-[44px] ${
                        isActive
                          ? 'bg-cream-accent-yellow/20 dark:bg-orange-500/20 text-warm-900 dark:text-warm-100'
                          : 'text-warm-600 dark:text-warm-400 hover:bg-warm-100/50 dark:hover:bg-gray-700/50 hover:text-warm-900 dark:hover:text-warm-100'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-cream-accent-yellow' : ''}`} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
