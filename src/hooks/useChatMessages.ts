import { useState } from 'react';
import { ChatMessage } from '../components/ChatBubble';
import uuid from 'react-native-uuid';

export const useChatMessages = (salonId: string): [
  ChatMessage[],
  (text: string) => void,
  (imageUri: string) => void
] => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const sendMessage = (text: string) => {
    setMessages(prev => [
      {
        id: uuid.v4().toString(),
        text,
        sender: 'user',
        timestamp: Date.now(),
      },
      ...prev,
    ]);
  };

  const sendImage = (imageUri: string) => {
    setMessages(prev => [
      {
        id: uuid.v4().toString(),
        imageUri,
        sender: 'user',
        timestamp: Date.now(),
      },
      ...prev,
    ]);
  };

  return [messages, sendMessage, sendImage];
};
