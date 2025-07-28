import { AppState, FilterState } from '../types';

// Local storage keys
const STORAGE_KEYS = {
  APP_STATE: 'admybrand_app_state',
  FILTER_STATE: 'admybrand_filter_state',
  CUSTOMERS: 'admybrand_customers',
  TASKS: 'admybrand_tasks',
  PROJECTS: 'admybrand_projects',
  REVENUE: 'admybrand_revenue',
  DEALS: 'admybrand_deals',
  PIPELINE: 'admybrand_pipeline'
} as const;

// Storage utility functions
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
    }
  },

  clear: (): void => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }
};

// App state management
export const getAppState = (): Partial<AppState> => {
  return storage.get(STORAGE_KEYS.APP_STATE, {
    theme: 'light',
    sidebarCollapsed: false,
    notifications: [],
    isLoading: false
  });
};

export const setAppState = (state: Partial<AppState>): void => {
  const currentState = getAppState();
  storage.set(STORAGE_KEYS.APP_STATE, { ...currentState, ...state });
};

// Filter state management
export const getFilterState = (entity: string): FilterState => {
  return storage.get(`${STORAGE_KEYS.FILTER_STATE}_${entity}`, {
    dateRange: {
      start: new Date(new Date().getFullYear(), 0, 1),
      end: new Date()
    },
    status: [],
    tags: [],
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    page: 1,
    limit: 25
  });
};

export const setFilterState = (entity: string, state: Partial<FilterState>): void => {
  const currentState = getFilterState(entity);
  storage.set(`${STORAGE_KEYS.FILTER_STATE}_${entity}`, { ...currentState, ...state });
};

// Data persistence
export const saveData = <T>(key: keyof typeof STORAGE_KEYS, data: T): void => {
  storage.set(STORAGE_KEYS[key], data);
};

export const loadData = <T>(key: keyof typeof STORAGE_KEYS, defaultValue: T): T => {
  return storage.get(STORAGE_KEYS[key], defaultValue);
};

// Utility functions
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatNumber = (num: number, notation: 'standard' | 'compact' = 'standard'): string => {
  return new Intl.NumberFormat('en-US', {
    notation,
    maximumFractionDigits: 1
  }).format(num);
};

export const formatDate = (date: Date | string, format: 'short' | 'medium' | 'long' = 'medium'): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  const formats = {
    short: { month: 'short', day: 'numeric' },
    medium: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { month: 'long', day: 'numeric', year: 'numeric' }
  } as const;

  return new Intl.DateTimeFormat('en-US', formats[format]).format(d);
};

export const formatRelativeTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  if (diff < minute) return 'Just now';
  if (diff < hour) return `${Math.floor(diff / minute)}m ago`;
  if (diff < day) return `${Math.floor(diff / hour)}h ago`;
  if (diff < week) return `${Math.floor(diff / day)}d ago`;
  if (diff < month) return `${Math.floor(diff / week)}w ago`;
  if (diff < year) return `${Math.floor(diff / month)}mo ago`;
  return `${Math.floor(diff / year)}y ago`;
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void => {
  let timeout: number;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const generateExportData = (data: any[], type: 'csv' | 'json' = 'csv'): string => {
  if (type === 'json') {
    return JSON.stringify(data, null, 2);
  }
  
  // CSV export
  if (!data.length) return '';
  
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
      }).join(',')
    )
  ];
  
  return csvRows.join('\n');
};

export const downloadFile = (content: string, filename: string, type: string = 'text/plain'): void => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const classNames = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const generatePDF = async (elementId: string, filename: string): Promise<void> => {
  // This would integrate with a PDF library like jsPDF or Puppeteer
  // For now, we'll simulate the functionality
  console.log(`Generating PDF for element ${elementId} as ${filename}`);
  
  // Simulate PDF generation delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real implementation, you would:
  // 1. Capture the DOM element
  // 2. Convert to PDF using a library
  // 3. Download the file
  alert(`PDF ${filename} would be generated in a real implementation`);
};
