import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Input, Select, Badge, Table } from '../components/UI';
import { Search, Filter, Plus, Download, Calendar, User, Clock, CheckSquare } from 'lucide-react';
import { generateMockTasks } from '../utils/mockData';
import { formatDate } from '../utils/helpers';

const Tasks: React.FC = () => {
  const [tasks] = useState(generateMockTasks(50));
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Task stats for header cards
  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    pending: tasks.filter(t => t.status === 'pending').length,
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header with modern styling */}
      <motion.div 
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-['Plus_Jakarta_Sans']">
            Task Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 font-medium">
            Track and manage your tasks efficiently
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Button 
              variant="secondary" 
              size="md"
              className="button-secondary h-12 px-6 font-semibold"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Button 
              variant="primary" 
              size="md"
              className="button-primary h-12 px-6 font-semibold"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Cards - Modern Crextio Design */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Card className="p-6 bg-white rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300" hover={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{taskStats.total}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-primary-100 to-primary-200 rounded-xl">
                <CheckSquare className="w-5 h-5 text-primary-600" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Card className="p-6 bg-white rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300" hover={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{taskStats.completed}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-100 to-green-200 rounded-xl">
                <CheckSquare className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <Card className="p-6 bg-white rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300" hover={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{taskStats.inProgress}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Card className="p-6 bg-white rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300" hover={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{taskStats.pending}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl">
                <Calendar className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Enhanced Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-6 backdrop-blur-md">
          <div className="flex flex-col lg:flex-row gap-5 items-center">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-none">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-warm-400" />
                <Input 
                  placeholder="Search tasks..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="pl-10 rounded-xl border-warm-200/30 focus:border-cream-accent-yellow/50 h-12"
                />
              </div>
              <Select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-12 rounded-xl"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </Select>
              <Select 
                value={priorityFilter} 
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="h-12 rounded-xl"
              >
                <option value="all">All Priority</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Select>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="secondary"
                  size="md"
                  className="button-secondary h-12 px-5 font-medium"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </motion.div>
              <div className="text-sm text-warm-500 dark:text-warm-400 font-medium px-2">
                {filteredTasks.length} of {tasks.length} tasks
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Enhanced Task Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="overflow-hidden backdrop-blur-md">
          <Table>
            <thead>
              <tr>
                <th className="font-semibold text-warm-700 dark:text-warm-300">Task</th>
                <th className="font-semibold text-warm-700 dark:text-warm-300">Assignee</th>
                <th className="font-semibold text-warm-700 dark:text-warm-300">Priority</th>
                <th className="font-semibold text-warm-700 dark:text-warm-300">Status</th>
                <th className="font-semibold text-warm-700 dark:text-warm-300">Due Date</th>
                <th className="font-semibold text-warm-700 dark:text-warm-300">Progress</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.slice(0, 20).map((task, index) => (
                <motion.tr 
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + (index * 0.05) }}
                  className="hover:bg-warm-50/50 dark:hover:bg-warm-800/30 transition-colors duration-200"
                >
                  <td>
                    <div>
                      <p className="font-medium text-warm-900 dark:text-warm-100">{task.title}</p>
                      <p className="text-sm text-warm-500 dark:text-warm-400 truncate max-w-xs">{task.description}</p>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-warm-400" />
                      <span className="font-medium text-warm-700 dark:text-warm-300">{task.assignee}</span>
                    </div>
                  </td>
                  <td>
                    <Badge 
                      variant={task.priority === 'urgent' ? 'error' : task.priority === 'high' ? 'warning' : 'primary'}
                      className="font-medium"
                    >
                      {task.priority}
                    </Badge>
                  </td>
                  <td>
                    <Badge 
                      variant={task.status === 'completed' ? 'success' : task.status === 'in-progress' ? 'primary' : 'gray'}
                      className="font-medium"
                    >
                      {task.status}
                    </Badge>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-warm-400" />
                      <span className="text-sm font-medium text-warm-700 dark:text-warm-300">{formatDate(task.dueDate)}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-warm-400" />
                      <span className="text-sm font-medium text-warm-700 dark:text-warm-300">{Math.floor(task.timeSpent / 60)}h {task.timeSpent % 60}m</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Tasks;
