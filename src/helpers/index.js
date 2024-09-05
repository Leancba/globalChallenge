import React, { useRef, useEffect, useMemo } from "react";
import SplashScreen from "react-native-splash-screen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, Appbar } from "react-native-paper";
import { Alert, Animated, View, StyleSheet, Easing, Text } from 'react-native';
import LinearGradient from "react-native-linear-gradient";

import Logo from '../../assets/icon.png';


export { Logo };


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

  const styles = {
    appbarHeader: {
      backgroundColor: '#F15A50', // Rojo coral (Primario)
    },
    headerTitle: {
      color: '#fff', // Texto blanco para contraste
      fontFamily: 'Poppins-SemiBold',
    },
  };

  return (
    <Appbar.Header style={styles.appbarHeader}>
      <Appbar.BackAction color="#fff" onPress={() => navigation.goBack()} />
      <Appbar.Content titleStyle={styles.headerTitle} title={headerTitle || "App"} />
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
  "https://img.freepik.com/premium-photo/3d-character-avatar_113255-5314.jpg",
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





const GRADIENT_START = { x: 0, y: 0 };
const GRADIENT_END = { x: 1, y: 0 };

export const Skeleton = ({
  height,
  width,
  backgroundColor = '#fff',
  highlightColor = 'rgba(241, 90, 80, 0.1)',
  speed = 800,
  style, // Add style prop here
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: speed,
        easing: Easing.ease,
        useNativeDriver: true,
      })
    ).start();
  }, [animatedValue, speed]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  const gradientColors = useMemo(
    () => [backgroundColor, highlightColor, backgroundColor],
    [backgroundColor, highlightColor]
  );

  return (
    <View style={[styles.container, { height, width, backgroundColor }, style]}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <LinearGradient
          style={styles.gradient}
          colors={gradientColors}
          start={GRADIENT_START}
          end={GRADIENT_END}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 16,
  },
  gradient: {
    flex: 1,
  },
});



export const highlightText = (text, query) => {
  if (!query) return <Text>{text}</Text>;

  const escapedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <Text key={index} style={{ backgroundColor: 'rgba(241, 90, 80, 0.2)', color: '#F15A50', fontWeight: 'bold' }}>
        {part}
      </Text>
    ) : (
      <Text key={index} style={{ color: '#333333' }}>{part}</Text>
    )
  );
};





