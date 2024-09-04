import SplashScreen from "react-native-splash-screen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, Appbar } from "react-native-paper";
import { Alert } from 'react-native';

export const checkToken = async (navigation) => {

  try {
    const token = await AsyncStorage.getItem('token');
  
    if (token) {

      navigation.reset({
        index: 0,
        routes: [{ name: 'Container' }],
      });
    } else {

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  } catch (error) {
    console.error("Error al verificar el token", error);
  } finally {
    SplashScreen.hide();
  }
};

export const toastProviderConfig = {
  offsetBottom: 30,
  swipeEnabled: true,
  duration: 5000,
  animationType: "zoom-in",
  successColor: "#0080EA",
  warningColor: "rgba(0, 0, 0, 0.7)",
  warningIcon: (
    <Avatar.Image
      size={25}
      style={{ backgroundColor: "#0085ff" }}
      source={require('../components/assets/icon.png')}
    />
  ),
};


export const CustomAppBar = ({ route, navigation }) => {

  const { headerTitle } = route.params || {};

  return (
    <Appbar.Header style={{ backgroundColor: '#028ab9' }} >
      <Appbar.BackAction color="#fff" onPress={() => navigation.goBack()} />
      <Appbar.Content titleStyle={{ color: '#fff' }} title={headerTitle || "App"} />
    </Appbar.Header>
  );
};


export const CustomAlert = ({ selectedChat, setSelectedChat, dispatch, chats }) => {
  if (selectedChat) {
    Alert.alert(
      "Eliminar Chat",
      `¿Estás seguro de que deseas eliminar el chat con ${selectedChat.contact}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
          onPress: () => setSelectedChat(null),
        },
        {
          text: "Eliminar",
          onPress: () => {
            const updatedChats = chats.filter((chat) => chat.id !== selectedChat.id);
            dispatch({
              type: 'GET_CHATS',
              payload: updatedChats,
            });
            setSelectedChat(null);
          },
        },
      ]
    );
  }
};

export const avatares = [
  "https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-1.jpg",
  "https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-2.jpg",
  "https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-3.jpg",
  "https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-4.jpg",
  "https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-5.jpg",
  "https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-6.jpg",
  "https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-7.jpg",
  "https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-8.jpg",
  "https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-9.jpg",
  "https://letstryai.com/wp-content/uploads/2023/11/stable-diffusion-avatar-prompt-example-10.jpg"
];




