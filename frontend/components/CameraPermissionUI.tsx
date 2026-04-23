
import React from 'react';

interface CameraPermissionUIProps {
  onStart: () => void;
}

const CameraIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const CameraPermissionUI: React.FC<CameraPermissionUIProps> = ({ onStart }) => {
  return (
    <div className="absolute inset-0 z-40 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center p-10 text-center transition-opacity duration-300">
      <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-600/50 animate-bounce">
        <CameraIcon />
      </div>
      <h3 className="text-white font-bold text-xl mb-2">Akses Kamera Diperlukan</h3>
      <p className="text-slate-300 text-sm mb-8 max-w-xs">
        Izinkan akses kamera untuk mulai memverifikasi dokumen penting Anda secara aman.
      </p>
      <button
        onClick={onStart}
        className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-bold shadow-xl hover:bg-blue-700 active:scale-95 transition-all duration-200"
      >
        Buka Kamera
      </button>
    </div>
  );
};

export default CameraPermissionUI;
