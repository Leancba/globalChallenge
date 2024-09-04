import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import ChatListScreen from "./Chatlist";
import ChatDetailScreen from "./Chat";
import Settings from "./Settings";
import EditProfile from "./EditProfile";
import { CustomAppBar } from "helper/index";


// Custom App Bar


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Stack.Navigator
      initialRouteName="ChatList"
      screenOptions={({ route, navigation }) => ({
        headerShown: true,
        header: (props) => <CustomAppBar {...props} route={route} navigation={navigation} />})}
    >
      <Stack.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatDetail"
        component={ChatDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        initialParams={{ headerTitle: "Configuración" }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        initialParams={{ headerTitle: "Editar Perfil" }}
      />
    </Stack.Navigator>
  );
};

export default App;
