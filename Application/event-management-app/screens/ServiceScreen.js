/* import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ServicesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Services Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18 }
});
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../assets/colors';  // import your colors file

export default function ServicesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Services Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: Colors.primaryBackground,  // #fff6ea
    padding: 20,
  },
  text: { 
    fontSize: 18, 
    color: Colors.primaryText,  // #070707
  }
});
