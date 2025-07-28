export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  value: number;
  lastContact: Date;
  source: string;
  avatar?: string;
  tags: string[];
  notes: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: string;
  customerId?: string;
  projectId?: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  attachments: string[];
  timeSpent: number; // in minutes
  estimatedTime: number; // in minutes
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  progress: number; // 0-100
  budget: number;
  spent: number;
  startDate: Date;
  endDate: Date;
  customerId: string;
  teamMembers: string[];
  tasks: string[]; // task IDs
  createdAt: Date;
  updatedAt: Date;
}

export interface Revenue {
  id: string;
  amount: number;
  currency: string;
  source: 'subscription' | 'one-time' | 'recurring' | 'commission';
  customerId: string;
  projectId?: string;
  status: 'pending' | 'confirmed' | 'failed';
  date: Date;
  description: string;
}

export interface PipelineStage {
  id: string;
  name: string;
  order: number;
  deals: Deal[];
  color: string;
}

export interface Deal {
  id: string;
  title: string;
  value: number;
  customerId: string;
  stageId: string;
  probability: number; // 0-100
  expectedCloseDate: Date;
  source: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ActivityLog {
  id: string;
  type: 'customer_created' | 'task_completed' | 'deal_moved' | 'project_updated' | 'revenue_added';
  title: string;
  description: string;
  userId: string;
  entityId: string;
  entityType: 'customer' | 'task' | 'project' | 'deal' | 'revenue';
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'agent';
  avatar?: string;
  isActive: boolean;
  lastLogin: Date;
  permissions: string[];
}

export interface DashboardMetrics {
  totalCustomers: number;
  activeProjects: number;
  completedTasks: number;
  monthlyRevenue: number;
  conversionRate: number;
  averageDealSize: number;
  customerSatisfaction: number;
  teamProductivity: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
    fill?: boolean;
  }[];
}

export interface FilterState {
  dateRange: {
    start: Date;
    end: Date;
  };
  status: string[];
  tags: string[];
  search: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  page: number;
  limit: number;
}

export interface AppState {
  theme: 'light' | 'dark';
  sidebarCollapsed: boolean;
  currentUser: User | null;
  notifications: Notification[];
  isLoading: boolean;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}
