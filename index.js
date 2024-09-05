import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';

import store from "./src/Redux/store";
import { name as appName } from './app.json';
import { Provider } from "react-redux";
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';


// return (
// 	<PaperProvider theme={lightTheme}>
// 		<SafeAreaProvider>
// 			<ToastProvider {...Utils.toastProviderConfig}>
// 				{children}
// 			</ToastProvider>
// 		</SafeAreaProvider>
// 	</PaperProvider>
// );
// };


const Main = () => (
	<PaperProvider>
		<NavigationContainer>
			<Provider store={store}>
				<App />
			</Provider>
		</NavigationContainer>
	</PaperProvider>
);

AppRegistry.registerComponent(appName, () => Main);
