import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet,
  Alert,
  ScrollView, } from "react-native";
import API from "../api";

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const handleSignup = async () => {
    try {
      const res = await API.post("/users/signup", { username, email, phone, password, address });
      console.log(res);
      if (res.data.status === "success") {
        Alert.alert("Success", "Account created! Please login.");
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", res.data.error);
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
 <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registration</Text>
      <Text style={styles.subtitle}>Fill in the details to register with S.A.J.B.</Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Phone"
        placeholderTextColor="#aaa"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        placeholder="Address"
        placeholderTextColor="#aaa"
        value={address}
        onChangeText={setAddress}
        style={[styles.input, { height: 80, textAlignVertical: "top" }]}
        multiline
      />

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace("Login")}>
        <Text style={styles.loginRedirect}>
          Already have an account? <Text style={styles.loginLink}>Login</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
      );
    }

      const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  signupButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  signupText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginRedirect: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  loginLink: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});
