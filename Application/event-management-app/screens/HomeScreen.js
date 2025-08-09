import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Intentionally minimal/empty as requested */}
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.sub}>Use the menu (top-left) to start booking events.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1, alignItems:'center', justifyContent:'center', padding:20, backgroundColor:'#fff'
  },
  title: { fontSize:24, fontWeight:'700', marginBottom:8 },
  sub: { fontSize:14, color:'#666', textAlign:'center' }
});
