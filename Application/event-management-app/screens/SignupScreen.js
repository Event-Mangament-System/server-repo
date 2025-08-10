/* import React, { useState } from "react";
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
 */
import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Alert, ScrollView
} from "react-native";
import API from "../api";
import Colors from "../assets/colors";  // import colors

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^[0-9]{10}$/; // 10 digits
    return regex.test(phone);
  };


  const handleSignup = async () => {
    if (!username || !email || !phone || !password || !address) {
      Alert.alert("Validation Error", "Please fill all the fields.");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }
    if (!validatePhone(phone)) {
      Alert.alert("Validation Error", "Please enter a valid 10-digit phone number.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Validation Error", "Password must be at least 6 characters long.");
      return;
    }

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
        placeholderTextColor={Colors.placeholderText}
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor={Colors.placeholderText}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Phone"
        placeholderTextColor={Colors.placeholderText}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor={Colors.placeholderText}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        placeholder="Address"
        placeholderTextColor={Colors.placeholderText}
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
    backgroundColor: Colors.primaryBackground,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.primaryText,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.secondaryText,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: Colors.inputBackground,
    color: Colors.primaryText,
  },
  signupButton: {
    backgroundColor: Colors.buttonBackground,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  signupText: {
    color: Colors.buttonText,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginRedirect: {
    fontSize: 14,
    color: Colors.secondaryText,
    textAlign: "center",
  },
  loginLink: {
    color: Colors.buttonBackground,
    fontWeight: "bold",
  },
});
