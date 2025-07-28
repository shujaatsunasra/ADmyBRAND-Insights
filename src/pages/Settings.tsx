import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Input, Select } from '../components/UI';
import { Save, Bell, Shield, User, Palette, Globe, Download, Settings2 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Settings: React.FC = () => {
  const { state, toggleTheme, addNotification } = useApp();
  const [settings] = useState({
    profile: {
      firstName: 'Shujaat',
      lastName: 'S.',
      email: 'shujaatsunasara@admybrand.com',
      phone: '+91 93130-62508',
      company: 'ADmyBRAND',
      role: 'Administrator'
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      weeklyReports: true,
      marketingEmails: false
    },
    appearance: {
      theme: state.theme,
      language: 'en',
      timezone: 'UTC-8',
      dateFormat: 'MM/DD/YYYY'
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      passwordChange: false
    }
  });

  const handleSave = () => {
    addNotification({
      type: 'success',
      title: 'Settings Saved',
      message: 'Your preferences have been updated successfully.'
    });
  };

  const handleExportData = () => {
    addNotification({
      type: 'info',
      title: 'Export Started',
      message: 'Your data export is being prepared. You will receive an email when ready.'
    });
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Settings2 className="w-8 h-8 text-cream-accent-yellow" />
          <h1 className="text-3xl font-bold text-warm-900 dark:text-warm-100 font-['Plus_Jakarta_Sans']">
            Settings & Preferences
          </h1>
        </div>
        <p className="text-warm-600 dark:text-warm-400 font-medium">
          Manage your account preferences and application settings
        </p>
      </motion.div>

      {/* Enhanced Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 backdrop-blur-md hover:shadow-glow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-warm-900 dark:text-warm-100 font-['Plus_Jakarta_Sans']">Profile</h3>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-warm-700 dark:text-warm-300 mb-2">First Name</label>
                  <Input 
                    value={settings.profile.firstName} 
                    className="rounded-xl border-warm-200/30 focus:border-cream-accent-yellow/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-warm-700 dark:text-warm-300 mb-2">Last Name</label>
                  <Input 
                    value={settings.profile.lastName} 
                    className="rounded-xl border-warm-200/30 focus:border-cream-accent-yellow/50"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-warm-700 dark:text-warm-300 mb-2">Email</label>
                <Input 
                  value={settings.profile.email} 
                  className="rounded-xl border-warm-200/30 focus:border-cream-accent-yellow/50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-warm-700 dark:text-warm-300 mb-2">Phone</label>
                <Input 
                  value={settings.profile.phone} 
                  className="rounded-xl border-warm-200/30 focus:border-cream-accent-yellow/50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-warm-700 dark:text-warm-300 mb-2">Company</label>
                <Input 
                  value={settings.profile.company} 
                  className="rounded-xl border-warm-200/30 focus:border-cream-accent-yellow/50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-warm-700 dark:text-warm-300 mb-2">Role</label>
                <Select 
                  value={settings.profile.role}
                  className="rounded-xl border-warm-200/30 focus:border-cream-accent-yellow/50"
                >
                  <option value="Administrator">Administrator</option>
                  <option value="Manager">Manager</option>
                  <option value="Agent">Agent</option>
                </Select>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 backdrop-blur-md hover:shadow-glow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-cream-accent-yellow/20 to-orange-500/20 rounded-xl">
                <Bell className="w-5 h-5 text-cream-accent-yellow" />
              </div>
              <h3 className="text-xl font-bold text-warm-900 dark:text-warm-100 font-['Plus_Jakarta_Sans']">Notifications</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-warm-50 dark:bg-warm-800/30">
                <span className="text-sm font-medium text-warm-700 dark:text-warm-300">Email Notifications</span>
                <input 
                  type="checkbox" 
                  checked={settings.notifications.emailNotifications}
                  className="rounded focus:ring-cream-accent-yellow/50 w-5 h-5"
                />
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-warm-50 dark:bg-warm-800/30">
                <span className="text-sm font-medium text-warm-700 dark:text-warm-300">Push Notifications</span>
                <input 
                  type="checkbox" 
                  checked={settings.notifications.pushNotifications}
                  className="rounded focus:ring-cream-accent-yellow/50 w-5 h-5"
                />
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-warm-50 dark:bg-warm-800/30">
                <span className="text-sm font-medium text-warm-700 dark:text-warm-300">Weekly Reports</span>
                <input 
                  type="checkbox" 
                  checked={settings.notifications.weeklyReports}
                  className="rounded focus:ring-cream-accent-yellow/50 w-5 h-5"
                />
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-warm-50 dark:bg-warm-800/30">
                <span className="text-sm font-medium text-warm-700 dark:text-warm-300">Marketing Emails</span>
                <input 
                  type="checkbox" 
                  checked={settings.notifications.marketingEmails}
                  className="rounded focus:ring-cream-accent-yellow/50 w-5 h-5"
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Security Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 backdrop-blur-md hover:shadow-glow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-xl">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-warm-900 dark:text-warm-100 font-['Plus_Jakarta_Sans']">Security</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-warm-50 dark:bg-warm-800/30">
                <span className="text-sm font-medium text-warm-700 dark:text-warm-300">Two-Factor Authentication</span>
                <input 
                  type="checkbox" 
                  checked={settings.security.twoFactorAuth}
                  className="rounded focus:ring-cream-accent-yellow/50 w-5 h-5"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-warm-700 dark:text-warm-300 mb-2">Session Timeout</label>
                <Select 
                  value={settings.security.sessionTimeout}
                  className="rounded-xl border-warm-200/30 focus:border-cream-accent-yellow/50"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                </Select>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="secondary" 
                  className="w-full rounded-xl font-medium"
                >
                  Change Password
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Appearance Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 backdrop-blur-md hover:shadow-glow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-xl">
                <Palette className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-warm-900 dark:text-warm-100 font-['Plus_Jakarta_Sans']">Appearance</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-warm-700 dark:text-warm-300 mb-2">Theme</label>
                <div className="flex gap-2">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      variant={state.theme === 'light' ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => state.theme === 'dark' && toggleTheme()}
                      className="rounded-xl font-medium"
                    >
                      Light
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      variant={state.theme === 'dark' ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => state.theme === 'light' && toggleTheme()}
                      className="rounded-xl font-medium"
                    >
                      Dark
                    </Button>
                  </motion.div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-warm-700 dark:text-warm-300 mb-2">Language</label>
                <Select 
                  value={settings.appearance.language}
                  className="rounded-xl border-warm-200/30 focus:border-cream-accent-yellow/50"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-warm-700 dark:text-warm-300 mb-2">Timezone</label>
                <Select 
                  value={settings.appearance.timezone}
                  className="rounded-xl border-warm-200/30 focus:border-cream-accent-yellow/50"
                >
                  <option value="UTC-8">Pacific Time (UTC-8)</option>
                  <option value="UTC-5">Eastern Time (UTC-5)</option>
                  <option value="UTC+0">GMT (UTC+0)</option>
                  <option value="UTC+1">Central European Time (UTC+1)</option>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-warm-700 dark:text-warm-300 mb-2">Date Format</label>
                <Select 
                  value={settings.appearance.dateFormat}
                  className="rounded-xl border-warm-200/30 focus:border-cream-accent-yellow/50"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </Select>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6 backdrop-blur-md hover:shadow-glow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl">
                <Globe className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-warm-900 dark:text-warm-100 font-['Plus_Jakarta_Sans']">Preferences</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-warm-700 dark:text-warm-300 mb-2">Default Dashboard</label>
                <Select className="rounded-xl border-warm-200/30 focus:border-cream-accent-yellow/50">
                  <option value="overview">Overview</option>
                  <option value="sales">Sales Dashboard</option>
                  <option value="analytics">Analytics</option>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-warm-700 dark:text-warm-300 mb-2">Items per Page</label>
                <Select className="rounded-xl border-warm-200/30 focus:border-cream-accent-yellow/50">
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-warm-700 dark:text-warm-300 mb-2">Export Format</label>
                <Select className="rounded-xl border-warm-200/30 focus:border-cream-accent-yellow/50">
                  <option value="csv">CSV</option>
                  <option value="xlsx">Excel</option>
                  <option value="pdf">PDF</option>
                </Select>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Data Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-6 backdrop-blur-md hover:shadow-glow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl">
                <Download className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-warm-900 dark:text-warm-100 font-['Plus_Jakarta_Sans']">Data Management</h3>
            </div>
            
            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="secondary" 
                  className="w-full rounded-xl font-medium" 
                  onClick={handleExportData}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export All Data
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="error" 
                  className="w-full rounded-xl font-medium"
                >
                  Delete Account
                </Button>
              </motion.div>
              
              <p className="text-xs text-warm-500 dark:text-warm-400 bg-warm-50 dark:bg-warm-800/30 p-3 rounded-xl">
                ⚠️ Deleting your account will permanently remove all your data. This action cannot be undone.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Enhanced Save Button */}
      <motion.div 
        className="flex justify-end"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            variant="primary" 
            onClick={handleSave}
            className="min-h-[48px] px-8 font-semibold text-center whitespace-nowrap shadow-glow rounded-xl"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Settings;
