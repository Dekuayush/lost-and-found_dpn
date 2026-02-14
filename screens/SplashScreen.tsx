
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#1E3A8A] flex flex-col items-center justify-center z-50 transition-opacity duration-1000">
      <div className="animate-bounce mb-8">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
          <svg className="w-14 h-14 text-[#1E3A8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
      
      <div className="text-center animate-[fadeIn_1.5s_ease-in-out] px-8">
        <h1 className="text-white text-3xl font-bold tracking-tight mb-2">Lost and Found</h1>
        <h1 className="text-cyan-400 text-3xl font-bold tracking-tight mb-4">for DPN</h1>
        <div className="w-16 h-1.5 bg-cyan-500 mx-auto rounded-full mb-6 opacity-60"></div>
        <p className="text-slate-300 text-sm font-medium tracking-widest uppercase">Dharampeth Polytechnic Nagpur</p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
