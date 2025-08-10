/* import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BookEventScreen from "./screens/BookEventScreen";
import CorporatePartyScreen from "./screens/CorporatePartyScreen";

const Stack = createStackNavigator();

export default function EventStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BookEventScreen" component={BookEventScreen} />
      <Stack.Screen name="Corporate Party" component={CorporatePartyScreen} />
    </Stack.Navigator>
  );
}
 */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BookEventScreen from "./screens/BookEventScreen";
import CorporatePartyScreen from "./screens/CorporatePartyScreen";
import WeddingScreen from "./screens/WeddingScreen";
import FamilyCelebrationScreen from "./screens/FamilyCelebrationScreen";

const Stack = createStackNavigator();

export default function EventStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BookEvents"
        component={BookEventScreen}
        options={{ title: "Book Events" }}
      />
      <Stack.Screen
        name="Corporate Party"
        component={CorporatePartyScreen}
        options={({ route }) => ({
          title: route.params?.title || "Corporate Party", // ✅ dynamic
        })}
      />
      <Stack.Screen
        name="WeddingBooking"
        component={WeddingScreen}
        options={({ route }) => ({
          title: route.params?.title || "Wedding",
        })}
      />
      <Stack.Screen
        name="FamilyBooking"
        component={FamilyCelebrationScreen}
        options={({ route }) => ({
          title: route.params?.title || "Family Celebrations",
        })}
      />
    </Stack.Navigator>
  );
}
