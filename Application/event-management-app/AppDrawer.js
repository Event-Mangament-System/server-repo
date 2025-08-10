import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "./screens/HomeScreen";
import BookEventScreen from "./screens/BookEventScreen";
import MyBookingsScreen from "./screens/MyBookingScreen";
import AboutUsScreen from "./screens/AboutScreen";
import ServicesScreen from "./screens/ServiceScreen";
import EventStack from "./EventStack";
import FeedbackScreen from "./screens/FeedbackScreen";

import CustomDrawerContent from "./CustomDrawerContent"; // Custom drawer with logout button
import CorporatePartyScreen from "./screens/CorporatePartyScreen";

const Drawer = createDrawerNavigator();

export default function AppDrawer({ setUserToken }) {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      // screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} setUserToken={setUserToken} />}
    >

      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen
        name="Book Events"
        component={EventStack}
        options={{ headerShown: false }} // ✅ hide Drawer header for this route
      />
      {/* <Drawer.Screen name="Services" component={ServicesScreen} /> */}
      <Drawer.Screen name="My Bookings" component={MyBookingsScreen} />
      <Drawer.Screen name="Feedback" component={FeedbackScreen} />
      <Drawer.Screen name="About Us" component={AboutUsScreen} />
    </Drawer.Navigator>
  );
}
