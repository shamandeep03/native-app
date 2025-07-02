// import {
//   StyleSheet,
//   Image,
//   View,
//   TouchableOpacity,
//   Text,
//   ScrollView,
//   ActivityIndicator,
// } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Add_To_Cart = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const item = route.params?.item;

//   const [loading, setLoading] = useState(false);
//   const [createdBy, setCreatedBy] = useState(null);
//   const [addressId, setAddressId] = useState(null);

//   useEffect(() => {
//     const fetchUserIdAndAddress = async () => {
//       try {
//         const userId = await AsyncStorage.getItem('userId');
//         if (userId) {
//           const parsedId = Number(userId);
//           setCreatedBy(parsedId);

//           const res = await fetch(`http://product.sash.co.in/api/Address/${parsedId}`);
//           const addresses = await res.json();

//           if (addresses && addresses.length > 0) {
//             setAddressId(addresses[0].id);
//           } else {
//             alert('No address found for this user!');
//           }
//         } else {
//           alert('User not logged in!');
//         }
//       } catch (err) {
//         console.error(err);
//         alert('Error fetching user or address data!');
//       }
//     };

//     fetchUserIdAndAddress();
//   }, []);

//   const handleAddToCart = async () => {
//     if (!item?.id || !createdBy || !addressId) {
//       alert('Missing required fields!');
//       return;
//     }

//     setLoading(true);
//     const now = new Date().toISOString();

//     const payload = {
//       id: 0,
//       vendorProductId: item.id,
//       createdBy: createdBy,
//       addressId: addressId,
//       count: 1,
//       createdDateTime: now,
//       modifiedBy: createdBy,
//       modifiedDateTime: now,
//     };

//     try {
//       const response = await fetch('http://product.sash.co.in/api/Cart', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         alert('Item added to cart!');
//         navigation.navigate('My_Cart');
//       } else {
//         alert('Failed to add item to cart.');
//       }
//     } catch (error) {
//       alert('Something went wrong.');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView style={{ backgroundColor: '#f8f9fa', flex: 1 }}>
//       <MaterialCommunityIcons
//         name="arrow-left-thick"
//         size={25}
//         style={styles.icon}
//         onPress={() => navigation.goBack()}
//       />

//       <Image style={styles.image} source={{ uri: item?.imageUrl }} />

//       <Text style={styles.FoodName}>{item?.name || 'No Name'}</Text>
//       <Text style={styles.FoodPrice}>Price: ₹{item?.price ?? '--'}</Text>
//       <Text style={styles.FoodOffer}>GST: {item?.gst ?? '--'}%</Text>

//       <View style={styles.divider} />
//       <Text style={styles.text3}>
//         Note: For multicolor products, please check the image for color details before purchasing.
//       </Text>

//       <View style={styles.buttonRow}>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={handleAddToCart}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator size="small" color="#413BD9" />
//           ) : (
//             <Text style={styles.buttontext}>Add To Cart</Text>
//           )}
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.button2}>
//           <Text style={styles.buttontext2}>Buy Now</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   icon: { fontSize: 30, marginTop: 10, marginLeft: 20, color: 'black' },
//   image: {
//     alignSelf: 'center',
//     width: 300,
//     height: 300,
//     borderRadius: 20,
//     marginBottom: 10,
//     backgroundColor: '#eee',
//   },
//   FoodName: {
//     alignSelf: 'center',
//     fontSize: 28,
//     fontWeight: '600',
//     marginVertical: 4,
//     textAlign: 'center',
//   },
//   FoodPrice: {
//     fontSize: 23,
//     fontWeight: '600',
//     marginLeft: 20,
//     marginTop: 5,
//     color: '#333',
//   },
//   FoodOffer: {
//     fontSize: 20,
//     fontWeight: '600',
//     marginLeft: 20,
//     marginTop: 5,
//     color: '#7DEA10',
//   },
//   divider: {
//     width: '100%',
//     backgroundColor: '#EFEFEF',
//     height: 10,
//     marginVertical: 10,
//   },
//   text3: {
//     fontSize: 11,
//     alignSelf: 'center',
//     fontWeight: '500',
//     lineHeight: 15,
//     width: 300,
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginHorizontal: 30,
//     marginTop: 30,
//     marginBottom: 30,
//   },
//   button: {
//     width: 150,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: 'black',
//     borderRadius: 10,
//   },
//   buttontext: {
//     fontSize: 20,
//     color: '#413BD9',
//     fontWeight: '700',
//   },
//   button2: {
//     width: 150,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#413BD9',
//     borderWidth: 1,
//     borderColor: 'black',
//     borderRadius: 10,
//   },
//   buttontext2: {
//     fontSize: 20,
//     color: 'white',
//     fontWeight: '700',
//   },
// });

// export default Add_To_Cart;
