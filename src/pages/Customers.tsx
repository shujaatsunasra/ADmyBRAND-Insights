import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Input, Select, Badge, Table } from '../components/UI';
import { Search, Filter, Plus, Download, MoreVertical, Mail, Phone, Building, Users, UserCheck, UserX, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { generateMockCustomers } from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils/helpers';

const Customers: React.FC = () => {
  const [customers] = useState(generateMockCustomers(50));
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  // Stats calculation
  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    inactive: customers.filter(c => c.status === 'inactive').length,
    pending: customers.filter(c => c.status === 'pending').length,
  };

  return (
    <motion.div 
      className="space-y-8 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Premium Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <Card className="p-8 group cursor-pointer" hover={true} gradient={true}>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-warm-600 dark:text-warm-400 uppercase tracking-wide">Total Customers</p>
                <p className="text-4xl font-bold text-warm-900 dark:text-warm-100 font-['Plus_Jakarta_Sans']">{stats.total}</p>
                <div className="flex items-center space-x-1 text-emerald-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+12.5%</span>
                </div>
              </div>
              <div className="relative">
                <div className="p-4 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-amber-600" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-orange-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="p-8 group cursor-pointer" hover={true}>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-warm-600 dark:text-warm-400 uppercase tracking-wide">Active</p>
                <p className="text-4xl font-bold text-emerald-600 font-['Plus_Jakarta_Sans']">{stats.active}</p>
                <div className="flex items-center space-x-1 text-emerald-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+8.2%</span>
                </div>
              </div>
              <div className="relative">
                <div className="p-4 bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <UserCheck className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-green-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="p-8 group cursor-pointer" hover={true}>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-warm-600 dark:text-warm-400 uppercase tracking-wide">Inactive</p>
                <p className="text-4xl font-bold text-red-600 font-['Plus_Jakarta_Sans']">{stats.inactive}</p>
                <div className="flex items-center space-x-1 text-red-600">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-sm font-medium">-3.1%</span>
                </div>
              </div>
              <div className="relative">
                <div className="p-4 bg-gradient-to-br from-red-400/20 to-red-500/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <UserX className="w-8 h-8 text-red-600" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-red-400/10 to-red-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="p-8 group cursor-pointer" hover={true}>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-warm-600 dark:text-warm-400 uppercase tracking-wide">Pending</p>
                <p className="text-4xl font-bold text-amber-600 font-['Plus_Jakarta_Sans']">{stats.pending}</p>
                <div className="flex items-center space-x-1 text-amber-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Review</span>
                </div>
              </div>
              <div className="relative">
                <div className="p-4 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-8 h-8 text-amber-600" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-orange-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Premium Header */}
      <motion.div 
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="space-y-3">
          <motion.h1 
            className="text-4xl font-bold text-warm-900 dark:text-warm-100 font-['Plus_Jakarta_Sans']"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            Customer Management
          </motion.h1>
          <motion.p 
            className="text-lg text-warm-600 dark:text-warm-400 font-medium max-w-2xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            Manage and track your customer relationships with powerful insights and analytics
          </motion.p>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button 
              variant="secondary" 
              size="md"
              className="min-h-[52px] px-8 font-semibold text-center whitespace-nowrap backdrop-blur-xl"
            >
              <Download className="w-5 h-5 mr-3" />
              Export Data
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Button 
              variant="primary" 
              size="md"
              className="min-h-[52px] px-8 font-semibold text-center whitespace-nowrap shadow-glow"
            >
              <Plus className="w-5 h-5 mr-3" />
              Add Customer
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Premium Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        <Card className="p-8 backdrop-blur-xl shadow-soft-lg">
          <div className="flex flex-col xl:flex-row gap-6 items-start xl:items-center">
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-none">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warm-400 group-focus-within:text-amber-500 transition-colors" />
                <Input
                  placeholder="Search customers, companies, or emails..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-base rounded-2xl border-warm-200/40 focus:border-amber-400/60 focus:ring-amber-400/30"
                />
              </div>
              <Select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-14 text-base rounded-2xl"
              >
                <option value="all">All Status</option>
                <option value="active">Active Customers</option>
                <option value="inactive">Inactive Customers</option>
                <option value="pending">Pending Approval</option>
              </Select>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0 flex-wrap">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button 
                  variant="secondary"
                  size="md"
                  className="min-h-[52px] px-6 font-semibold text-center whitespace-nowrap backdrop-blur-xl"
                >
                  <Filter className="w-5 h-5 mr-2" />
                  Advanced Filters
                </Button>
              </motion.div>
              <div className="bg-amber-50/80 dark:bg-amber-900/20 backdrop-blur-sm rounded-2xl px-4 py-3 border border-amber-200/40">
                <div className="text-sm text-amber-700 dark:text-amber-300 font-semibold">
                  {filteredCustomers.length} of {customers.length} customers
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Premium Customer Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <Card className="overflow-hidden backdrop-blur-xl shadow-soft-xl">
          <Table>
            <thead>
              <tr>
                <th className="font-bold text-warm-700 dark:text-warm-200 text-sm uppercase tracking-wider">Customer</th>
                <th className="font-bold text-warm-700 dark:text-warm-200 text-sm uppercase tracking-wider">Company</th>
                <th className="font-bold text-warm-700 dark:text-warm-200 text-sm uppercase tracking-wider">Contact Info</th>
                <th className="font-bold text-warm-700 dark:text-warm-200 text-sm uppercase tracking-wider">Value</th>
                <th className="font-bold text-warm-700 dark:text-warm-200 text-sm uppercase tracking-wider">Status</th>
                <th className="font-bold text-warm-700 dark:text-warm-200 text-sm uppercase tracking-wider">Last Contact</th>
                <th className="font-bold text-warm-700 dark:text-warm-200 text-sm uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCustomers.map((customer, index) => (
                <motion.tr 
                  key={customer.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + (index * 0.05), duration: 0.4 }}
                  className="hover:bg-amber-50/30 dark:hover:bg-amber-900/10 transition-all duration-300 group"
                >
                  <td>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300">
                          <span className="text-white font-bold text-base">
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="absolute -inset-1 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-2xl blur-md group-hover:blur-lg transition-all duration-300" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-warm-900 dark:text-warm-100 text-base group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                          {customer.name}
                        </p>
                        <p className="text-sm text-warm-500 dark:text-warm-400 font-medium">
                          {customer.source}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-warm-100/60 dark:bg-warm-700/40 rounded-xl">
                        <Building className="w-4 h-4 text-warm-500" />
                      </div>
                      <span className="font-semibold text-warm-700 dark:text-warm-300">{customer.company}</span>
                    </div>
                  </td>
                  <td>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <div className="p-1.5 bg-blue-100/60 dark:bg-blue-800/40 rounded-lg">
                          <Mail className="w-3.5 h-3.5 text-blue-500" />
                        </div>
                        <span className="text-sm text-warm-600 dark:text-warm-400 truncate max-w-[200px] font-medium">
                          {customer.email}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="p-1.5 bg-green-100/60 dark:bg-green-800/40 rounded-lg">
                          <Phone className="w-3.5 h-3.5 text-green-500" />
                        </div>
                        <span className="text-sm text-warm-600 dark:text-warm-400 font-medium">
                          {customer.phone}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="text-center">
                      <span className="font-bold text-xl text-warm-900 dark:text-warm-100">
                        {formatCurrency(customer.value)}
                      </span>
                    </div>
                  </td>
                  <td>
                    <Badge
                      variant={
                        customer.status === 'active' ? 'success' :
                        customer.status === 'pending' ? 'warning' : 'gray'
                      }
                      className="font-semibold px-4 py-2"
                    >
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </Badge>
                  </td>
                  <td>
                    <div className="text-center">
                      <span className="text-sm font-semibold text-warm-600 dark:text-warm-400">
                        {formatDate(customer.lastContact)}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="p-2 rounded-xl hover:bg-warm-100/60 dark:hover:bg-warm-700/40"
                        >
                          <MoreVertical className="w-4 h-4 text-warm-600 dark:text-warm-400" />
                        </Button>
                      </motion.div>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </motion.div>

      {/* Premium Pagination */}
      <motion.div 
        className="flex flex-col sm:flex-row items-center justify-between gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
      >
        <Card className="p-4 flex-shrink-0">
          <p className="text-sm text-warm-700 dark:text-warm-300 font-semibold">
            Showing <span className="text-amber-600 font-bold">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
            <span className="text-amber-600 font-bold">{Math.min(currentPage * itemsPerPage, filteredCustomers.length)}</span> of{' '}
            <span className="text-amber-600 font-bold">{filteredCustomers.length}</span> customers
          </p>
        </Card>
        
        <Card className="p-2">
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="secondary"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="min-h-[44px] px-6 font-semibold"
              >
                Previous
              </Button>
            </motion.div>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                let page;
                if (totalPages <= 7) {
                  page = i + 1;
                } else if (currentPage <= 4) {
                  page = i + 1;
                } else if (currentPage >= totalPages - 3) {
                  page = totalPages - 6 + i;
                } else {
                  page = currentPage - 3 + i;
                }
                
                return (
                  <motion.div
                    key={page}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant={currentPage === page ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={`min-h-[44px] min-w-[44px] font-bold ${
                        currentPage === page ? 'shadow-glow' : ''
                      }`}
                    >
                      {page}
                    </Button>
                  </motion.div>
                );
              })}
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="secondary"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="min-h-[44px] px-6 font-semibold"
              >
                Next
              </Button>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Customers;
