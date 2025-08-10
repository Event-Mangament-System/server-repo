/* import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Dimensions, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import API from '../api';

const { width } = Dimensions.get('window');

export default function FeedbackScreen() {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [feedbacks, setFeedbacks] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        getUserId();
        fetchFeedbacks();
    }, []);

    const getUserId = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                const parsedUser = JSON.parse(userData);
                setUserId(parsedUser.id);
            }
        } catch (error) {
            console.error('Error getting user:', error);
        }
    };

    const fetchFeedbacks = async () => {
        try {
            //   const res = await axios.get('http://localhost:5000/feedback/');
            const res = await API.get('/feedback/')
            setFeedbacks(res.data);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    const submitFeedback = async () => {
        if (!rating || !comment.trim()) {
            Alert.alert('Please provide both rating and comment.');
            return;
        }
        try {
            const feedbackData = {
                user_id: userId,
                rating,
                comment
            };

            const res = await API.post('/feedback', feedbackData);

            Alert.alert('Thank you for your feedback!');
            setRating(0);
            setComment('');
            fetchFeedbacks();
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    const renderStars = () => {
        return (
            <View style={styles.starContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => setRating(star)}>
                        <Ionicons
                            name={star <= rating ? 'star' : 'star-outline'}
                            size={28}
                            color={star <= rating ? '#FFD700' : '#ccc'}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        );
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
            <Text style={styles.headerText}>We value your opinion! 🌟</Text>
            <Text style={styles.subText}>
                Your feedback helps us improve and serve you better. Please take a moment to share your thoughts.
            </Text>

            {renderStars()}

            <TextInput
                style={styles.input}
                placeholder="Write your feedback here..."
                value={comment}
                onChangeText={setComment}
                multiline
            />

            <TouchableOpacity style={styles.button} onPress={submitFeedback}>
                <Text style={styles.buttonText}>Submit Feedback</Text>
            </TouchableOpacity>

            <Text style={styles.testimonialHeader}>What people say about us</Text>
            <FlatList
                data={feedbacks}
                renderItem={renderTestimonial}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToInterval={width - 40}
                decelerationRate="fast"
                contentContainerStyle={{ paddingHorizontal: 10 }}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
    },
    subText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#666',
        marginBottom: 15,
    },
    starContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        minHeight: 80,
        textAlignVertical: 'top',
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    testimonialHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    testimonialCard: {
        width: width - 60,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        padding: 15,
        marginRight: 10,
        alignItems: 'center',
        shadowColor: '#000',
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
});
 */

import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Dimensions, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import API from '../api';
import colors from '../assets/colors';

const { width } = Dimensions.get('window');

export default function FeedbackScreen() {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [feedbacks, setFeedbacks] = useState([]);
    const [userId, setUserId] = useState(null);

    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        getUserId();
        fetchFeedbacks();
    }, []);

    // Auto-slide testimonials
    useEffect(() => {
        if (feedbacks.length === 0) return;

        const timer = setInterval(() => {
            const nextIndex = (currentIndex + 1) % feedbacks.length;
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
            setCurrentIndex(nextIndex);
        }, 3000); // slide every 3 sec

        return () => clearInterval(timer);
    }, [currentIndex, feedbacks]);

    const getUserId = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                const parsedUser = JSON.parse(userData);
                setUserId(parsedUser.id);
            }
        } catch (error) {
            console.error('Error getting user:', error);
        }
    };

    const fetchFeedbacks = async () => {
        try {
            const res = await API.get('/feedback/');
            setFeedbacks(res.data);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    const submitFeedback = async () => {
        if (!rating || !comment.trim()) {
            Alert.alert('Please provide both rating and comment.');
            return;
        }
        try {
            const feedbackData = {
                user_id: userId,
                rating,
                comment
            };

            await API.post('/feedback', feedbackData);

            Alert.alert('Thank you for your feedback!');
            setRating(0);
            setComment('');
            fetchFeedbacks();
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    const renderStars = () => (
        <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                    <Ionicons
                        name={star <= rating ? 'star' : 'star-outline'}
                        size={28}
                        color={star <= rating ? '#FFD700' : '#ccc'}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );

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
            <Text style={styles.headerText}>We value your opinion! 🌟</Text>
            <Text style={styles.subText}>
                Your feedback helps us improve and serve you better. Please take a moment to share your thoughts.
            </Text>

            {renderStars()}

            <TextInput
                style={styles.input}
                placeholder="Write your feedback here..."
                value={comment}
                onChangeText={setComment}
                multiline
            />

            <TouchableOpacity style={styles.button} onPress={submitFeedback}>
                <Text style={styles.buttonText}>Submit Feedback</Text>
            </TouchableOpacity>

            <Text style={styles.testimonialHeader}>What people say about us</Text>
            <FlatList
                ref={flatListRef}
                data={feedbacks}
                renderItem={renderTestimonial}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToInterval={width - 40}
                decelerationRate="fast"
                contentContainerStyle={{ paddingHorizontal: 10 }}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryBackground,
        padding: 15,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
    },
    subText: {
        fontSize: 14,
        textAlign: 'center',
        color: colors.primaryText,
        marginBottom: 15,
    },
    starContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    input: {
        borderColor: colors.inputBorder,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        minHeight: 80,
        textAlignVertical: 'top',
        marginBottom: 15,
    },
    button: {
        backgroundColor: colors.buttonBackground,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: colors.buttonText,
        fontSize: 16,
    },
    testimonialHeader: {
        paddingTop: 30,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    testimonialCard: {
        width: width - 60,
        backgroundColor: colors.cardColor,
        borderRadius: 12,
        padding: 15,
        marginRight: 10,
        alignItems: 'center',
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
});
