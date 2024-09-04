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


  //OBTIENE MENSAJE SI HUBO CONVERSACION, ALOJADA EN LOCAL

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

  //SETEA CONVERSACION EN EL LOCALSTORAGE

  const storeMessages = async (newMessages) => {
    try {
      await AsyncStorage.setItem(contactName, JSON.stringify(newMessages));
    } catch (error) {
      console.log('Error storing messages:', error);
    }
  };

  //ENVIA MENSAJE, CONVIERTE LOS DATOS, LOS UNIFICA, LOS SETEA EN ESTADO, LO PASA AL LOCAL , LIMPIA EL INPUT Y 
  //EJECUTA EL SCROLL HACIA EL ULTIMO MENSAJE SIMIL WHATS APP

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
        <Appbar.Content title={chat.contact} titleStyle={styles.headerTitle} />
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
          style={styles.textInput}
          placeholder="Type a message"
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
    backgroundColor: '#00749c',
  },
  header: {
    backgroundColor: '#028ab9',
  },
  headerTitle: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    marginLeft: 10,
  },
  container: {
    padding: 10,
    backgroundColor: '#00749c',
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
    backgroundColor: '#028ab9',
    alignSelf: 'flex-start',
  },
  bubbleRight: {
    backgroundColor: 'grey',
    alignSelf: 'flex-end',
  },
  messageText: {
    color: '#fff',
  },
  time: {
    fontSize: 10,
    marginTop: 5,
    textAlign: 'right',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#028ab9',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
  sendButton: {
    backgroundColor: '#00749c',
  },
});

export default ChatDetailScreen;
