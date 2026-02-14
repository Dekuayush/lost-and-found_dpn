
import React from 'react';
import { LostFoundItem, ItemType } from '../types';

interface Props {
  item: LostFoundItem;
  onBack: () => void;
  onChatClick: () => void;
}

const ItemDetailScreen: React.FC<Props> = ({ item, onBack, onChatClick }) => {
  const isLost = item.type === ItemType.LOST;

  const handleCall = () => {
    window.location.href = `tel:${item.contact}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 pb-32 overflow-y-auto">
      {/* Top Banner */}
      <div className="relative h-[40vh] min-h-[300px] w-full bg-slate-200 overflow-hidden shadow-lg shrink-0">
        <img 
          src={item.imageUrl} 
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <button 
          onClick={onBack}
          className="absolute top-10 left-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white ring-1 ring-white/30"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        
        <div className={`absolute bottom-6 left-6 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg ${isLost ? 'bg-red-500' : 'bg-emerald-500'}`}>
          {item.type} ITEM
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-8 relative z-10 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">{item.title}</h2>
          
          <div className="space-y-6 mt-4">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Found at</p>
                <p className="font-semibold text-slate-700">{item.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Reported On</p>
                <p className="font-semibold text-slate-700">{new Date(item.date).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Detailed Description</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                {item.description || "No detailed description provided for this item."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-slate-100 grid grid-cols-2 gap-3 z-20">
        <button 
          onClick={handleCall}
          className="py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          Direct Call
        </button>
        <button 
          onClick={onChatClick}
          className="py-4 bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold rounded-2xl shadow-lg transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          Send Message
        </button>
      </div>
    </div>
  );
};

export default ItemDetailScreen;
