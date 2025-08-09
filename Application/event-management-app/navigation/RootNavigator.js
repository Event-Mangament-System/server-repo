import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import BookEventScreen from '../screens/BookEventScreen';
import MyBookingsScreen from '../screens/MyBookingsScreen';
import ServicesScreen from '../screens/ServicesScreen';
import AboutUsScreen from '../screens/AboutUsScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNav() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Book Event" component={BookEventScreen} />
      <Drawer.Screen name="My Bookings" component={MyBookingsScreen} />
      <Drawer.Screen name="Services" component={ServicesScreen} />
      <Drawer.Screen name="About Us" component={AboutUsScreen} />
    </Drawer.Navigator>
  );
}

export default function RootNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
      setIsLoading(false);
    };
    checkLogin();
  }, []);

  if (isLoading) {
    return null; // can show splash here
  }

  return (
    <NavigationContainer>
      {userToken ? (
        <DrawerNav />
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
