import { forwardRef } from 'react';

export const Input = forwardRef(({ className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors ${className}`}
      {...props}
    />
  );
});
