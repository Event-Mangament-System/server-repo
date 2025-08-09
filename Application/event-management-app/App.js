// App.js
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator, StyleSheet } from "react-native";


// Screens
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import BookEventScreen from "./screens/BookEventScreen";
import ServicesScreen from "./screens/ServiceScreen";
import AboutUsScreen from "./screens/AboutScreen";
import MyBookingsScreen from "./screens/MyBookingScreen";
import { navigationRef } from "./screens/Navigationref";

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

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AppDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
      <Drawer.Screen name="Book Events" component={BookEventScreen} />
      <Drawer.Screen name="My Bookings" component={MyBookingsScreen} />
      <Drawer.Screen name="About Us" component={AboutUsScreen} />
      <Drawer.Screen name="Services" component={ServicesScreen} />
      {/* <Drawer.Screen name="Profile" component={ProfileScreen} /> */}
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.log("Error checking login:", err);
      } finally {
        setIsLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
/* 
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="AppDrawer" component={AppDrawer} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="AppDrawer" component={AppDrawer} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
 =====================================
return (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="AppDrawer" component={AppDrawer} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  </NavigationContainer>
);
*/
return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : null}

        {/* Main app drawer */}
        <Stack.Screen name="AppDrawer" component={AppDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
