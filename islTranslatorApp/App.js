import React from 'react';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import HomeScreen from './screens/HomeScreen';
import LiveScreen from './screens/LiveScreen';
import SpokenLanguageScreen from './screens/SpokenLanguageScreen';
import TransactionsScreen from './screens/TransactionsScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createStackNavigator();
enableScreens();

function Navigation() {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // Or a loading screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={user ? "Home" : "Login"} 
        screenOptions={{ headerShown: false }}
      >
        {user ? (
          // Authenticated stack
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="LiveScreen" component={LiveScreen} />
            <Stack.Screen name="SpokenLanguage" component={SpokenLanguageScreen} />
            <Stack.Screen name="Transactions" component={TransactionsScreen} />
          </>
        ) : (
          // Authentication stack
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
