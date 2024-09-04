import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SignInComponent from './SignInScreen';
import WelcomeScreen from './WelcomeScren';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={true ? "Welcome" : "SignIn"}>
      <Stack.Screen 
        name="SignIn" 
        component={SignInComponent}
      />
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen} 
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
