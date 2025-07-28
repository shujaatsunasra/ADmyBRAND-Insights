// Motion configuration for consistent animations across the application
// Enterprise-grade animation system for ADmyBRAND Insights Pro

export const motionConfig = {
  // Page transitions - smooth and professional
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.25, ease: 'easeOut' }
  },

  // Layout transitions - responsive and fluid
  layoutTransition: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30
  },

  // Card entrance animations - staggered for visual hierarchy
  cardEntrance: {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.3, ease: 'easeOut' }
  },

  // Stagger animations for lists and grids
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },

  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.25, ease: 'easeOut' }
  },

  // Button interactions - subtle and responsive
  buttonHover: {
    scale: 1.02,
    transition: { duration: 0.15, ease: 'easeOut' }
  },

  buttonTap: {
    scale: 0.98,
    transition: { duration: 0.1, ease: 'easeOut' }
  },

  // Modal and overlay animations
  modalOverlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
  },

  modalContent: {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
    transition: { duration: 0.25, ease: 'easeOut' }
  },

  // Dropdown and popover animations
  dropdown: {
    initial: { opacity: 0, scale: 0.95, y: -10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -10 },
    transition: { duration: 0.15, ease: 'easeOut' }
  },

  // Loading and skeleton animations
  loadingPulse: {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  },

  // Table row animations
  tableRow: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.2, ease: 'easeOut' }
  },

  // Chart and data visualization animations
  chartEntrance: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },

  // Sidebar and navigation animations
  sidebarToggle: {
    transition: { duration: 0.3, ease: 'easeInOut' }
  },

  // Notification animations
  notification: {
    initial: { opacity: 0, x: 300, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 300, scale: 0.95 },
    transition: { duration: 0.3, ease: 'easeOut' }
  },

  // Search and filter animations
  searchExpand: {
    initial: { width: 200 },
    focus: { width: 320 },
    transition: { duration: 0.25, ease: 'easeOut' }
  },

  // Status and badge animations
  statusPulse: {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }
};

// Viewport animation triggers for scroll-based animations
export const viewportConfig = {
  once: true,
  margin: '0px 0px -100px 0px',
  amount: 0.3
};

// Utility function for creating consistent spring animations
export const createSpringAnimation = (
  stiffness: number = 400,
  damping: number = 30,
  mass: number = 1
) => ({
  type: 'spring' as const,
  stiffness,
  damping,
  mass
});

// Utility function for creating consistent timing animations
export const createTimingAnimation = (
  duration: number = 0.25,
  ease: string = 'easeOut',
  delay: number = 0
) => ({
  duration,
  ease,
  delay
});
