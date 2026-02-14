
import React from 'react';
import { LostFoundItem, ItemType } from '../types';

interface Props {
  item: LostFoundItem;
  onClick: () => void;
}

const ItemCard: React.FC<Props> = ({ item, onClick }) => {
  const isLost = item.type === ItemType.LOST;
  const isResolved = (item as any).resolved;

  const timeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 active:scale-[0.98] transition-all cursor-pointer group flex flex-col ${isResolved ? 'opacity-60 grayscale-[0.5]' : ''}`}
    >
      <div className="relative h-48 w-full bg-slate-100">
        <img 
          src={item.imageUrl} 
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <div className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-md ${isLost ? 'bg-red-500/90' : 'bg-emerald-500/90'}`}>
            {item.type}
          </div>
          {isResolved && (
            <div className="px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-md bg-blue-600/90 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Resolved
            </div>
          )}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
          <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-[10px] font-medium flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {timeAgo(item.timestamp)}
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-800 line-clamp-1 mb-1">{item.title}</h3>
        
        <div className="flex items-center text-slate-500 text-xs mb-4">
          <div className="w-6 h-6 bg-slate-100 rounded-md flex items-center justify-center mr-2">
            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <span className="truncate font-medium">{item.location}</span>
        </div>
        
        <div className="flex items-center justify-between">
           <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-blue-600">J</div>
              <div className="w-7 h-7 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-emerald-600">A</div>
              <div className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400">+2</div>
           </div>
           <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-tight">Tap to View</span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
