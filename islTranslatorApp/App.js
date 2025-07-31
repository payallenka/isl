import React from 'react';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LiveScreen from './screens/LiveScreen';
import SpokenLanguageScreen from './screens/SpokenLanguageScreen';
import TransactionsScreen from './screens/TransactionsScreen';

const Stack = createStackNavigator();
enableScreens();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LiveScreen" component={LiveScreen} />
        <Stack.Screen name="SpokenLanguage" component={SpokenLanguageScreen} />
        <Stack.Screen name="Transactions" component={TransactionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
