import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Badge } from '../components/UI';
import { Plus, MoreVertical, DollarSign, Calendar, TrendingUp, Target, BarChart3 } from 'lucide-react';
import { generateMockPipeline } from '../utils/mockData';
import { formatCurrency, formatDate } from '../utils/helpers';

const Pipeline: React.FC = () => {
  const [pipeline] = useState(generateMockPipeline());

  const totalValue = pipeline.reduce((sum, stage) => 
    sum + stage.deals.reduce((stageSum, deal) => stageSum + deal.value, 0), 0
  );

  const totalDeals = pipeline.reduce((sum, stage) => sum + stage.deals.length, 0);

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
            Sales Pipeline
          </h1>
          <div className="flex items-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-cream-accent-yellow" />
              <p className="text-warm-600 dark:text-warm-400 font-semibold">
                Total Pipeline: {formatCurrency(totalValue)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <p className="text-warm-600 dark:text-warm-400 font-semibold">
                {totalDeals} Active Deals
              </p>
            </div>
          </div>
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
            New Deal
          </Button>
        </motion.div>
      </motion.div>

      {/* Enhanced Pipeline Columns */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-5 gap-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {pipeline.map((stage, stageIndex) => {
          const stageValue = stage.deals.reduce((sum, deal) => sum + deal.value, 0);
          
          return (
            <motion.div 
              key={stage.id} 
              className="space-y-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + (stageIndex * 0.1) }}
            >
              {/* Stage Header */}
              <Card className="p-4 bg-gradient-to-r from-cream-accent-yellow/10 to-orange-500/10 border border-cream-accent-yellow/20">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-warm-900 dark:text-warm-100">{stage.name}</h3>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-warm-700 dark:text-warm-300">{stage.deals.length} deals</p>
                    <p className="text-xs text-warm-500 font-medium">{formatCurrency(stageValue)}</p>
                  </div>
                </div>
              </Card>
              
              {/* Deals */}
              <div className="space-y-3">
                {stage.deals.map((deal, dealIndex) => (
                  <motion.div
                    key={deal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (stageIndex * 0.1) + (dealIndex * 0.05) }}
                  >
                    <Card className="p-4 hover:shadow-glow-lg transition-all duration-300 backdrop-blur-md hover:scale-[1.02]">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-sm text-warm-900 dark:text-warm-100 line-clamp-2">{deal.title}</h4>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
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
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-3 h-3 text-emerald-500" />
                            <span className="text-sm font-bold text-warm-900 dark:text-warm-100">
                              {formatCurrency(deal.value)}
                            </span>
                          </div>
                          <Badge variant="primary" className="text-xs font-medium">
                            {deal.probability}%
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-warm-400" />
                          <span className="text-xs text-warm-500 font-medium">
                            {formatDate(deal.expectedCloseDate, 'short')}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-3 h-3 text-warm-400" />
                          <span className="text-xs text-warm-500 font-medium">{deal.source}</span>
                        </div>
                      </div>
                      
                      {deal.notes && (
                        <p className="text-xs text-warm-600 dark:text-warm-400 mt-3 line-clamp-2 bg-warm-50 dark:bg-warm-800/30 p-2 rounded-lg">
                          {deal.notes}
                        </p>
                      )}
                    </Card>
                  </motion.div>
                ))}
                
                {/* Add Deal Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    variant="ghost" 
                    className="w-full py-3 border-2 border-dashed border-warm-300 dark:border-warm-600 hover:border-cream-accent-yellow hover:bg-cream-accent-yellow/5 transition-all duration-300 rounded-xl font-medium"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Deal
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default Pipeline;
