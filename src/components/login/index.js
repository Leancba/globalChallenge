import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SignInComponent from './SignInScreen';
import WelcomeScreen from './WelcomeScren';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={false ? "Welcome" : "SignIn"}>
      <Stack.Screen 
        name="SignIn" 
        component={SignInComponent} 
        options={{ title: 'Iniciar Sesión' }} 
      />
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen} 
        options={{ title: 'Hola Mundo' }} 
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
