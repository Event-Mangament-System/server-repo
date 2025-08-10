import React, { useEffect, useState } from "react";
import API from "../api";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import colors from "../assets/colors";

export default function MyBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      // Get user from storage
      const storedUser = await AsyncStorage.getItem("user");
      if (!storedUser) {
        console.warn("No user found in storage");
        setLoading(false);
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      const userId = parsedUser.id; // use user.id

      // const res = await axios.get(
      //   `http://localhost:5000/booking/byuser/${userId}`
      // );
      // console.log(userId);
      const res = await API.get(`booking/byuser/${userId}`);

      // console.log(res);
      if (res.data.status === "success") {
        setBookings(res.data.data);
      } else {
        console.warn("Failed to fetch bookings:", res.data.message);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderBooking = ({ item }) => {
    const date = new Date(item.booking_date).toLocaleDateString();
    return (
      <View style={styles.card}>
        <Text style={styles.text}>Booking ID: {item.id}</Text>
        <Text style={styles.text}>Date: {date}</Text>
        <Text style={styles.status}>Status: {item.status}</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>My Bookings</Text> */}
      {bookings.length === 0 ? (
        <Text style={styles.noData}>No bookings found</Text>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBooking}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.primaryBackground },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  card: {
    padding: 15,
    backgroundColor: colors.cardColor,
    marginBottom: 10,
    borderRadius: 8,
  },
  text: { fontSize: 16 },
  status: { fontSize: 16, color: "green" },
  noData: { fontSize: 16, textAlign: "center", marginTop: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
