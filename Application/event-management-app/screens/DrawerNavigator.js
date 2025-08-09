// DrawerNavigator.js
import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './HomeScreen';
import BookEventScreen from './BookEventScreen';
import MyBookingsScreen from './MyBookingScreen';
import AboutUsScreen from './AboutScreen';
import ServicesScreen from './ServiceScreen';
// import ProfileScreen from './screens/ProfileScreen';
// import SettingsScreen from './screens/SettingsScreen';

// A screen that logs out immediately when opened
function LogoutScreen({ navigation }) {
  useEffect(() => {
    async function logout() {
      await AsyncStorage.clear(); // or remove specific keys
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
    logout();
  }, []);
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Logout" component={LogoutScreen} />
        <Drawer.Screen name="Book Events" component={BookEventScreen} />
        <Drawer.Screen name="My Bookings" component={MyBookingsScreen} />
        <Drawer.Screen name="About Us" component={AboutUsScreen} />
        <Drawer.Screen name="Services" component={ServicesScreen} />
        {/* <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
