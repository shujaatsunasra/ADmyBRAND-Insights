import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { formatRelativeTime } from '../../utils/helpers';

const NotificationCenter: React.FC = () => {
  const { state, removeNotification, markNotificationRead } = useApp();
  const { notifications } = state;
  const processedNotifications = useRef(new Set<string>());

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-green-200/50 bg-green-50/80 dark:border-green-800/50 dark:bg-green-900/30';
      case 'error':
        return 'border-red-200/50 bg-red-50/80 dark:border-red-800/50 dark:bg-red-900/30';
      case 'warning':
        return 'border-yellow-200/50 bg-yellow-50/80 dark:border-yellow-800/50 dark:bg-yellow-900/30';
      default:
        return 'border-blue-200/50 bg-blue-50/80 dark:border-blue-800/50 dark:bg-blue-900/30';
    }
  };

  // Auto-remove notifications after 5 seconds - ONLY ONCE per notification
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    
    notifications.forEach(notification => {
      // Only process each notification once
      if (!processedNotifications.current.has(notification.id) && !notification.read) {
        processedNotifications.current.add(notification.id);
        
        const timer = setTimeout(() => {
          removeNotification(notification.id);
          processedNotifications.current.delete(notification.id);
        }, 5000);

        timers.push(timer);
      }
    });

    // Cleanup function - clear all timers when effect runs again
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [notifications, removeNotification]);

  // Clean up processed notifications when they're removed
  useEffect(() => {
    const currentIds = new Set(notifications.map(n => n.id));
    const processedIds = Array.from(processedNotifications.current);
    
    processedIds.forEach(id => {
      if (!currentIds.has(id)) {
        processedNotifications.current.delete(id);
      }
    });
  }, [notifications]);

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-sm space-y-3 pointer-events-auto">
      <AnimatePresence mode="popLayout">
        {notifications.slice(0, 4).map((notification) => (
          <motion.div
            key={notification.id}
            className={`pointer-events-auto transform transition-all duration-300 border rounded-xl p-4 shadow-lg backdrop-blur-sm ${getBackgroundColor(notification.type)}`}
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.16, 1, 0.3, 1],
              layout: { duration: 0.2 }
            }}
            layout
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white leading-tight">
                  {notification.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {formatRelativeTime(notification.timestamp)}
                </p>
              </div>
              
              <button
                onClick={() => removeNotification(notification.id)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200 p-1 rounded-md hover:bg-white/20 dark:hover:bg-black/20 touch-manipulation"
                style={{
                  WebkitTapHighlightColor: 'transparent',
                  minHeight: '32px',
                  minWidth: '32px'
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;
