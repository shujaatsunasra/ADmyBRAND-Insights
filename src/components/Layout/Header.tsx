import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';
import {
  Search,
  Bell,
  User,
  Moon,
  Sun,
  Settings,
  LogOut,
  ChevronDown
} from 'lucide-react';

const Header: React.FC = () => {
  const { state, toggleTheme, addNotification } = useApp();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNotificationClick = () => {
    addNotification({
      type: 'info',
      title: 'Notifications',
      message: 'You have 3 new notifications'
    });
  };

  const mockUser = {
    name: 'Shujaat Sunasara',
    email: 'shujaatsunasara@admybrand.com',
    avatar: null
  };

  return (
    <motion.header 
      className="bg-white/90 dark:bg-warm-900/80 backdrop-blur-2xl border-b border-warm-200/20 dark:border-warm-700/20 shadow-soft sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between px-6 py-4 lg:px-10">
        {/* Premium Search */}
        <div className="flex items-center space-x-6 flex-1">
          <motion.div 
            className="relative max-w-lg w-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warm-500 dark:text-warm-400" />
            <input
              type="text"
              placeholder="Search across your workspace..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3 bg-white/80 dark:bg-warm-800/60 border border-warm-200/40 dark:border-warm-600/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/60 transition-all duration-300 text-warm-900 dark:text-warm-100 placeholder-warm-500 dark:placeholder-warm-400 font-medium backdrop-blur-xl"
            />
          </motion.div>
        </div>

        {/* Premium Actions */}
        <div className="flex items-center space-x-4">
          {/* Enhanced Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-3 bg-white/80 dark:bg-warm-800/60 hover:bg-amber-50/80 dark:hover:bg-warm-700/70 rounded-2xl transition-all duration-300 border border-warm-200/40 dark:border-warm-600/40 backdrop-blur-xl shadow-soft hover:shadow-glow"
            title={`Switch to ${state.theme === 'light' ? 'dark' : 'light'} mode`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {state.theme === 'light' ? (
              <Moon className="w-5 h-5 text-warm-600 dark:text-warm-400" />
            ) : (
              <Sun className="w-5 h-5 text-amber-500" />
            )}
          </motion.button>

          {/* Enhanced Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNotificationClick}
            className="relative p-3 bg-white/80 dark:bg-warm-800/60 hover:bg-amber-50/80 dark:hover:bg-warm-700/70 rounded-2xl transition-all duration-300 border border-warm-200/40 dark:border-warm-600/40 backdrop-blur-xl shadow-soft hover:shadow-glow"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Bell className="w-5 h-5 text-warm-600 dark:text-warm-400" />
            {state.notifications.length > 0 && (
              <motion.span 
                className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-glow"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                {state.notifications.length}
              </motion.span>
            )}
          </motion.button>

          {/* Premium Profile Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-3 p-3 bg-white/80 dark:bg-warm-800/60 hover:bg-amber-50/80 dark:hover:bg-warm-700/70 rounded-2xl transition-all duration-300 border border-warm-200/40 dark:border-warm-600/40 backdrop-blur-xl shadow-soft hover:shadow-glow min-h-[52px]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              {/* Avatar */}
              <div className="w-8 h-8 bg-gradient-to-br from-cream-accent-yellow to-orange-500 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              
              {/* User Info - Hidden on small screens */}
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-warm-900 dark:text-warm-100">
                  {mockUser.name}
                </p>
                <p className="text-xs text-warm-600 dark:text-warm-400">
                  {mockUser.email}
                </p>
              </div>

              <ChevronDown className={`w-4 h-4 text-warm-600 dark:text-warm-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-warm-200/30 dark:border-gray-700/30 overflow-hidden z-50"
              >
                {/* User Info */}
                <div className="p-4 border-b border-warm-200/30 dark:border-gray-700/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cream-accent-yellow to-orange-500 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-warm-900 dark:text-warm-100">
                        {mockUser.name}
                      </p>
                      <p className="text-sm text-warm-600 dark:text-warm-400">
                        {mockUser.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <button
                    onClick={() => setIsProfileOpen(false)}
                    className="w-full flex items-center space-x-3 p-3 text-left hover:bg-warm-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 min-h-[44px]"
                  >
                    <Settings className="w-5 h-5 text-warm-600 dark:text-warm-400" />
                    <span className="text-warm-700 dark:text-warm-300">Settings</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      addNotification({
                        type: 'info',
                        title: 'Logout',
                        message: 'You have been logged out successfully'
                      });
                    }}
                    className="w-full flex items-center space-x-3 p-3 text-left hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200 min-h-[44px]"
                  >
                    <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <span className="text-red-700 dark:text-red-300">Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </motion.header>
  );
};

export default Header;
