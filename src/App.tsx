import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/Layout/Layout';
import LoadingOverlay from './components/UI/LoadingOverlay';

// Lazy load pages for better performance
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Customers = React.lazy(() => import('./pages/Customers'));
const Tasks = React.lazy(() => import('./pages/Tasks_old'));
const Projects = React.lazy(() => import('./pages/Projects'));
const Revenue = React.lazy(() => import('./pages/Revenue'));
const Pipeline = React.lazy(() => import('./pages/Pipeline'));
const Analytics = React.lazy(() => import('./pages/Analytics'));
const Settings = React.lazy(() => import('./pages/Settings'));

// Page transition variants for framer-motion
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  }
};

const pageTransition = {
  type: "tween",
  ease: [0.16, 1, 0.3, 1],
  duration: 0.4
};

// Animated page wrapper
const AnimatedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={
          <AnimatedPage>
            <Suspense fallback={<LoadingOverlay />}>
              <Dashboard />
            </Suspense>
          </AnimatedPage>
        } />
        <Route path="customers" element={
          <AnimatedPage>
            <Suspense fallback={<LoadingOverlay />}>
              <Customers />
            </Suspense>
          </AnimatedPage>
        } />
        <Route path="tasks" element={
          <AnimatedPage>
            <Suspense fallback={<LoadingOverlay />}>
              <Tasks />
            </Suspense>
          </AnimatedPage>
        } />
        <Route path="projects" element={
          <AnimatedPage>
            <Suspense fallback={<LoadingOverlay />}>
              <Projects />
            </Suspense>
          </AnimatedPage>
        } />
        <Route path="revenue" element={
          <AnimatedPage>
            <Suspense fallback={<LoadingOverlay />}>
              <Revenue />
            </Suspense>
          </AnimatedPage>
        } />
        <Route path="pipeline" element={
          <AnimatedPage>
            <Suspense fallback={<LoadingOverlay />}>
              <Pipeline />
            </Suspense>
          </AnimatedPage>
        } />
        <Route path="analytics" element={
          <AnimatedPage>
            <Suspense fallback={<LoadingOverlay />}>
              <Analytics />
            </Suspense>
          </AnimatedPage>
        } />
        <Route path="settings" element={
          <AnimatedPage>
            <Suspense fallback={<LoadingOverlay />}>
              <Settings />
            </Suspense>
          </AnimatedPage>
        } />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router basename="/ADmyBRAND-Insights">
        <AppRoutes />
      </Router>
    </AppProvider>
  );
};

export default App;
