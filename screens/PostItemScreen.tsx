
import React, { useState } from 'react';
import { LostFoundItem, ItemType } from '../types';
import { GoogleGenAI } from "@google/genai";

interface Props {
  onSubmit: (item: LostFoundItem) => void;
  onBack: () => void;
}

const PostItemScreen: React.FC<Props> = ({ onSubmit, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    contact: '',
    type: ItemType.LOST,
    image: null as string | null
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSmartDescribe = async () => {
    if (!formData.title) return alert("Please enter a title first!");
    
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a short, professional lost/found description for: "${formData.title}" on a college campus. Be helpful but concise.`
      });
      
      if (response.text) {
        setFormData(prev => ({ ...prev, description: response.text.trim() }));
      }
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.location || !formData.contact) {
      alert("Please fill in all required fields.");
      return;
    }

    const newItem: LostFoundItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      description: formData.description,
      location: formData.location,
      date: formData.date,
      contact: formData.contact,
      type: formData.type,
      imageUrl: formData.image || 'https://picsum.photos/seed/placeholder/600/400',
      timestamp: Date.now()
    };

    setLoading(true);
    // Simulate upload delay
    setTimeout(() => {
      setLoading(false);
      onSubmit(newItem);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 pt-8 flex items-center gap-4">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h2 className="text-xl font-bold text-slate-800">Post New Item</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 px-6 pb-10 mt-6 space-y-6 overflow-y-auto">
        {/* Type Selector */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl">
          <button
            type="button"
            onClick={() => setFormData(p => ({ ...p, type: ItemType.LOST }))}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${formData.type === ItemType.LOST ? 'bg-white shadow-sm text-red-600' : 'text-slate-500'}`}
          >
            LOST ITEM
          </button>
          <button
            type="button"
            onClick={() => setFormData(p => ({ ...p, type: ItemType.FOUND }))}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${formData.type === ItemType.FOUND ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500'}`}
          >
            FOUND ITEM
          </button>
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Item Image</label>
          <div className="relative aspect-video rounded-2xl dashed-border flex flex-col items-center justify-center bg-slate-50 overflow-hidden cursor-pointer">
            {formData.image ? (
              <>
                <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                <button 
                  type="button" 
                  onClick={() => setFormData(p => ({ ...p, image: null }))}
                  className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </>
            ) : (
              <>
                <svg className="w-12 h-12 text-slate-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <p className="text-xs text-slate-400">Tap to upload photo</p>
              </>
            )}
            <input 
              type="file" 
              accept="image/*" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Item Name</label>
            <input
              type="text"
              placeholder="e.g. Silver Ring, Blue Wallet"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900"
              value={formData.title}
              onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
              <button 
                type="button"
                onClick={handleSmartDescribe}
                disabled={loading}
                className="text-[10px] font-bold text-blue-600 flex items-center gap-1 hover:underline disabled:opacity-50"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.586 15.586a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM16 18a1 1 0 100-2 1 1 0 000 2z" /></svg>
                AI GENERATE
              </button>
            </div>
            <textarea
              placeholder="Provide more details..."
              rows={3}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none text-slate-900"
              value={formData.description}
              onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Location</label>
              <input
                type="text"
                placeholder="Where?"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900"
                value={formData.location}
                onChange={e => setFormData(p => ({ ...p, location: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Date</label>
              <input
                type="date"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900"
                value={formData.date}
                onChange={e => setFormData(p => ({ ...p, date: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Contact Number</label>
            <input
              type="tel"
              placeholder="Your phone number"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900"
              value={formData.contact}
              onChange={e => setFormData(p => ({ ...p, contact: e.target.value }))}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 gradient-btn text-white font-bold rounded-2xl shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            'Post Item Now'
          )}
        </button>
      </form>
    </div>
  );
};

export default PostItemScreen;
