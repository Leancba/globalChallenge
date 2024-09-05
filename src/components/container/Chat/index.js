import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { IconButton, Appbar, Avatar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatDetailScreen = ({ route, navigation }) => {
  const chat = route.params?.chat;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);
  const contactName = chat.contact;

  // OBTIENE MENSAJE SI HUBO CONVERSACION, ALOJADA EN LOCAL
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem(contactName);
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        } else {
          setMessages(chat.messages);
        }
      } catch (error) {
        console.log('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [chat.messages, contactName]);

  // SETEA CONVERSACION EN EL LOCALSTORAGE
  const storeMessages = async (newMessages) => {
    try {
      await AsyncStorage.setItem(contactName, JSON.stringify(newMessages));
    } catch (error) {
      console.log('Error storing messages:', error);
    }
  };

  // ENVIA MENSAJE Y GUARDA EN LOCAL STORAGE
  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        sender: 'You',
        content: inputText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      storeMessages(updatedMessages);
      setInputText('');
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'You' ? styles.messageRight : styles.messageLeft]}>
      <View style={[styles.messageBubble, item.sender === 'You' ? styles.bubbleRight : styles.bubbleLeft]}>
        <Text style={styles.messageText}>{item.content}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction color="#fff" onPress={() => navigation.goBack()} />
        <Avatar.Image size={40} source={{ uri: chat.avatar }} />
        
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{chat.contact}</Text>
          <Text style={styles.headerSubTitle}>{chat.lastTime}</Text>
        </View>
      </Appbar.Header>

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ref={flatListRef}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: false })}
        contentContainerStyle={styles.container}
      />

      <View style={styles.inputContainer}>
        <TextInput
        textColor="black"
          style={styles.textInput}
          placeholder="Escribe un mensaje"
          placeholderTextColor="#aaa"
          value={inputText}
          onChangeText={setInputText}
        />
        <IconButton
          icon="send"
          size={28}
          color="#fff"
          onPress={sendMessage}
          style={styles.sendButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#F15A50', 
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10, 
  },
  headerContent: {
    flexDirection: 'column',
    marginLeft: 10, 
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  headerSubTitle: {
    color: 'rgba(255, 255, 255, 0.8)', 
    fontSize: 12,
  },
  container: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  messageContainer: {
    marginVertical: 5,
    alignItems: 'flex-end',
  },
  messageLeft: {
    alignSelf: 'flex-start',
  },
  messageRight: {
    alignSelf: 'flex-end',
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 10,
  },
  bubbleLeft: {
    backgroundColor: 'rgba(241, 90, 80, 0.2)',
    alignSelf: 'flex-start',
  },
  bubbleRight: {
    backgroundColor: '#E0E0E0',
    alignSelf: 'flex-end',
  },
  messageText: {
    color: '#333333', 
  },
  time: {
    fontSize: 10,
    marginTop: 5,
    textAlign: 'right',
    color: 'rgba(0, 0, 0, 0.5)',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FF8C7A',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#F15A50',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
  sendButton: {
    backgroundColor: '#F15A50',
  },
});

export default ChatDetailScreen;
