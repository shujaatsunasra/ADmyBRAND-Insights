import { Customer, Task, Project, Revenue, Deal, PipelineStage, ActivityLog, DashboardMetrics } from '../types';

// Utility functions for generating mock data
const generateId = () => Math.random().toString(36).substr(2, 9);

const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const randomChoice = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const companies = [
  'TechFlow Solutions', 'DataStream Analytics', 'CloudVision Corp', 'DigitalEdge Inc',
  'InnovateX Labs', 'NextGen Systems', 'FutureScope Technologies', 'SmartBridge Solutions',
  'CyberSync Industries', 'QuantumLeap Enterprises', 'BrightPath Consulting', 'CodeCraft Studios',
  'DevBoost Technologies', 'ScaleUp Solutions', 'MetricFlow Corp', 'AppVantage Inc'
];

const firstNames = [
  'Sarah', 'Michael', 'Jennifer', 'David', 'Jessica', 'Christopher', 'Ashley', 'Daniel',
  'Emily', 'Matthew', 'Amanda', 'Anthony', 'Melissa', 'Joshua', 'Michelle', 'Andrew'
];

const lastNames = [
  'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez',
  'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor'
];

const taskTitles = [
  'Review quarterly reports', 'Update customer database', 'Prepare presentation for client meeting',
  'Analyze market trends', 'Optimize website performance', 'Conduct user research',
  'Develop marketing strategy', 'Review contract terms', 'Update project timeline',
  'Coordinate team meeting', 'Prepare budget proposal', 'Test new features'
];

const projectNames = [
  'Website Redesign', 'Mobile App Development', 'Data Migration', 'CRM Integration',
  'Marketing Campaign Q4', 'Customer Portal', 'Analytics Dashboard', 'E-commerce Platform',
  'Security Audit', 'Cloud Migration', 'API Development', 'User Experience Optimization'
];

