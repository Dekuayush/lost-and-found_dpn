
import React, { useState, useEffect } from 'react';
import { Screen, LostFoundItem, ItemType, Message } from './types';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import PostItemScreen from './screens/PostItemScreen';
import ItemDetailScreen from './screens/ItemDetailScreen';
import ChatScreen from './screens/ChatScreen';

const MOCK_DATA: LostFoundItem[] = [
  {
    id: '1',
    title: 'Microprocessor Journal',
    description: 'Found a blue-covered Microprocessor practical journal. Name on first page: "Sameer Deshmukh". Please collect it from the lab assistant.',
    location: 'Network and Security Lab',
    date: '2024-05-24',
    contact: '9988776655',
    type: ItemType.FOUND,
    imageUrl: 'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?auto=format&fit=crop&q=80&w=800',
    timestamp: Date.now() - 1800000
  },
  {
    id: '2',
    title: 'Scientific Calculator fx-991EX',
    description: 'Lost my Casio calculator during the morning session. It has a "DPN" sticker on the back.',
    location: 'FY3 Classroom',
    date: '2024-05-24',
    contact: '8877665544',
    type: ItemType.LOST,
    imageUrl: 'https://images.unsplash.com/photo-1594918589744-4311796d13da?auto=format&fit=crop&q=80&w=800',
    timestamp: Date.now() - 7200000
  },
  {
    id: '3',
    title: 'Engineering Drafting Set',
    description: 'Found a complete drafting set with roller scale and compass in a black pouch left on a drawing table.',
    location: 'Drawing Hall',
    date: '2024-05-23',
    contact: '7766554433',
    type: ItemType.FOUND,
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&q=80&w=800',
    timestamp: Date.now() - 14400000
  },
  {
    id: '4',
    title: 'Silver Titan Watch',
    description: 'Lost a silver strap watch. Likely fell off during the seminar event yesterday.',
    location: 'Vishwakarma Hall',
    date: '2024-05-23',
    contact: '6655443322',
    type: ItemType.LOST,
    imageUrl: 'https://images.unsplash.com/photo-1524592091214-8c97afdfc96e?auto=format&fit=crop&q=80&w=800',
    timestamp: Date.now() - 86400000
  },
  {
    id: '5',
    title: 'Reference Book: Applied Physics',
    description: 'Found a library-issued Physics textbook on the seating benches.',
    location: 'Main Library',
    date: '2024-05-22',
    contact: '5544332211',
    type: ItemType.FOUND,
    imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800',
    timestamp: Date.now() - 172800000
  },
  {
    id: '7',
    title: 'Blue Water Bottle (Milton)',
    description: 'Left my blue insulated water bottle under the middle row bench. It has a small DPN decal.',
    location: 'FY2 Classroom',
    date: '2024-05-22',
    contact: '3322110099',
    type: ItemType.LOST,
    imageUrl: 'https://images.unsplash.com/photo-1602143399827-7d15cc0a096f?auto=format&fit=crop&q=80&w=800',
    timestamp: Date.now() - 200000000
  },
  {
    id: '8',
    title: 'SanDisk 64GB Pendrive',
    description: 'Found a red SanDisk pendrive plugged into one of the workstations. Contains some CAD files.',
    location: 'FY4 Lab',
    date: '2024-05-21',
    contact: '2211009988',
    type: ItemType.FOUND,
    imageUrl: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=800',
    timestamp: Date.now() - 300000000
  }
];

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen | 'SUCCESS'>('SPLASH');
  const [items, setItems] = useState<LostFoundItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<LostFoundItem | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [activeTab, setActiveTab] = useState<'EXPLORE' | 'MY_POSTS'>('EXPLORE');

  useEffect(() => {
    const savedItems = localStorage.getItem('dpn_items');
    const savedMessages = localStorage.getItem('dpn_chats');
    
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      setItems(MOCK_DATA);
      localStorage.setItem('dpn_items', JSON.stringify(MOCK_DATA));
    }

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    const timer = setTimeout(() => setCurrentScreen('HOME'), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddItem = (newItem: LostFoundItem) => {
    const updated = [newItem, ...items];
    setItems(updated);
    localStorage.setItem('dpn_items', JSON.stringify(updated));
    setCurrentScreen('SUCCESS');
    setTimeout(() => setCurrentScreen('HOME'), 2000);
  };

  const handleResolveItem = (id: string) => {
    const updated = items.map(item => item.id === id ? { ...item, resolved: true } : item);
    setItems(updated as any);
    localStorage.setItem('dpn_items', JSON.stringify(updated));
    setCurrentScreen('HOME');
  };

  const navigateToDetail = (item: LostFoundItem) => {
    setSelectedItem(item);
    setCurrentScreen('DETAIL');
  };

  const navigateToChat = (item: LostFoundItem) => {
    setSelectedItem(item);
    setCurrentScreen('CHAT');
  };

  const handleSendMessage = (itemId: string, text: string, sender: 'user' | 'owner') => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      sender,
      timestamp: Date.now()
    };
    const updated = {
      ...messages,
      [itemId]: [...(messages[itemId] || []), newMessage]
    };
    setMessages(updated);
    localStorage.setItem('dpn_chats', JSON.stringify(updated));
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 shadow-2xl relative overflow-hidden flex flex-col">
      {currentScreen === 'SPLASH' && <SplashScreen />}
      
      {currentScreen === 'SUCCESS' && (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Item Posted!</h2>
          <p className="text-slate-500">Helping DPN students connect.</p>
        </div>
      )}

      {currentScreen === 'HOME' && (
        <HomeScreen 
          items={activeTab === 'EXPLORE' ? items : items.filter(i => i.contact === 'USER_POSTED' || i.id === 'user_posted')} 
          onPostClick={() => setCurrentScreen('POST')} 
          onItemClick={navigateToDetail}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}

      {currentScreen === 'POST' && (
        <PostItemScreen 
          onSubmit={handleAddItem} 
          onBack={() => setCurrentScreen('HOME')} 
        />
      )}

      {currentScreen === 'DETAIL' && selectedItem && (
        <ItemDetailScreen 
          item={selectedItem} 
          onBack={() => setCurrentScreen('HOME')} 
          onChatClick={() => navigateToChat(selectedItem)}
          onResolve={() => handleResolveItem(selectedItem.id)}
        />
      )}

      {currentScreen === 'CHAT' && selectedItem && (
        <ChatScreen 
          item={selectedItem} 
          messages={messages[selectedItem.id] || []}
          onSendMessage={(txt) => handleSendMessage(selectedItem.id, txt, 'user')}
          onReceiveMessage={(txt) => handleSendMessage(selectedItem.id, txt, 'owner')}
          onBack={() => setCurrentScreen('DETAIL')}
        />
      )}
    </div>
  );
};

export default App;
