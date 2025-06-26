import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';

export type ChatMessage = {
  id: string;
  text?: string;
  imageUri?: string;
  timestamp: number;
  sender: 'user' | 'salon';
};

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <View style={[styles.bubble, isUser ? styles.user : styles.salon]}>
      {message.imageUri && (
        <Image source={{ uri: message.imageUri }} style={styles.image} />
      )}
      {message.text && <Text style={styles.text}>{message.text}</Text>}
    </View>
  );
};

export default ChatBubble;
