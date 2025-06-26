import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

import { RootStackParamList } from '../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ChatBubble from '../components/ChatBubble';
import { useChatMessages } from '../hooks/useChatMessages';
import { colors } from '../theme/colors';
import { useImagePickerModal } from '../hooks/useImagePickerModal';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

const ChatScreen: React.FC<Props> = ({ route, navigation }) => {
  const { salonId, salonName } = route.params;
  const [input, setInput] = useState('');
  const [messages, sendMessage, sendImage] = useChatMessages(salonId);

  const { showImagePickerModal, ImagePickerModal } = useImagePickerModal((uri) => {
    sendImage(uri);
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Chat with ${salonName}`,
    });
  }, [navigation, salonName]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 20}
      >
        <KeyboardAwareFlatList
          data={messages}
          inverted
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatBubble message={item} />}
          contentContainerStyle={{ padding: 12, flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={20}
          enableOnAndroid
        />

        <View style={styles.inputContainer}>
          <View style={styles.iconWrapper}>
            <TouchableOpacity onPress={showImagePickerModal}>
              <Icon name="photo-camera" size={24} color={colors.placeholder} />
            </TouchableOpacity>
          </View>

          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type a message"
            placeholderTextColor={colors.placeholder}
            multiline
            style={styles.input}
            textAlignVertical="top"
            blurOnSubmit={false}
            onSubmitEditing={handleSend}
          />

          <View style={styles.iconWrapper}>
            <TouchableOpacity onPress={handleSend}>
              <Icon name="send" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Image Picker Modal */}
      {ImagePickerModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderColor: colors.border,
    padding: 10,
    backgroundColor: colors.surface,
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: colors.background,
    color: colors.text,
    textAlignVertical: 'top',
    minHeight: 40,
    maxHeight: 120,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;
