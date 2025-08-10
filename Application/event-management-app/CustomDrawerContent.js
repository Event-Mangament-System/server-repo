import React from "react";
import { View, TouchableOpacity, Text, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import Colors from "./assets/colors";

export default function CustomDrawerContent(props) {
  const { setUserToken } = props;

  const handleLogout = async () => {
    await AsyncStorage.clear();
    setUserToken(null);  // This triggers UI to switch to login stack
  };

  return (
    <View style={{ flex: 1, paddingBottom: 20, backgroundColor: Colors.primaryBackground }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
              { text: "Cancel", style: "cancel" },
              { text: "Logout", onPress: handleLogout },
            ],
            { cancelable: true }
          );
        }}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
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
