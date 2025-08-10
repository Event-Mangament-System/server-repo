/* import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {
        // Intentionally minimal/empty as requested 
      }
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
 */
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../assets/colors';
import API from '../api';
import colors from '../assets/colors';
import { ScrollView } from 'react-native-gesture-handler';
// import EventStack from '../EventStack';

const { width } = Dimensions.get('window');

//Slider images
const images = [
  require('../assets/slider1.jpg'),
  require('../assets/slider2.jpg'),
  require('../assets/slider3.jpg'),
];

//SAJB Services images
const services = [
  { title: 'Wedding Planning', icon: require('../assets/Wedding.jpg'), desc: 'Creating your perfect day', route: 'WeddingBooking' },
  { title: 'Corporate Events', icon: require('../assets/Corporate.jpg'), desc: 'Professional & seamless', route: 'CorporatePartyScreen' },
  { title: 'Family Celebrations', icon: require('../assets/FamCelebration.jpg'), desc: 'Joyful moments together', route: 'FamilyCelebrationScreen' },
];

function ServicesSection() {
  /* return (
    <View style={styles.servicesContainer}>
      <Text style={styles.heading}>
        At SAJB we offer below services
      </Text>

      {services.map((item, i) => (
        <View key={i} style={styles.serviceBox}>``
          <Image source={item.icon} style={styles.serviceIcon} />
          <Text style={styles.serviceTitle}>{item.title}</Text>
          <Text style={styles.serviceDesc}>{item.desc}</Text>
        </View>
      ))}
    </View>
  ); */
  const navigation = useNavigation();

  return (
    <View style={styles.servicesContainer}>
      <Text style={styles.heading}>
        At SAJB we offer below services
      </Text>

      {services.map((item, i) => (
        <TouchableOpacity
          key={i}
          style={styles.serviceBox}
          // onPress={() => navigation.navigate("Book Events", {
          //   screen: item.route
          //   // params: { title: item.title }
          // })
          // }
        >
          <Image source={item.icon} style={styles.serviceIcon} />
          <Text style={styles.serviceTitle}>{item.title}</Text>
          <Text style={styles.serviceDesc}>{item.desc}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}


export default function HomeScreen() {
  const [username, setUsername] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const flatListRef = useRef(null);
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchFeedbacks();
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          setUsername(parsed.username || '');
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };
    fetchUser();
  }, []);

  // Single timer controlling both sliders
  useEffect(() => {
    if (feedbacks.length === 0) return;

    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % Math.max(feedbacks.length, images.length);
      setCurrentIndex(nextIndex);

      // Scroll testimonials
      flatListRef.current?.scrollToIndex({ index: nextIndex % feedbacks.length, animated: true });

      // Scroll image slider
      swiperRef.current?.scrollBy(1, true);
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex, feedbacks]);

  const fetchFeedbacks = async () => {
    try {
      const res = await API.get('/feedback/');
      setFeedbacks(res.data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const renderTestimonial = ({ item }) => (
    <View style={styles.testimonialCard}>
      <Text style={styles.testimonialText}>"{item.comment}"</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 4 }}>
        {[...Array(item.rating)].map((_, index) => (
          <Ionicons key={index} name="star" size={18} color="#FFD700" />
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.container}> */}
      <Text style={styles.motto}>
        Crafting unforgettable moments, one event at a time.
      </Text>
      {/* Top Header */}
      {/* <View style={styles.header}>
        <Text style={styles.greeting}>Hello {username}</Text>
        <Image
          source={require('../assets/user.png')}
          style={styles.profileImage}
        />
      </View> */}

      {/* Slider */}
      <View style={styles.sliderContainer}>
        <Swiper
          ref={swiperRef}
          loop
          showsPagination
          autoplay={false} // controlled manually
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          height={200}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              source={image}
              style={styles.slideImage}
              resizeMode="cover"
            />
          ))}
        </Swiper>
      </View>

      <ServicesSection />

      <Text style={styles.testimonialHeader}>What people say about us</Text>

      <View style={{ height: 160, marginBottom: 40 }}>
        <FlatList
          ref={flatListRef}
          data={feedbacks}
          renderItem={renderTestimonial}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToInterval={width - 50}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.primaryText,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: Colors.primaryText,
  },
  sliderContainer: {
    width: width - 40,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignSelf: 'center',
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },
  dot: {
    backgroundColor: '#ccc',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: Colors.primaryText,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  testimonialHeader: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: Colors.primaryText,
    // marginBottom: 40
  },
  testimonialCard: {
    width: width - 60,
    backgroundColor: colors.cardColor,
    borderRadius: 12,
    padding: 15,
    marginRight: 10,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.buttonBackground,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  testimonialText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#333',
    textAlign: 'center',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  serviceBox: {
    width: '45%',
    marginVertical: 10,
    alignItems: 'center',
  },
  serviceIcon: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  serviceTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: Colors.primaryText,
    marginBottom: 4,
  },
  serviceDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primaryText,
    marginBottom: 12,
    textAlign: 'center',
  },
  motto: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.primaryText,
    marginBottom: 20,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
