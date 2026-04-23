
import React from 'react';

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-md z-[100] flex flex-col items-center justify-center" role="status" aria-live="polite">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
      <p className="text-blue-600 font-black tracking-widest text-lg animate-pulse">
        MEMVERIFIKASI...
      </p>
    </div>
  );
};

export default LoadingOverlay;
