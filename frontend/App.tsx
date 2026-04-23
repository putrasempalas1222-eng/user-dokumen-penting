
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Scanner from './components/Scanner';

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
        <Scanner />
      </main>
      <Footer />
    </div>
  );
};

export default App;
