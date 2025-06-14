
import { Loader2, Utensils } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  type?: 'default' | 'meat' | 'minimal';
}

const LoadingSpinner = ({ size = 'md', message, type = 'default' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const containerSizes = {
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-8'
  };

  if (type === 'minimal') {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className={`${sizeClasses[size]} animate-spin text-purple-400`} />
        {message && <span className="ml-2 text-gray-300">{message}</span>}
      </div>
    );
  }

  if (type === 'meat') {
    return (
      <div className={`flex flex-col items-center justify-center ${containerSizes[size]}`}>
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-pink-500/50">
            <Utensils className="w-8 h-8 text-white animate-bounce" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-ping opacity-20"></div>
        </div>
        {message && (
          <p className="mt-4 text-lg text-gray-300 animate-pulse font-medium">
            {message}
          </p>
        )}
        <div className="mt-2 flex space-x-1">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce animation-delay-200"></div>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce animation-delay-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${containerSizes[size]}`}>
      <div className="relative">
        <Loader2 className={`${sizeClasses[size]} animate-spin text-purple-400`} />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse opacity-20"></div>
      </div>
      {message && (
        <p className="mt-3 text-gray-300 text-center font-medium animate-fade-in">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
