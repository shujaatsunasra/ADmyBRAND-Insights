import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  gradient?: boolean;
  glow?: boolean;
  delay?: number;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false, 
  onClick,
  gradient = false,
  glow = false,
  delay = 0
}) => {
  const getCardClasses = () => {
    let classes = 'bg-white/80 dark:bg-warm-800/40 backdrop-blur-xl border border-warm-200/20 dark:border-warm-700/30 rounded-2xl relative overflow-hidden transition-all duration-500 shadow-soft';
    
    if (gradient) {
      classes += ' bg-gradient-to-br from-cream-50/90 via-white/80 to-amber-50/60 dark:from-warm-800/60 dark:via-warm-700/40 dark:to-amber-900/20';
    }
    
    if (glow) {
      classes += ' shadow-glow ring-1 ring-amber-500/10';
    }
    
    if (onClick) {
      classes += ' cursor-pointer hover:bg-white/90 dark:hover:bg-warm-800/60 hover:shadow-soft-lg hover:scale-[1.02]';
    }
    
    if (hover) {
      classes += ' hover:shadow-soft-xl hover:border-amber-300/30 hover:-translate-y-1 hover:scale-[1.02]';
    }
    
    return classes;
  };

  return (
    <motion.div 
      className={`${getCardClasses()} ${className}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay,
        type: "spring",
        stiffness: 120,
        damping: 20
      }}
      whileHover={hover ? { 
        y: -6, 
        scale: 1.02,
        transition: { duration: 0.3, type: "spring", stiffness: 300 }
      } : undefined}
      whileTap={onClick ? { 
        scale: 0.98,
        transition: { duration: 0.1 }
      } : undefined}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50" />
      {children}
    </motion.div>
  );
};

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  icon?: React.ReactNode;
  gradient?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  icon
}) => {
  const getVariantClasses = () => {
    const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden shadow-soft border-0';
    
    switch (variant) {
      case 'primary':
        return `${baseClasses} bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-white shadow-glow hover:shadow-glow-lg hover:from-amber-500 hover:to-orange-600 focus:ring-amber-500/50`;
      case 'secondary':
        return `${baseClasses} bg-white/80 dark:bg-warm-800/60 text-warm-700 dark:text-warm-200 border border-warm-200/40 dark:border-warm-600/40 backdrop-blur-xl hover:bg-white/90 dark:hover:bg-warm-700/70 hover:border-amber-300/40 focus:ring-amber-400/30`;
      case 'success':
        return `${baseClasses} bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 focus:ring-emerald-500/50`;
      case 'warning':
        return `${baseClasses} bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 focus:ring-amber-500/50`;
      case 'error':
        return `${baseClasses} bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500/50`;
      case 'ghost':
        return `${baseClasses} text-warm-700 dark:text-warm-300 hover:bg-warm-100/50 dark:hover:bg-warm-700/30 focus:ring-amber-400/30`;
      default:
        return `${baseClasses} bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-glow`;
    }
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs h-9 min-w-[80px]',
    md: 'px-6 py-3 text-sm h-11 min-w-[100px]',
    lg: 'px-8 py-4 text-base h-12 min-w-[120px]'
  };

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${getVariantClasses()} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      whileHover={!disabled ? { 
        scale: 1.03,
        y: -2,
        transition: { duration: 0.2, type: "spring", stiffness: 400 }
      } : undefined}
      whileTap={!disabled ? { 
        scale: 0.97,
        transition: { duration: 0.1 }
      } : undefined}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      {loading && (
        <motion.div
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}
      {icon && !loading && (
        <motion.span 
          className="mr-2 relative z-10"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {icon}
        </motion.span>
      )}
      <motion.span
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'gray';
  className?: string;
  pulse?: boolean;
  glow?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'gray', 
  className = '',
  pulse = false,
  glow = false
}) => {
  const getVariantClasses = () => {
    const baseClasses = 'inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 backdrop-blur-sm';
    
    switch (variant) {
      case 'primary':
        return `${baseClasses} bg-gradient-to-r from-amber-100/80 to-orange-100/80 text-amber-700 border border-amber-200/50 dark:from-amber-900/40 dark:to-orange-900/40 dark:text-amber-300 dark:border-amber-700/50`;
      case 'success':
        return `${baseClasses} bg-gradient-to-r from-emerald-100/80 to-green-100/80 text-emerald-700 border border-emerald-200/50 dark:from-emerald-900/40 dark:to-green-900/40 dark:text-emerald-300 dark:border-emerald-700/50`;
      case 'warning':
        return `${baseClasses} bg-gradient-to-r from-amber-100/80 to-yellow-100/80 text-amber-700 border border-amber-200/50 dark:from-amber-900/40 dark:to-yellow-900/40 dark:text-amber-300 dark:border-amber-700/50`;
      case 'error':
        return `${baseClasses} bg-gradient-to-r from-red-100/80 to-rose-100/80 text-red-700 border border-red-200/50 dark:from-red-900/40 dark:to-rose-900/40 dark:text-red-300 dark:border-red-700/50`;
      case 'gray':
        return `${baseClasses} bg-gradient-to-r from-warm-100/80 to-gray-100/80 text-warm-700 border border-warm-200/50 dark:from-warm-800/40 dark:to-gray-800/40 dark:text-warm-300 dark:border-warm-600/50`;
      default:
        return `${baseClasses} bg-gradient-to-r from-warm-100/80 to-gray-100/80 text-warm-700 border border-warm-200/50`;
    }
  };

  return (
    <motion.span
      className={`${getVariantClasses()} ${pulse ? 'animate-pulse-soft' : ''} ${glow ? 'shadow-glow' : ''} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
    >
      {children}
    </motion.span>
  );
};

interface InputProps {
  type?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  id?: string;
  name?: string;
  label?: string;
  icon?: React.ReactNode;
  floating?: boolean;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  error = false,
  className = '',
  id,
  name,
  label,
  icon,
  floating = false
}) => {
  const [focused, setFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(!!value);
  
  React.useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  const getInputClasses = () => {
    let classes = 'w-full px-4 py-3 rounded-2xl bg-white/80 dark:bg-warm-800/60 backdrop-blur-xl border transition-all duration-300 focus:outline-none focus:ring-2 text-warm-800 dark:text-warm-200 font-medium';
    
    if (error) {
      classes += ' border-red-400/60 focus:border-red-500 focus:ring-red-500/30';
    } else {
      classes += ' border-warm-200/40 dark:border-warm-600/40 focus:border-amber-400/60 focus:ring-amber-400/30';
    }
    
    if (disabled) {
      classes += ' opacity-50 cursor-not-allowed';
    } else {
      classes += ' hover:border-amber-300/50 hover:bg-white/90 dark:hover:bg-warm-700/70';
    }
    
    return classes;
  };

  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {icon && (
        <motion.div 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-400"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {icon}
        </motion.div>
      )}
      
      <motion.input
        type={type}
        value={value}
        onChange={(e) => {
          onChange?.(e);
          setHasValue(!!e.target.value);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={floating ? '' : placeholder}
        disabled={disabled}
        className={`${getInputClasses()} ${icon ? 'pl-10' : ''} ${floating ? 'placeholder-transparent' : ''}`}
        id={id}
        name={name}
        whileFocus={{ 
          scale: 1.01,
          transition: { duration: 0.2 }
        }}
      />
      
      {floating && (label || placeholder) && (
        <motion.label
          htmlFor={id}
          className={`absolute transition-all duration-200 pointer-events-none ${
            icon ? 'left-10' : 'left-3'
          } ${
            focused || hasValue
              ? 'top-2 text-xs text-cream-accent-yellow'
              : 'top-1/2 transform -translate-y-1/2 text-sm text-warm-500'
          }`}
          animate={{
            y: focused || hasValue ? -8 : 0,
            scale: focused || hasValue ? 0.85 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {label || placeholder}
        </motion.label>
      )}
      
      {!floating && label && (
        <motion.label
          htmlFor={id}
          className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {label}
        </motion.label>
      )}
    </motion.div>
  );
};

interface SelectProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  id?: string;
  name?: string;
  label?: string;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  children,
  disabled = false,
  error = false,
  className = '',
  id,
  name,
  label
}) => {
  const getSelectClasses = () => {
    let classes = 'w-full px-4 py-3 rounded-2xl bg-white/80 dark:bg-warm-800/60 backdrop-blur-xl border transition-all duration-300 focus:outline-none focus:ring-2 text-warm-800 dark:text-warm-200 font-medium appearance-none cursor-pointer';
    
    if (error) {
      classes += ' border-red-400/60 focus:border-red-500 focus:ring-red-500/30';
    } else {
      classes += ' border-warm-200/40 dark:border-warm-600/40 focus:border-amber-400/60 focus:ring-amber-400/30';
    }
    
    if (disabled) {
      classes += ' opacity-50 cursor-not-allowed';
    } else {
      classes += ' hover:border-amber-300/50 hover:bg-white/90 dark:hover:bg-warm-700/70';
    }
    
    return classes;
  };

  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <motion.label
          htmlFor={id}
          className="block text-sm font-semibold text-warm-700 dark:text-warm-300 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {label}
        </motion.label>
      )}
      
      <div className="relative">
        <motion.select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={getSelectClasses()}
          id={id}
          name={name}
          whileFocus={{ 
            scale: 1.01,
            transition: { duration: 0.2 }
          }}
        >
          {children}
        </motion.select>
        
        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

interface TableProps {
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
}

export const Table: React.FC<TableProps> = ({ 
  children, 
  className = '',
  compact = false
}) => {
  return (
    <motion.div 
      className="overflow-hidden rounded-2xl shadow-soft"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="overflow-x-auto">
        <motion.table 
          className={`w-full bg-white/80 dark:bg-warm-800/60 backdrop-blur-xl ${compact ? 'text-xs' : 'text-sm'} ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {children}
        </motion.table>
      </div>
    </motion.div>
  );
};

interface SkeletonProps {
  className?: string;
  lines?: number;
  animated?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  lines = 1,
  animated = true
}) => {
  return (
    <motion.div 
      className="space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div 
          key={i} 
          className={`skeleton h-4 ${animated ? 'shimmer' : ''} ${className}`}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ 
            delay: i * 0.1,
            duration: 0.4,
            type: "spring",
            stiffness: 100
          }}
        />
      ))}
    </motion.div>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'md'
}) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl'
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          className={`glass-surface rounded-2xl shadow-soft-xl w-full ${maxWidthClasses[maxWidth]} overflow-hidden`}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ 
            duration: 0.3,
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {title && (
            <motion.div 
              className="px-6 py-4 border-b border-white/10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
            </motion.div>
          )}
          <motion.div 
            className="p-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
