import React, { memo, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';
import { motionConfig } from '../../utils/motionConfig';
import Sidebar from './Sidebar';
import Header from './Header';
import LoadingOverlay from '../UI/LoadingOverlay';
import NotificationCenter from '../UI/NotificationCenter';

// Background pattern component for better performance
const BackgroundPattern = memo(() => (
  <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
    {/* Optimized static gradient pattern */}
    <div 
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(127, 86, 217, 0.08) 0%, transparent 50%),
                         radial-gradient(circle at 80% 20%, rgba(127, 86, 217, 0.06) 0%, transparent 50%),
                         radial-gradient(circle at 40% 80%, rgba(127, 86, 217, 0.04) 0%, transparent 50%)`
      }}
    />
    {/* Subtle texture overlay */}
    <div 
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}
    />
  </div>
));
BackgroundPattern.displayName = 'BackgroundPattern';

// Page transition wrapper
const PageTransitionWrapper = memo(({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        className="w-full"
        {...motionConfig.pageTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
});
PageTransitionWrapper.displayName = 'PageTransitionWrapper';

const Layout: React.FC = () => {
  const { state } = useApp();

  // Memoize sidebar margin calculation for performance
  const sidebarMargin = useMemo(() => 
    state.sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72',
    [state.sidebarCollapsed]
  );

  // Memoize background gradient classes
  const backgroundClasses = useMemo(() => 
    "min-h-screen bg-gradient-to-br from-[#fff9ec] to-[#fdf2d9] dark:bg-gradient-to-br dark:from-warm-900 dark:to-gray-900 relative overflow-x-hidden",
    []
  );

  return (
    <div className={backgroundClasses}>
      {/* Static background pattern for performance */}
      <BackgroundPattern />

      {/* Loading overlay with smooth transition */}
      <AnimatePresence>
        {state.isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <LoadingOverlay />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Sidebar with hardware acceleration */}
      <motion.div
        className="fixed left-0 top-0 z-40 h-full"
        initial={false}
        animate={{ 
          transform: 'translateZ(0)', // Force hardware acceleration
        }}
        transition={motionConfig.layoutTransition}
      >
        <Sidebar />
      </motion.div>
      
      {/* Main content area with optimized layout */}
      <motion.div 
        className={`transition-all duration-300 ease-out min-h-screen ${sidebarMargin} ml-0`}
        initial={false}
        animate={{ 
          marginLeft: state.sidebarCollapsed ? undefined : undefined,
          transform: 'translateZ(0)' // Force hardware acceleration
        }}
        transition={motionConfig.layoutTransition}
      >
        {/* Header with sticky positioning and backdrop blur */}
        <motion.div 
          className="sticky top-0 z-30"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Header />
        </motion.div>
        
        {/* Page content with optimized spacing and zero layout shift */}
        <main className="px-4 py-6 lg:px-8 lg:py-8 relative">
          {/* Content container with proper z-index layering */}
          <motion.div 
            className="relative z-10 w-full max-w-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="w-full">
              {/* Page transitions with AnimatePresence */}
              <PageTransitionWrapper>
                <Outlet />
              </PageTransitionWrapper>
            </div>
          </motion.div>
        </main>
      </motion.div>
      
      {/* Notification center with fixed positioning and pointer events */}
      <motion.div 
        className="fixed top-4 right-4 z-50 pointer-events-none"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <NotificationCenter />
      </motion.div>
    </div>
  );
};

export default Layout;
