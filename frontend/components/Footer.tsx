
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="p-8 text-center">
      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
        © {new Date().getFullYear()} DOKUMEN PENTING
      </p>
    </footer>
  );
};

export default Footer;
