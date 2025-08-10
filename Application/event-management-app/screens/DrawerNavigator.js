/* // DrawerNavigator.js
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
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
 
==============================================================================
import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Colors from '../assets/colors';  // <-- import your colors file

import HomeScreen from './HomeScreen';
import BookEventScreen from './BookEventScreen';
import MyBookingsScreen from './MyBookingScreen';
import AboutUsScreen from './AboutScreen';
import ServicesScreen from './ServiceScreen';

// Logout screen with app colors
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
      <ActivityIndicator size="large" color={Colors.primaryText} />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" 
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primaryBackground },
          headerTintColor: Colors.primaryText,
          drawerStyle: { backgroundColor: Colors.primaryBackground },
          drawerActiveTintColor: Colors.primaryText,
          drawerInactiveTintColor: Colors.primaryText,
          drawerLabelStyle: { fontWeight: 'bold' },
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Book Events" component={BookEventScreen} />
        <Drawer.Screen name="My Bookings" component={MyBookingsScreen} />
        <Drawer.Screen name="About Us" component={AboutUsScreen} />
        <Drawer.Screen name="Services" component={ServicesScreen} />
        <Drawer.Screen name="Logout" component={LogoutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor: Colors.primaryBackground,
    padding: 20,
  },
});
*/
import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "./assets/colors";

import HomeScreen from "./screens/HomeScreen";
import BookEventScreen from "./screens/BookEventScreen";
import MyBookingsScreen from "./screens/MyBookingScreen";
import AboutUsScreen from "./screens/AboutScreen";
import ServicesScreen from "./screens/ServiceScreen";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const handleLogout = async () => {
    await AsyncStorage.clear();
    props.navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={{ flex: 1, paddingBottom: 20, backgroundColor: Colors.primaryBackground }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() =>
          Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
              { text: "Cancel", style: "cancel" },
              { text: "Logout", onPress: handleLogout },
            ],
            { cancelable: true }
          )
        }
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Book Events" component={BookEventScreen} />
      <Drawer.Screen name="My Bookings" component={MyBookingsScreen} />
      <Drawer.Screen name="About Us" component={AboutUsScreen} />
      <Drawer.Screen name="Services" component={ServicesScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: Colors.primaryText,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    color: Colors.primaryBackground,
    fontWeight: "bold",
    fontSize: 16,
  },
});
