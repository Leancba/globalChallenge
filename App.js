import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { ToastProvider } from 'react-native-toast-notifications';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import Login from "./src/components/login";
import Container from "./src/components/container";
import { checkToken, toastProviderConfig } from "@helpers/index";



const Stack = createNativeStackNavigator();

const App = () => {

  const navigation = useNavigation();


  useEffect(() => {

    checkToken(navigation);

  }, [navigation]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor='#028ab9' />

      <ToastProvider {...toastProviderConfig}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Container" component={Container} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </ToastProvider>
    </>
  );
};

export default App;
