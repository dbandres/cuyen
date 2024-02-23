/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { UserProvider } from './src/context/UserContext';
import DeviceInfo from "react-native-device-info"

export default function App() {

  let current = DeviceInfo.getVersion()
  console.log("Version! ",current);

  return (
    <Provider store={store}>
      <UserProvider>
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      </UserProvider>
    </Provider>
  );
}



