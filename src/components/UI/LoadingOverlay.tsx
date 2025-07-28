import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-6 h-6 text-primary-600 animate-spin" />
          <span className="text-gray-900 dark:text-white font-medium">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
