
import React from 'react';

const ReloadIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 4L15 9M4 20l5-5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 4h5v0M20 20h-5v0" />
    <path d="M20 11A8 8 0 1 0 12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);


const Header: React.FC = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <header className="p-6 flex items-center justify-between w-full max-w-5xl mx-auto">
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-extrabold text-slate-900 leading-none tracking-tight">
            DOKUMEN <span className="text-blue-600">PENTING</span>
          </h1>
        </div>
        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1.5">Qr Perusahaan</p>
      </div>

      <button 
        onClick={handleReload} 
        className="w-12 h-12 rounded-2xl bg-white/50 backdrop-blur-lg border border-white/30 flex items-center justify-center shadow-sm hover:shadow-md active:scale-90 transition-all duration-200"
        aria-label="Muat Ulang"
      >
        <ReloadIcon />
      </button>
    </header>
  );
};

export default Header;
