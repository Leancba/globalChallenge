import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Appbar, Menu, Searchbar, List, Avatar, Text, Button } from 'react-native-paper';
import { getUserData } from 'services/userDataApi';
import { getChats } from 'services/chatsApi';
import { CustomAlert, Skeleton, highlightText} from 'helpers';

const ChatListScreen = ({ navigation }) => {

  const skeletons = Array.from({ length: 9 });

  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats);
  const screenWidth = Dimensions.get('window').width;
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

  const handleNavigateAndCloseMenu = (screen, params) => {

    setMenuVisible(false);
    setSelectedChat(null);
    navigation.navigate(screen, params);
  };

  const handleDeleteChat = () => {
    CustomAlert({
      selectedChat,
      setSelectedChat,
      dispatch,
      chats
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Appbar.Header style={styles.appbarHeader}>
        {selectedChat ? (
          <>
            <Appbar.Content title="Eliminar chat" titleStyle={styles.appbarTitle} />
            <Appbar.Action icon="trash-can" color="#fff" onPress={handleDeleteChat} />
          </>
        ) : (
          <>
            <Appbar.Content title="GlobalChat" titleStyle={styles.appbarTitle} />
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
                labelStyle={styles.menuButtonLabel}
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
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
        style={styles.searchbar}
      />

      {loading ? (
        <View>
          {skeletons.map((_, index) => (
            <View key={index} style={styles.skeletonContainer}>
              <Skeleton
                width={60}
                height={60}
                style={styles.skeletonAvatar}
              />
              <Skeleton
                width={screenWidth - 80}
                height={70}
              />
            </View>
          ))}
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          {!searchQuery && chats?.map((chat) => (
            <List.Item
              key={chat.id}
              title={chat.contact}
              titleStyle={styles.listItemTitle}
              description={chat.lastMessage}
              descriptionNumberOfLines={1}
              descriptionStyle={styles.listItemDescription}
              left={() => <Avatar.Image size={48} source={{ uri: chat.avatar }} />}
              right={() => (
                <View style={styles.listItemRight}>
                  <Text>{chat.lastMessageTime}</Text>
                </View>
              )}
              onPress={() => handleNavigateAndCloseMenu('ChatDetail', { chat: chat })}
              onLongPress={() => setSelectedChat(chat)}
            />
          ))}

          {searchQuery && (
            <>
              {filteredChatsByName.length > 0 && (
                <>
                  <Text style={styles.filteredText}>Chats</Text>
                  {filteredChatsByName.map((chat) => (
                    <List.Item
                      key={chat.id}
                      title={chat.contact}
                      description={chat.lastMessage}
                      descriptionNumberOfLines={1}
                      left={() => <Avatar.Image size={48} source={{ uri: chat.avatar }} />}
                      right={() => (
                        <View style={styles.listItemRight}>
                          <Text>{chat.lastMessageTime}</Text>
                        </View>
                      )}
                      onPress={() => handleNavigateAndCloseMenu('ChatDetail', { chat: chat })}
                      onLongPress={() => setSelectedChat(chat)}
                    />
                  ))}
                </>
              )}

              {filteredChatsByMessage.length > 0 && (
                <>
                  <Text style={styles.filteredText}>Mensajes</Text>
                  {filteredChatsByMessage.map((chat) => (
                    <List.Item
                      key={chat.id}
                      title={chat.contact}
                      description={() => (
                        <Text style={styles.descriptionContainer}>
                          {highlightText(chat.lastMessage, searchQuery)}
                        </Text>
                      )}
                      descriptionNumberOfLines={1}
                      left={() => <Avatar.Image size={48} source={{ uri: chat.avatar }} />}
                      right={() => (
                        <View style={styles.listItemRight}>
                          <Text>{chat.lastMessageTime}</Text>
                        </View>
                      )}
                      onPress={() => handleNavigateAndCloseMenu('ChatDetail', { chat: chat })}
                      onLongPress={() => setSelectedChat(chat)}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#00749c',
  },
  appbarHeader: {
    backgroundColor: '#028ab9',
  },
  appbarTitle: {
    marginLeft: 10,
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
  menuButtonLabel: {
    color: '#00749c',
    fontFamily: 'Poppins-SemiBold',
  },
  searchbar: {
    margin: 8,
    backgroundColor: '#028ab9',
  },
  skeletonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  skeletonAvatar: {
    borderRadius: 30,
    marginRight: 5,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 8,
  },
  listItemTitle: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  listItemDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Poppins-Regular',
  },
  descriptionContainer: {
    flexDirection: 'row',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  listItemRight: {
    justifyContent: 'center',
  },
  filteredText: {
    fontWeight: 'bold',
    marginTop: 16,
  },
});

export default ChatListScreen;
