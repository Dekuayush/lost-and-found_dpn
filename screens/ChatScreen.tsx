
import React, { useState, useRef, useEffect } from 'react';
import { LostFoundItem, Message, ItemType } from '../types';
import { GoogleGenAI } from "@google/genai";

interface Props {
  item: LostFoundItem;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onReceiveMessage: (text: string) => void;
  onBack: () => void;
}

const ChatScreen: React.FC<Props> = ({ item, messages, onSendMessage, onReceiveMessage, onBack }) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const text = inputText;
    onSendMessage(text);
    setInputText('');

    // Simulate owner response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      onReceiveMessage("Hey! Thanks for messaging. I think that might be mine. Could we meet at the Student Union tomorrow morning?");
    }, 2000);
  };

  const handleAiHelp = async () => {
    setIsTyping(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `I found a ${item.title} on campus. Suggest a polite, safe response for a college student asking the potential owner where to meet to return it. Keep it under 20 words.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      
      if (response.text) {
        setInputText(response.text.trim().replace(/"/g, ''));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-4 py-3 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200">
          <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-slate-800 truncate">{item.title}</h3>
          <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            Owner Online
          </p>
        </div>
      </header>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.length === 0 && (
          <div className="text-center py-10 opacity-40">
            <p className="text-xs font-medium">No messages yet. Start the conversation!</p>
          </div>
        )}
        
        {messages.map((m) => (
          <div 
            key={m.id} 
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                m.sender === 'user' 
                  ? 'bg-[#1E3A8A] text-white rounded-tr-none shadow-md' 
                  : 'bg-white text-slate-700 rounded-tl-none border border-slate-100 shadow-sm'
              }`}
            >
              {m.text}
              <p className={`text-[9px] mt-1 ${m.sender === 'user' ? 'text-blue-200' : 'text-slate-400'}`}>
                {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-100"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex items-center gap-2 mb-2">
          <button 
            onClick={handleAiHelp}
            className="text-[10px] font-bold text-blue-600 px-3 py-1 bg-blue-50 rounded-full flex items-center gap-1 hover:bg-blue-100 transition-colors"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.586 15.586a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM16 18a1 1 0 100-2 1 1 0 000 2z" /></svg>
            AI HELP
          </button>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition-all text-slate-900"
          />
          <button 
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="w-12 h-12 bg-cyan-500 text-white rounded-full flex items-center justify-center shadow-lg disabled:bg-slate-300 disabled:shadow-none transition-all active:scale-90"
          >
            <svg className="w-5 h-5 translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
