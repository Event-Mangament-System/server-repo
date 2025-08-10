 import AsyncStorage from '@react-native-async-storage/async-storage';
 import React, { useEffect, useState, useMemo } from "react";
 import {
   View,
   Text,
   StyleSheet,
   FlatList,
   TouchableOpacity,
   ActivityIndicator,
   Alert,
   ScrollView,
 } from "react-native";
 import API from "../api";
 import { Card } from "react-native-paper";
 import { AntDesign } from "@expo/vector-icons";
 import CheckBox from "expo-checkbox";
 import Colors from "../assets/colors";
 import { Ionicons } from "@expo/vector-icons";
 
 export default function WeddingScreen({ route, navigation }) {
   const { categoryId, categoryName } = route.params;
   const [loading, setLoading] = useState(true);
   const [subCategories, setSubCategories] = useState([]);
   const [services, setServices] = useState([]);
   const [expanded, setExpanded] = useState({});
   const [selectedServices, setSelectedServices] = useState({});
   const [bookingLoading, setBookingLoading] = useState(false);
 
   useEffect(() => {
     navigation.setOptions({
       title: categoryName || "Category",
       headerStyle: { backgroundColor: "#fff" },
       headerTintColor: Colors.primaryText,
       headerLeft: () => (
         <TouchableOpacity
           onPress={() => navigation.goBack()}
           style={{ paddingHorizontal: 10 }}
         >
           <Ionicons name="arrow-back" size={24} color={Colors.primaryText} />
         </TouchableOpacity>
       ),
     });
 
     async function fetchData() {
       try {
        //  console.log("Category id is", categoryId)
         const [subsRes, servicesRes] = await Promise.all([
           API.get(`/event_subcategories/category/${categoryId}`),
           API.get("/services/service-types"),
         ]);
 
         if (subsRes.data.status === "success") {
           setSubCategories(subsRes.data.data);
         } else {
           setSubCategories([]);
         }
 
         if (servicesRes.data) {
           setServices(servicesRes.data);
         } else {
           setServices([]);
         }
       } catch (err) {
         console.error("Error fetching data:", err);
         setSubCategories([]);
         setServices([]);
       } finally {
         setLoading(false);
       }
     }
     fetchData();
   }, [categoryId]);
 
   const toggleExpand = (id) => {
     setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
   };
 
   const toggleServiceSelection = (subCatId, serviceId) => {
     const key = `${subCatId}-${serviceId}`;
     setSelectedServices((prev) => ({
       ...prev,
       [key]: !prev[key],
     }));
   };
 
   // Group services by service_name
   const groupedServices = useMemo(() => {
     const group = {};
     services.forEach((svc) => {
       if (!group[svc.service_name]) group[svc.service_name] = [];
       group[svc.service_name].push(svc);
     });
     return group;
   }, [services]);
 
   // Calculate total price for each subcategory = base price + selected services in that subcategory
   const subCategoryTotals = useMemo(() => {
     const totals = {};
     subCategories.forEach((sub) => {
       let total = Number(sub.price) || 0;
       Object.entries(selectedServices).forEach(([key, selected]) => {
         if (selected && key.startsWith(`${sub.id}-`)) {
           const serviceId = Number(key.split("-")[1]);
           const svc = services.find((s) => s.id === serviceId);
           if (svc) total += Number(svc.price) || 0;
         }
       });
       totals[sub.id] = total;
     });
     return totals;
   }, [selectedServices, subCategories, services]);
 
 
   const handleBookEvent = async () => {
     try {
       setBookingLoading(true);
       // Get logged-in user id from AsyncStorage
       const userData = await AsyncStorage.getItem('user');
       if (!userData) {
         Alert.alert('Error', 'User not logged in.');
         setBookingLoading(false);
         return;
       }
       const user = JSON.parse(userData);
       const user_id = user.id;  // adjust if your user object structure differs
 
       // Prepare booking payload with only user_id
       const bookingData = { user_id };
 
       const res = await API.post('/booking', bookingData);
 
       console.log("res is : ",res,"\nand res data is: ", res.data);
       console.log("\n\n\ status is", res.data.status)
       if (res.data.status === "success") {
         Alert.alert('Success', 'Booking successful!');
         // navigation.navigate('MyBookings'); // your booking list screen
         navigation.goBack();
       } else {
         Alert.alert('Booking', res.data.message || 'Booking failed.');
       }
     } catch (error) {
       console.error('Booking error:', error);
       Alert.alert('Error', error.response?.data?.message || error.message || 'Something went wrong');
     } finally {
       setBookingLoading(false);
     }
   };
 
   if (loading) {
     return (
       <View style={styles.loader}>
         <ActivityIndicator size="large" color={Colors.primaryText} />
       </View>
     );
   }
 
   return (
     <View style={styles.screen}>
       <FlatList
         data={subCategories}
         keyExtractor={(item) => item.id.toString()}
         contentContainerStyle={{ paddingBottom: 100 }}
         renderItem={({ item }) => (
           <Card style={styles.card}>
             <TouchableOpacity
               style={styles.header}
               onPress={() => toggleExpand(item.id)}
             >
               <Text style={styles.title}>{item.sub_category}</Text>
               <Text style={styles.basePrice}>Base: ₹{Number(item.price).toLocaleString("en-IN")}</Text>
               <AntDesign
                 name={expanded[item.id] ? "minus" : "plus"}
                 size={20}
                 color={Colors.primaryText}
               />
             </TouchableOpacity>
 
             {expanded[item.id] &&
               Object.entries(groupedServices).map(([groupName, svcList]) => (
                 <View key={groupName} style={styles.serviceBlock}>
                   <Text style={styles.serviceName}>{groupName}</Text>
                   {svcList.map((svc) => {
                     const isChecked = selectedServices[`${item.id}-${svc.id}`] || false;
                     return (
                       <View key={svc.id} style={styles.subServiceRow}>
                         <CheckBox
                           value={isChecked}
                           onValueChange={() => toggleServiceSelection(item.id, svc.id)}
                           color={Colors.buttonBackground}
                         />
                         <Text style={styles.subServiceText}>
                           {svc.service_type_name} - ₹{Number(svc.price).toLocaleString("en-IN")}
                         </Text>
                       </View>
                     );
                   })}
                 </View>
               ))}
             {expanded[item.id] && (
               <View style={styles.subTotal}>
                 <Text style={styles.subTotalText}>
                   Total for {item.sub_category}: ₹{subCategoryTotals[item.id].toLocaleString("en-IN")}
                 </Text>
               </View>
             )}
           </Card>
         )}
       />
 
       <View style={styles.bottomBar}>
         <Text style={styles.totalText}>
           Grand Total: ₹
           {Object.values(subCategoryTotals)
             .reduce((acc, val) => acc + val, 0)
             .toLocaleString("en-IN")}
         </Text>
          <TouchableOpacity
           style={[styles.bookButton, bookingLoading && { opacity: 0.6 }]}
           onPress={handleBookEvent}
           disabled={bookingLoading}
         >
           <Text style={styles.bookButtonText}>
             {bookingLoading ? 'Booking...' : 'Book Now'}
           </Text>
         </TouchableOpacity>
       </View>
     </View>
   );
 }
 
 const styles = StyleSheet.create({
   screen: { flex: 1, backgroundColor: Colors.primaryBackground },
   loader: { flex: 1, justifyContent: "center", alignItems: "center" },
   card: {
     margin: 10,
     padding: 10,
     backgroundColor: Colors.cardColor,
     borderRadius: 10,
     elevation: 2,
   },
   header: {
     flexDirection: "row",
     justifyContent: "space-between",
     alignItems: "center",
   },
   title: {
     fontSize: 18,
     fontWeight: "bold",
     color: Colors.primaryText,
     flex: 1,
   },
   basePrice: {
     marginRight: 10,
     fontWeight: "bold",
     color: Colors.secondaryText,
   },
   serviceBlock: {
     marginVertical: 6,
     paddingLeft: 10,
   },
   serviceName: {
     fontWeight: "bold",
     marginVertical: 4,
     color: Colors.secondaryText,
   },
   subServiceRow: {
     flexDirection: "row",
     alignItems: "center",
     paddingVertical: 2,
   },
   subServiceText: {
     marginLeft: 8,
     color: Colors.primaryText,
   },
   subTotal: {
     paddingTop: 10,
     borderTopWidth: 1,
     borderTopColor: "#ccc",
   },
   subTotalText: {
     fontWeight: "bold",
     color: Colors.primaryText,
   },
   bottomBar: {
     position: "absolute",
     bottom: 0,
     left: 0,
     right: 0,
     backgroundColor: "#fff",
     flexDirection: "row",
     alignItems: "center",
     justifyContent: "space-between",
     padding: 15,
     borderTopWidth: 1,
     borderColor: "#ccc",
   },
   totalText: {
     fontWeight: "bold",
     fontSize: 16,
     color: Colors.primaryText,
   },
   bookButton: {
     backgroundColor: Colors.buttonBackground,
     paddingHorizontal: 15,
     paddingVertical: 10,
     borderRadius: 8,
   },
   bookButtonText: {
     color: "#fff",
     fontWeight: "bold",
   },
 });
 
 
 