
import React, { useState } from 'react';
import { LostFoundItem, ItemType } from '../types';
import ItemCard from '../components/ItemCard';

interface Props {
  items: LostFoundItem[];
  onPostClick: () => void;
  onItemClick: (item: LostFoundItem) => void;
  activeTab: 'EXPLORE' | 'MY_POSTS';
  setActiveTab: (tab: 'EXPLORE' | 'MY_POSTS') => void;
}

const HomeScreen: React.FC<Props> = ({ items, onPostClick, onItemClick, activeTab, setActiveTab }) => {
  const [filter, setFilter] = useState<'ALL' | ItemType>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items
    .filter(i => filter === 'ALL' || i.type === filter)
    .filter(i => 
      i.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      i.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Search Header */}
      <header className="px-6 pt-10 pb-6 bg-white shadow-sm sticky top-0 z-20">
        <div className="flex justify-between items-start mb-6">
          <div className="max-w-[80%]">
            <h2 className="text-xl font-bold text-[#1E3A8A] leading-tight">Lost and Found for DPN</h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-0.5">Dharampeth Polytechnic Nagpur</p>
          </div>
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 relative shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </div>
        </div>

        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search Vishwakarma, Drawing Hall, FY1-4..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900 shadow-inner"
          />
          <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pb-32 no-scrollbar">
        {activeTab === 'EXPLORE' && (
          <>
            {/* Quick Actions Buttons */}
            <div className="px-6 mt-6 grid grid-cols-2 gap-4">
              <button 
                onClick={() => setFilter(ItemType.LOST)}
                className={`flex items-center gap-3 p-4 rounded-2xl transition-all ${filter === ItemType.LOST ? 'bg-red-500 text-white shadow-lg' : 'bg-white shadow-sm border border-slate-100 text-slate-700'}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${filter === ItemType.LOST ? 'bg-white/20' : 'bg-red-50 text-red-600'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold opacity-70">Lost</p>
                  <p className="text-sm font-bold leading-tight">Reports</p>
                </div>
              </button>

              <button 
                onClick={() => setFilter(ItemType.FOUND)}
                className={`flex items-center gap-3 p-4 rounded-2xl transition-all ${filter === ItemType.FOUND ? 'bg-emerald-500 text-white shadow-lg' : 'bg-white shadow-sm border border-slate-100 text-slate-700'}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${filter === ItemType.FOUND ? 'bg-white/20' : 'bg-emerald-50 text-emerald-600'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold opacity-70">Found</p>
                  <p className="text-sm font-bold leading-tight">Reports</p>
                </div>
              </button>
            </div>

            {/* List Heading */}
            <div className="px-6 mt-8 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Campus Activity</h3>
              <button onClick={() => setFilter('ALL')} className="text-xs font-bold text-blue-600 hover:underline">Clear Filter</button>
            </div>
          </>
        )}

        {/* Item List */}
        <div className="px-6 pt-4 space-y-4">
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <p className="text-lg font-bold text-slate-600">No matching items</p>
              <p className="text-sm text-slate-400 text-center px-4">Try searching for lab equipment or Drawing Hall</p>
            </div>
          ) : (
            filteredItems.map(item => (
              <ItemCard key={item.id} item={item} onClick={() => onItemClick(item)} />
            ))
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={onPostClick}
        className="fixed bottom-24 right-6 w-14 h-14 gradient-btn rounded-2xl shadow-xl flex items-center justify-center text-white hover:scale-110 transition-transform active:scale-95 z-30"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
      </button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-100 flex items-center justify-around py-4 px-6 z-40">
        <button onClick={() => setActiveTab('EXPLORE')} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'EXPLORE' ? 'text-blue-600' : 'text-slate-400'}`}>
          <svg className="w-6 h-6" fill={activeTab === 'EXPLORE' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <span className="text-[10px] font-bold uppercase tracking-widest">Explore</span>
        </button>
        <button onClick={() => setActiveTab('MY_POSTS')} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'MY_POSTS' ? 'text-blue-600' : 'text-slate-400'}`}>
          <svg className="w-6 h-6" fill={activeTab === 'MY_POSTS' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          <span className="text-[10px] font-bold uppercase tracking-widest">My Posts</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <span className="text-[10px] font-bold uppercase tracking-widest">Setup</span>
        </button>
      </nav>
    </div>
  );
};

export default HomeScreen;
