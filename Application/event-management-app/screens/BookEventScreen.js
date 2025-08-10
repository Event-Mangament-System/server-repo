/* import React, { useEffect } from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors";

const events = [
  {
    id: "1",
    name: "Wedding",
    image: require("../assets/slider1.jpg"),
    route: "WeddingBooking",
  },
  {
    id: "2",
    name: "Corporate Party",
    image: require("../assets/slider1.jpg"),
    route: "Corporate Party",
  },
  {
    id: "3",
    name: "Family Celebrations",
    image: require("../assets/slider1.jpg"),
    route: "FamilyBooking",
  },
];

export default function BookEventsScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: "Book Events",
      headerStyle: { backgroundColor: colors.primaryBackground },
      headerTintColor: colors.primaryText,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{ paddingHorizontal: 10 }}
        >
          <Ionicons name="menu" size={26} color={colors.primaryText} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
    >
      {events.map((event) => (
        <TouchableOpacity
          key={event.id}
          style={styles.card}
          onPress={() => navigation.navigate(event.route, { title: event.name })}
          activeOpacity={0.8}
        >
          <ImageBackground
            source={event.image}
            style={styles.image}
            imageStyle={{ borderRadius: 15 }}
          >
            <LinearGradient
              colors={["rgba(0,0,0,0.75)", "transparent"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            >
              <Text style={styles.text}>{event.name}</Text>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },
  container: {
    padding: 15,
  },
  card: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: "hidden",
    height: 150,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 20,
    borderRadius: 15,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.buttonText,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
 */


import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors";
import API from "../api";

//Images
const categoryImages = {
  Wedding: require("../assets/Wedding.jpg"),
  "Co-operate": require("../assets/Corporate.jpg"),
  "Family Celebration": require("../assets/FamCelebration.jpg"),
};

// Map category id or name to screen name for navigation
const categoryToRoute = {
  1: "WeddingBooking",
  2: "Corporate Party",
  3: "FamilyBooking",
};

export default function BookEventsScreen() {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: "Book Events",
      headerStyle: { backgroundColor: "#fff" },
      headerTintColor: colors.primaryText,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{ paddingHorizontal: 10 }}
        >
          <Ionicons name="menu" size={26} color={colors.primaryText} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await API.get("/event_categories");
        if (res.data.status === "success") {
          const fetchedEvents = res.data.data.map((event) => ({
            id: event.id.toString(),
            name: event.name,
            image:
              categoryImages[event.name] || require("../assets/slider1.jpg"),
          }));
          setEvents(fetchedEvents);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      } finally {
        setLoadingEvents(false);
      }
    }
    fetchEvents();
  }, []);

  /* const handleCategoryPress = (category) => {
    const routeName = categoryToRoute[parseInt(category.id)];
    if (routeName) {
      navigation.navigate(routeName, { title: category.name });
    } else {
      console.warn("No route defined for category", category.name);
    }
  }; */
  const handleCategoryPress = (category) => {
  const routeName = categoryToRoute[parseInt(category.id)];
  if (routeName) {
    navigation.navigate(routeName, { 
      title: category.name,
      categoryId: category.id,          // pass categoryId
      categoryName: category.name       // pass categoryName
    });
  } else {
    console.warn("No route defined for category", category.name);
  }
};

  if (loadingEvents) {
    return (
      <View
        style={[styles.screen, { justifyContent: "center", alignItems: "center" }]}
      >
        <ActivityIndicator size="large" color={colors.primaryText} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      {events.map((event) => (
        <TouchableOpacity
          key={event.id}
          style={styles.card}
          onPress={() => handleCategoryPress(event)}
          activeOpacity={0.8}
        >
          <ImageBackground
            source={event.image}
            style={styles.image}
            imageStyle={{ borderRadius: 15 }}
          >
            <LinearGradient
              colors={["rgba(0,0,0,0.75)", "transparent"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            >
              <Text style={styles.text}>{event.name}</Text>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },
  container: {
    padding: 15,
  },
  card: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: "hidden",
    height: 150,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 20,
    borderRadius: 15,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.buttonText,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
