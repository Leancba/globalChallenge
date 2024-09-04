import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Appbar, Menu, Searchbar, List, Avatar, Text, Button } from 'react-native-paper';

import { getUserData } from 'services/userDataApi';
import { getChats } from 'services/chatsApi';
import { CustomAlert } from 'helper/index';



const ChatListScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const chats = useSelector((state) => state.chats);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChatsByName, setFilteredChatsByName] = useState([]);
  const [filteredChatsByMessage, setFilteredChatsByMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        await getUserData(dispatch);
        await getChats(dispatch);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los chats', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  
//USE EFFECT QUE ESCUCHA CAMBIOS EN EL QUERY Y SETEA ESTADOS
  useEffect(() => {
    if (searchQuery) {
      const nameResults = chats.filter((chat) =>
        chat.contact.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const messageResults = chats.filter((chat) =>
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setFilteredChatsByName(nameResults);
      setFilteredChatsByMessage(messageResults);
    } else {
      setFilteredChatsByName([]);
      setFilteredChatsByMessage([]);
    }
  }, [searchQuery, chats]);

  //navegacion y seteo de estados

  const handleNavigateAndCloseMenu = (screen, params) => {
    setMenuVisible(false);
    setSelectedChat(null);
    navigation.navigate(screen, params);
  };

  //logica de alert

  const handleDeleteChat = () => {
    CustomAlert({
      selectedChat,
      setSelectedChat,
      dispatch,
      chats
    });
  };



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#00749c' }}>
      <Appbar.Header style={{ backgroundColor: '#028ab9' }}>
        {selectedChat ? (
          <>
            <Appbar.Content title="Eliminar chat" titleStyle={{ marginLeft: 10, color: '#fff', fontFamily: 'Poppins-SemiBold' }} />
            <Appbar.Action icon="trash-can" color="#fff" onPress={handleDeleteChat} />
          </>
        ) : (
          <>
            <Appbar.Content title="GlobalChat" titleStyle={{ marginLeft: 10, color: '#fff', fontFamily: 'Poppins-SemiBold' }} />
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <Appbar.Action
                  icon="dots-vertical"
                  color="#fff"
                  onPress={() => setMenuVisible(true)}
                />
              }
            >
              <Button
                icon={"cog"}
                labelStyle={{ color: '#00749c', fontFamily: 'Poppins-SemiBold' }}
                onPress={() => handleNavigateAndCloseMenu('Settings')}
              >
                Ajustes
              </Button>
            </Menu>
          </>
        )}
      </Appbar.Header>

      <Searchbar
        placeholder="Search"
        iconColor="#ffffff"
        onChangeText={() => setSearchQuery(query)}
        value={searchQuery}
        style={{ margin: 8, backgroundColor: '#028ab9' }}
      />

      {!searchQuery && (
        <ScrollView style={{ flex: 1, paddingHorizontal: 8 }}>
          {chats?.map((chat) => (
            <List.Item
              key={chat.id}
              title={chat.contact}
              titleStyle={{ color: '#fff', fontFamily: 'Poppins-Regular' }}
              description={chat.messages[chat.messages.length - 1]?.content}
              descriptionStyle={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: 'Poppins-Regular',
              }}
              left={() => <Avatar.Image size={48} source={{ uri: chat.avatar }} />}
              right={() => (
                <View style={{ justifyContent: 'center' }}>
                  <Text>{chat.lastMessageTime}</Text>
                </View>
              )}
              onPress={() => handleNavigateAndCloseMenu('ChatDetail', { chat: chat })}
              onLongPress={() => setSelectedChat(chat)} // Establecer chat seleccionado con longpress
            />
          ))}
        </ScrollView>
      )}

      {searchQuery && (
        <ScrollView style={{ flex: 1, paddingHorizontal: 8 }}>
          {filteredChatsByName.length > 0 && (
            <>
              <Text style={{ fontWeight: 'bold', marginTop: 16 }}>Chats</Text>
              {filteredChatsByName.map((chat) => (
                <List.Item
                  key={chat.id}
                  title={chat.contact}
                  description={chat.lastMessage}
                  left={() => <Avatar.Image size={48} source={{ uri: chat.avatar }} />}
                  right={() => (
                    <View style={{ justifyContent: 'center' }}>
                      <Text>{chat.lastMessageTime}</Text>
                    </View>
                  )}
                  onPress={() => handleNavigateAndCloseMenu('ChatDetail', { messages: chat.messages })}
                  onLongPress={() => setSelectedChat(chat)} // Establecer chat seleccionado con longpress
                />
              ))}
            </>
          )}

          {filteredChatsByMessage.length > 0 && (
            <>
              <Text style={{ fontWeight: 'bold', marginTop: 16 }}>Mensajes</Text>
              {filteredChatsByMessage.map((chat) => (
                <List.Item
                  key={chat.id}
                  title={chat.contact}
                  description={chat.lastMessage}
                  left={() => <Avatar.Image size={48} source={{ uri: chat.avatar }} />}
                  right={() => (
                    <View style={{ justifyContent: 'center' }}>
                      <Text>{chat.lastMessageTime}</Text>
                    </View>
                  )}
                  onPress={() => handleNavigateAndCloseMenu('ChatDetail', { messages: chat.messages })}
                  onLongPress={() => setSelectedChat(chat)} // Establecer chat seleccionado con longpress
                />
              ))}
            </>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ChatListScreen;
