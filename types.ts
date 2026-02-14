
export enum ItemType {
  LOST = 'LOST',
  FOUND = 'FOUND'
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'owner';
  timestamp: number;
}

export interface LostFoundItem {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  contact: string;
  type: ItemType;
  imageUrl: string;
  timestamp: number;
}

export type Screen = 'SPLASH' | 'HOME' | 'POST' | 'DETAIL' | 'CHAT';