// Generate mock customers
export const generateMockCustomers = (count: number = 50): Customer[] => {
  return Array.from({ length: count }, () => {
    const firstName = randomChoice(firstNames);
    const lastName = randomChoice(lastNames);
    const company = randomChoice(companies);
    
    return {
      id: generateId(),
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase().replace(/\s+/g, '')}.com`,
      company,
      phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      status: randomChoice(['active', 'inactive', 'pending']),
      value: Math.floor(Math.random() * 100000) + 5000,
      lastContact: randomDate(new Date(2024, 0, 1), new Date()),
      source: randomChoice(['website', 'referral', 'social', 'email', 'cold-call']),
      tags: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => 
        randomChoice(['enterprise', 'startup', 'small-business', 'government', 'non-profit', 'healthcare', 'education'])
      ),
      notes: 'Initial contact made. Strong interest in our enterprise solutions.',
      address: {
        street: `${Math.floor(Math.random() * 9999) + 1} ${randomChoice(['Main', 'Oak', 'Pine', 'Elm', 'Cedar'])} St`,
        city: randomChoice(['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia']),
        state: randomChoice(['NY', 'CA', 'IL', 'TX', 'AZ', 'PA']),
        zip: `${Math.floor(Math.random() * 90000) + 10000}`,
        country: 'USA'
      },
      createdAt: randomDate(new Date(2023, 0, 1), new Date()),
      updatedAt: randomDate(new Date(2024, 0, 1), new Date())
    };
  });
};

// Generate mock tasks
export const generateMockTasks = (count: number = 100): Task[] => {
  return Array.from({ length: count }, () => ({
    id: generateId(),
    title: randomChoice(taskTitles),
    description: 'Detailed description of the task requirements and expected outcomes.',
    status: randomChoice(['pending', 'in-progress', 'completed', 'cancelled']),
    priority: randomChoice(['low', 'medium', 'high', 'urgent']),
    assignee: `${randomChoice(firstNames)} ${randomChoice(lastNames)}`,
    customerId: Math.random() > 0.3 ? generateId() : undefined,
    projectId: Math.random() > 0.4 ? generateId() : undefined,
    dueDate: randomDate(new Date(), new Date(2024, 11, 31)),
    createdAt: randomDate(new Date(2024, 0, 1), new Date()),
    updatedAt: randomDate(new Date(2024, 6, 1), new Date()),
    tags: Array.from({ length: Math.floor(Math.random() * 2) + 1 }, () => 
      randomChoice(['urgent', 'client-facing', 'internal', 'research', 'development', 'marketing'])
    ),
    attachments: [],
    timeSpent: Math.floor(Math.random() * 480), // 0-8 hours
    estimatedTime: Math.floor(Math.random() * 480) + 60 // 1-8 hours
  }));
};

// Generate mock projects
export const generateMockProjects = (count: number = 25): Project[] => {
  return Array.from({ length: count }, () => {
    const budget = Math.floor(Math.random() * 500000) + 50000;
    const spent = Math.floor(budget * (Math.random() * 0.8));
    const progress = Math.floor(Math.random() * 100);
    
    return {
      id: generateId(),
      name: randomChoice(projectNames),
      description: 'Comprehensive project to deliver high-quality solutions that meet client requirements.',
      status: randomChoice(['planning', 'active', 'on-hold', 'completed', 'cancelled']),
      progress,
      budget,
      spent,
      startDate: randomDate(new Date(2024, 0, 1), new Date()),
      endDate: randomDate(new Date(), new Date(2024, 11, 31)),
      customerId: generateId(),
      teamMembers: Array.from({ length: Math.floor(Math.random() * 5) + 2 }, () => 
        `${randomChoice(firstNames)} ${randomChoice(lastNames)}`
      ),
      tasks: Array.from({ length: Math.floor(Math.random() * 10) + 3 }, () => generateId()),
      createdAt: randomDate(new Date(2024, 0, 1), new Date()),
      updatedAt: randomDate(new Date(2024, 6, 1), new Date())
    };
  });
};

// Generate mock revenue data
export const generateMockRevenue = (count: number = 200): Revenue[] => {
  return Array.from({ length: count }, () => ({
    id: generateId(),
    amount: Math.floor(Math.random() * 50000) + 1000,
    currency: 'USD',
    source: randomChoice(['subscription', 'one-time', 'recurring', 'commission']),
    customerId: generateId(),
    projectId: Math.random() > 0.5 ? generateId() : undefined,
    status: randomChoice(['pending', 'confirmed', 'failed']),
    date: randomDate(new Date(2024, 0, 1), new Date()),
    description: 'Payment for professional services rendered.'
  }));
};

// Generate mock pipeline stages and deals
export const generateMockPipeline = (): PipelineStage[] => {
  const stages = [
    { name: 'Lead', color: '#6B7280' },
    { name: 'Qualified', color: '#3B82F6' },
    { name: 'Proposal', color: '#F59E0B' },
    { name: 'Negotiation', color: '#EF4444' },
    { name: 'Closed Won', color: '#10B981' }
  ];

  return stages.map((stage, index) => ({
    id: generateId(),
    name: stage.name,
    order: index,
    color: stage.color,
    deals: Array.from({ length: Math.floor(Math.random() * 8) + 2 }, () => ({
      id: generateId(),
      title: `${randomChoice(companies)} - ${randomChoice(projectNames)}`,
      value: Math.floor(Math.random() * 100000) + 10000,
      customerId: generateId(),
      stageId: generateId(),
      probability: Math.floor(Math.random() * 100),
      expectedCloseDate: randomDate(new Date(), new Date(2024, 11, 31)),
      source: randomChoice(['website', 'referral', 'social', 'email', 'cold-call']),
      notes: 'Strong interest shown. Requires follow-up meeting.',
      createdAt: randomDate(new Date(2024, 0, 1), new Date()),
      updatedAt: randomDate(new Date(2024, 6, 1), new Date())
    }))
  }));
};

// Generate mock activity logs
export const generateMockActivityLogs = (count: number = 50): ActivityLog[] => {
  const activities = [
    { type: 'customer_created', title: 'New customer added', description: 'Customer profile created and initial contact established' },
    { type: 'task_completed', title: 'Task completed', description: 'Project milestone achieved on schedule' },
    { type: 'deal_moved', title: 'Deal progressed', description: 'Opportunity moved to next pipeline stage' },
    { type: 'project_updated', title: 'Project updated', description: 'Project timeline and deliverables revised' },
    { type: 'revenue_added', title: 'Revenue recorded', description: 'New payment received and processed' }
  ];

  return Array.from({ length: count }, () => {
    const activity = randomChoice(activities);
    return {
      id: generateId(),
      type: activity.type as any,
      title: activity.title,
      description: activity.description,
      userId: generateId(),
      entityId: generateId(),
      entityType: randomChoice(['customer', 'task', 'project', 'deal', 'revenue']),
      timestamp: randomDate(new Date(2024, 0, 1), new Date()),
      metadata: {}
    };
  });
};

// Generate dashboard metrics
export const generateDashboardMetrics = (): DashboardMetrics => ({
  totalCustomers: 1247,
  activeProjects: 23,
  completedTasks: 156,
  monthlyRevenue: 284750,
  conversionRate: 24.5,
  averageDealSize: 45200,
  customerSatisfaction: 4.8,
  teamProductivity: 87.3
});

// Chart data generators
export const generateRevenueChartData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  const relevantMonths = months.slice(0, currentMonth + 1);
  
  return {
    labels: relevantMonths,
    datasets: [{
      label: 'Revenue',
      data: relevantMonths.map(() => Math.floor(Math.random() * 100000) + 150000),
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderColor: '#3B82F6',
      borderWidth: 2,
      fill: true
    }]
  };
};

export const generateTaskStatusChartData = () => ({
  labels: ['Completed', 'In Progress', 'Pending', 'Cancelled'],
  datasets: [{
    label: 'Tasks',
    data: [156, 43, 28, 12],
    backgroundColor: ['#10B981', '#F59E0B', '#6B7280', '#EF4444']
  }]
});

export const generateCustomerSourceChartData = () => ({
  labels: ['Website', 'Referral', 'Social Media', 'Email Campaign', 'Cold Call'],
  datasets: [{
    label: 'Customers',
    data: [385, 298, 156, 203, 87],
    backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444']
  }]
});

export const generateProjectProgressData = () => {
  const projects = generateMockProjects(6);
  return {
    labels: projects.map(p => p.name),
    datasets: [{
      label: 'Progress %',
      data: projects.map(p => p.progress),
      backgroundColor: projects.map(p => p.progress >= 80 ? '#10B981' : p.progress >= 50 ? '#F59E0B' : '#EF4444')
    }]
  };
};
