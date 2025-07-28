import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Badge } from '../components/UI';
import { BarChart } from '../components/Charts';
import { Plus, Users, Calendar, DollarSign, TrendingUp, Activity } from 'lucide-react';
import { generateMockProjects, generateProjectProgressData } from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils/helpers';

const Projects: React.FC = () => {
  const [projects] = useState(generateMockProjects(12));
  const progressData = generateProjectProgressData();

  // Project stats
  const projectStats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    completed: projects.filter(p => p.status === 'completed').length,
    onHold: projects.filter(p => p.status === 'on-hold').length,
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Enhanced Header */}
      <motion.div 
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-warm-900 dark:text-warm-100 font-['Plus_Jakarta_Sans']">
            Project Management
          </h1>
          <p className="text-warm-600 dark:text-warm-400 mt-1 font-medium">
            Track and manage your projects efficiently
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            variant="primary" 
            size="md"
            className="min-h-[48px] px-6 font-semibold text-center whitespace-nowrap shadow-glow"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4 hover:shadow-glow-lg transition-all duration-300" hover={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-warm-600 dark:text-warm-400">Total Projects</p>
                <p className="text-2xl font-bold text-warm-900 dark:text-warm-100">{projectStats.total}</p>
              </div>
              <div className="p-2 bg-gradient-to-r from-cream-accent-yellow/20 to-orange-500/20 rounded-xl">
                <Activity className="w-5 h-5 text-cream-accent-yellow" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4 hover:shadow-glow-lg transition-all duration-300" hover={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-warm-600 dark:text-warm-400">Active</p>
                <p className="text-2xl font-bold text-blue-600">{projectStats.active}</p>
              </div>
              <div className="p-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-4 hover:shadow-glow-lg transition-all duration-300" hover={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-warm-600 dark:text-warm-400">Completed</p>
                <p className="text-2xl font-bold text-emerald-600">{projectStats.completed}</p>
              </div>
              <div className="p-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl">
                <Users className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-4 hover:shadow-glow-lg transition-all duration-300" hover={true}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-warm-600 dark:text-warm-400">On Hold</p>
                <p className="text-2xl font-bold text-amber-600">{projectStats.onHold}</p>
              </div>
              <div className="p-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl">
                <Calendar className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="p-6 backdrop-blur-md">
          <h3 className="text-xl font-bold text-warm-900 dark:text-warm-100 mb-4 font-['Plus_Jakarta_Sans']">
            Project Progress Overview
          </h3>
          <BarChart data={progressData} height={250} />
        </Card>
      </motion.div>

      {/* Enhanced Project Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + (index * 0.1) }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="transition-all duration-300"
          >
            <Card className="p-6 hover:shadow-glow-lg transition-all duration-300 backdrop-blur-md h-full">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-warm-900 dark:text-warm-100 font-['Plus_Jakarta_Sans'] line-clamp-2">
                  {project.name}
                </h3>
                <Badge 
                  variant={
                    project.status === 'completed' ? 'success' :
                    project.status === 'active' ? 'primary' :
                    project.status === 'on-hold' ? 'warning' : 'gray'
                  }
                  className="font-medium ml-2 flex-shrink-0"
                >
                  {project.status}
                </Badge>
              </div>
              
              <p className="text-warm-600 dark:text-warm-400 text-sm mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-warm-500 dark:text-warm-400 font-medium">Progress</span>
                  <span className="font-bold text-warm-900 dark:text-warm-100">{project.progress}%</span>
                </div>
                <div className="w-full bg-warm-200 dark:bg-warm-700 rounded-full h-3 overflow-hidden">
                  <motion.div 
                    className="bg-gradient-to-r from-cream-accent-yellow to-orange-500 h-3 rounded-full transition-all duration-500 shadow-glow"
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ delay: 1 + (index * 0.1), duration: 1 }}
                  />
                </div>

                <div className="flex items-center justify-between text-sm text-warm-500 dark:text-warm-400 pt-2 border-t border-warm-200/30">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-semibold">{formatCurrency(project.budget)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">{project.teamMembers.length}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">{formatDate(project.endDate, 'short')}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Projects;
