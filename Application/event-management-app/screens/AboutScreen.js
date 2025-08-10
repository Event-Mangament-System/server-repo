/* import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AboutUsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About Us Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18 }
});

==============================================================
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../assets/colors';

export default function AboutUsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About Us Screen</Text>
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
*/

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Linking, 
  TouchableOpacity, 
  Image,
  ScrollView,
} from 'react-native';

// Social media icons (add your own images to assets folder)
const socialIcons = {
  twitter: require('../assets/twitter.png'),
  instagram: require('../assets/instagram.png'),
  facebook: require('../assets/facebook.png'),
  snapchat: require('../assets/snapchat (2).png'),
};

const socialLinks = {
  twitter: 'https://twitter.com/yourhandle',
  instagram: 'https://instagram.com/yourhandle',
  facebook: 'https://facebook.com/yourhandle',
  snapchat: 'https://snapchat.com/add/yourhandle',
};

const AboutUsScreen = () => {
  const handleOpenLink = (url) => {
    Linking.openURL(url).catch(() => alert('Failed to open link'));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>About SABJ Planners</Text>
      <Text style={styles.description}>
        At SABJ Planners, we believe that every moment deserves to be unforgettable. 
        Our passion is to craft beautiful, seamless events that bring your vision to life, 
        making memories that last a lifetime. With attention to detail and heartfelt dedication, 
        we transform celebrations into extraordinary experiences.
      </Text>

      <View style={styles.ratingSection}>
        <Text style={styles.ratingTitle}>Our Rating</Text>
        <View style={styles.starsContainer}>
          {[...Array(5)].map((_, i) => (
            <Text key={i} style={styles.star}>★</Text>
          ))}
        </View>
      </View>

      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Connect with us</Text>
        <View style={styles.socialIconsRow}>
          {Object.entries(socialIcons).map(([key, icon]) => (
            <TouchableOpacity 
              key={key} 
              onPress={() => handleOpenLink(socialLinks[key])}
              style={styles.iconTouchable}
              activeOpacity={0.7}
            >
              <Image source={icon} style={styles.socialIcon} />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.contactTitle, { marginTop: 30 }]}>Contact Us On</Text>
        <Text style={styles.phone}>📞 +91 98765 43210 (Mon-Sat, 9am - 7pm)</Text>
        <Text style={styles.phone}>📞 +91 91234 56789 (Sun, 10am - 5pm)</Text>
        <Text style={styles.email}>✉️ contact@sabjplanners.com</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: '#fff6ea',
    flexGrow: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 15,
    color: '#070707',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#070707',
    marginBottom: 30,
    textAlign: 'center',
  },
  ratingSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  ratingTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#070707',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 28,
    color: '#f5c518', // golden star color
    marginHorizontal: 4,
  },
  contactSection: {
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#070707',
    marginBottom: 15,
  },
  socialIconsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  iconTouchable: {
    marginHorizontal: 12,
  },
  socialIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  phone: {
    fontSize: 15,
    marginVertical: 3,
    color: '#070707',
  },
  email: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: '600',
    color: '#070707',
  },
});

export default AboutUsScreen;
