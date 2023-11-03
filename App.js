import { useEffect, useState } from 'react';
import * as Linking from 'expo-linking';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';

const prefix = Linking.createURL('/');
const Stack = createNativeStackNavigator();

//  GoogleSignin.configure({
//    webClientId: '939594854325-cn1mh2md9es85l0n6gbm9hotbmqmrpoi.apps.googleusercontent.com'
//  });

export default function App() {
  const [data, setData] = useState(null);

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        home: "home",
        settings: "settings"
      },
    },
  };

  const handleDeepLink = (event) => {
    let thisData = Linking.parse(event.url);
    setData(thisData);
  }

  useEffect(() => {
    const getInitialURL = async () => {
      const url = await Linking.getInitialURL();
      if (url) setData(Linking.parse(url));
    }

    const listener = Linking.addEventListener('url', handleDeepLink);
    if (!data) getInitialURL();

    return () => listener.remove();
  }
  , []);

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};