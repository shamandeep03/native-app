// import {
//   StyleSheet,
//   Image,
//   View,
//   TouchableOpacity,
//   Text,
//   ScrollView,
// } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { useNavigation, useRoute } from '@react-navigation/native';

// const Add_To_Cart = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const item = route.params?.item;

//   const [address, setAddress] = useState(null);
//   const [user, setUser] = useState(null);
//   const [vendorProduct, setVendorProduct] = useState(null);

//   useEffect(() => {
//     console.log('🛒 Item received from navigation:', item);

//     const fetchAddress = async () => {
//       try {
//         const response = await fetch('http://product.sash.co.in/api/Address');
//         const data = await response.json();
//         if (response.ok) {
//           const primaryAddress = data.find(addr => addr.isPrimary) || data[0];
//           setAddress(primaryAddress);
//         } else {
//           console.error('Failed to fetch address:', data);
//           alert('Failed to fetch address.');
//         }
//       } catch (error) {
//         console.error('Error fetching address:', error);
//         alert('Error fetching address.');
//       }
//     };

//     const fetchUser = async () => {
//       try {
//         const response = await fetch('http://product.sash.co.in/api/User');
//         const data = await response.json();
//         if (response.ok) {
//           setUser(Array.isArray(data) ? data[0] : data);
//         } else {
//           console.error('Failed to fetch user:', data);
//           alert('Failed to fetch user.');
//         }
//       } catch (error) {
//         console.error('Error fetching user:', error);
//         alert('Error fetching user.');
//       }
//     };

//     const fetchVendorProduct = async () => {
//       debugger
//       try {
//         const response = await fetch('http://product.sash.co.in/api/VendorProduct');
//         const data = await response.json();

//         console.log('✅ VendorProduct API Data:', data);
//         console.log('🔍 Looking for productId:', item?.id);

//         if (response.ok) {
//           const matched = data.find(vp => Number(vp.productId) === Number(item?.id));

//           if (matched) {
//             console.log('✅ Matched Vendor Product:', matched);
//             setVendorProduct(matched);
//           } else {
//             console.warn(`⚠️ No match found for productId: ${item?.id}`);
//             setVendorProduct(null);
//             alert('Vendor product not found for this item.');
//           }
//         } else {
//           console.error('❌ Failed to fetch vendor product:', data);
//           alert('Failed to fetch vendor product.');
//         }
//       } catch (error) {
//         console.error('🚨 Error fetching vendor product:', error);
//         alert('Error fetching vendor product.');
//       }
//     };

//     fetchAddress();
//     fetchUser();
//     fetchVendorProduct();
//   }, [item]);

//   // const handleAddToCart = async () => {
//   //   debugger
//   //   // if (!address || !user || !vendorProduct) {
//   //   //   alert('Please ensure address, user, and vendor product data are available.');
//   //   //   return;
//   //   // }

//   //   const now = new Date().toISOString();
//   //   debugger
//   //   const payload = {
//   //     vendorProductId: vendorProduct?.productId, // ✅ Eh line thik kar
//   //     createdBy: user?.id || 'user',
//   //     addressId: address?.id,
//   //     count: item?.count || 1,
//   //     createdDateTime: now,
//   //     modifiedBy: user?.id || 'user',
//   //     modifiedDateTime: now,
//   //   };
//   //   console.log(" Cart API nu bhejya gaya payload:", payload);


//   //   try {
//   //     debugger
//   //     const response = await fetch('http://product.sash.co.in/api/Cart', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify(payload),
//   //     });

//   //     const data = await response.json();

//   //     if (response.ok) {
//   //       alert('Item successfully added to cart!');
//   //       navigation.navigate('My_Cart', { item });
//   //     } else {
//   //       console.error('Failed to add to cart:', data);
//   //       alert('Failed to add item to cart.');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error posting to cart API:', error);
//   //     alert('Something went wrong. Please try again.');
//   //   }
//   // };
//   const handleAddToCart = async () => {
//     debugger;
  
//     const now = new Date().toISOString();
//   debugger
//     const payload = {
//       vendorProductId: vendorProduct?.id, // ✅ Corrected here
//       createdBy: user?.id || 'user',
//       addressId: address?.id,
//       count: item?.count || 1,
//       createdDateTime: now,
//       modifiedBy: user?.id || 'user',
//       modifiedDateTime: now,
//     };
  
//     console.log("🛒 Cart API nu bhejya gaya payload:", payload);
  
//     try {
//       const response = await fetch('http://product.sash.co.in/api/Cart', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         alert('Item successfully added to cart!');
//         navigation.navigate('My_Cart', { item });
//       } else {
//         console.error('❌ Failed to add to cart:', data);
//         alert('Failed to add item to cart.');
//       }
//     } catch (error) {
//       console.error('🚨 Error posting to cart API:', error);
//       alert('Something went wrong. Please try again.');
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

//       <Image style={styles.image} source={{ uri: item?.title }} />

//       <Text style={styles.FoodName}>{item?.Name}</Text>
//       <Text style={styles.FoodPrice}>{item?.Price}</Text>
//       <Text style={styles.FoodOffer}>{item?.Offer}</Text>
//       <Text style={styles.FoodFree}>{item?.Free}</Text>
//       <Text style={styles.FoodNow}>{item?.TreadingNow}</Text>

//       <View style={styles.divider} />

//       <View style={styles.SecondContainer}>
//         <Text style={styles.text}>
//           Apply cashback coupon for instant{' '}
//           <TouchableOpacity onPress={() => navigation.navigate('Card')}>
//             <Text style={styles.applyText}>Apply</Text>
//           </TouchableOpacity>
//         </Text>
//         <Text style={styles.text2}>savings</Text>
//       </View>

//       <View style={styles.infoCircle}>
//         <Text style={styles.exclamation}>!</Text>
//       </View>

//       <Text style={styles.text3}>
//         Note: For multicolor products, please check the image for color details before purchasing.
//       </Text>

//       <View style={styles.buttonRow}>
//         <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
//           <Text style={styles.buttontext}>Add To Cart</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.button2}>
//           <Text style={styles.buttontext2}>Buy Now</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   icon: {
//     fontSize: 30,
//     marginTop: 10,
//     marginLeft: 20,
//     color: 'black',
//   },
//   image: {
//     alignSelf: 'center',
//     width: 300,
//     height: 300,
//     borderRadius: 20,
//     marginBottom: 10,
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
//   },
//   FoodOffer: {
//     fontSize: 20,
//     fontWeight: '600',
//     marginLeft: 20,
//     marginTop: 5,
//     color: '#7DEA10',
//   },
//   FoodFree: {
//     fontSize: 20,
//     fontWeight: '600',
//     marginLeft: 20,
//     marginTop: 5,
//     color: '#413BD9',
//   },
//   FoodNow: {
//     fontSize: 18,
//     fontWeight: '300',
//     alignSelf: 'flex-end',
//     marginRight: 20,
//     marginTop: -10,
//     color: '#E316C1',
//   },
//   divider: {
//     width: '100%',
//     backgroundColor: '#EFEFEF',
//     height: 10,
//     marginVertical: 10,
//   },
//   SecondContainer: {
//     backgroundColor: '#b1FFBF',
//     marginHorizontal: 15,
//     borderRadius: 10,
//     padding: 10,
//   },
//   text: {
//     fontWeight: '500',
//     fontSize: 14,
//   },
//   applyText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#413BD9',
//     marginLeft: 10,
//   },
//   text2: {
//     marginTop: 4,
//     marginLeft: 10,
//     fontWeight: '500',
//   },
//   infoCircle: {
//     backgroundColor: '#FFCB49',
//     height: 20,
//     width: 20,
//     borderRadius: 100,
//     marginLeft: 40,
//     marginTop: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   exclamation: {
//     fontSize: 15,
//     fontWeight: '800',
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
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Add_To_Cart = () => {
  const navigation = useNavigation();

  const item = {
    id: 1234,
    Name: 'Static Burger',
    Price: '99',
    Offer: '20% OFF',
    Free: 'Free Delivery',
    TreadingNow: 'Trending Now!',
    title: 'https://i.imgur.com/5Aqgz7o.png',
    count: 1,
  };

  const handleAddToCart = async () => {
    try {
      const existingCart = await AsyncStorage.getItem('cart');
      const cartItems = existingCart ? JSON.parse(existingCart) : [];

      // Check if item already exists (by id)
      const itemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);

      if (itemIndex >= 0) {
        // If exists, increment count
        cartItems[itemIndex].count += 1;
      } else {
        // Else add new item
        cartItems.push(item);
      }

      await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
      Alert.alert('Success', 'Item added to cart!');
      navigation.navigate('My_Cart');
    } catch (error) {
      console.error('Error saving to cart:', error);
      Alert.alert('Error', 'Something went wrong!');
    }
  };

  return (
    <ScrollView style={{ backgroundColor: '#f8f9fa', flex: 1 }}>
      <MaterialCommunityIcons
        name="arrow-left-thick"
        size={25}
        style={styles.icon}
        onPress={() => navigation.goBack()}
      />

      <Image style={styles.image} source={{ uri: item.title }} />

      <Text style={styles.FoodName}>{item.Name}</Text>
      <Text style={styles.FoodPrice}>₹{item.Price}</Text>
      <Text style={styles.FoodOffer}>{item.Offer}</Text>
      <Text style={styles.FoodFree}>{item.Free}</Text>
      <Text style={styles.FoodNow}>{item.TreadingNow}</Text>

      <View style={styles.divider} />

      <View style={styles.SecondContainer}>
        <Text style={styles.text}>
          Apply cashback coupon for instant{' '}
          <TouchableOpacity onPress={() => navigation.navigate('Card')}>
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        </Text>
        <Text style={styles.text2}>savings</Text>
      </View>

      <View style={styles.infoCircle}>
        <Text style={styles.exclamation}>!</Text>
      </View>

      <Text style={styles.text3}>
        Note: For multicolor products, please check the image for color details before purchasing.
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttontext}>Add To Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2}>
          <Text style={styles.buttontext2}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Add_To_Cart;

const styles = StyleSheet.create({
  icon: {
    fontSize: 30,
    marginTop: 10,
    marginLeft: 20,
    color: 'black',
  },
  image: {
    alignSelf: 'center',
    width: 300,
    height: 300,
    borderRadius: 20,
    marginBottom: 10,
  },
  FoodName: {
    alignSelf: 'center',
    fontSize: 28,
    fontWeight: '600',
    marginVertical: 4,
    textAlign: 'center',
  },
  FoodPrice: {
    fontSize: 23,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 5,
  },
  FoodOffer: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 5,
    color: '#7DEA10',
  },
  FoodFree: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 5,
    color: '#413BD9',
  },
  FoodNow: {
    fontSize: 18,
    fontWeight: '300',
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: -10,
    color: '#E316C1',
  },
  divider: {
    width: '100%',
    backgroundColor: '#EFEFEF',
    height: 10,
    marginVertical: 10,
  },
  SecondContainer: {
    backgroundColor: '#b1FFBF',
    marginHorizontal: 15,
    borderRadius: 10,
    padding: 10,
  },
  text: {
    fontWeight: '500',
    fontSize: 14,
  },
  applyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#413BD9',
    marginLeft: 10,
  },
  text2: {
    marginTop: 4,
    marginLeft: 10,
    fontWeight: '500',
  },
  infoCircle: {
    backgroundColor: '#FFCB49',
    height: 20,
    width: 20,
    borderRadius: 100,
    marginLeft: 40,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exclamation: {
    fontSize: 15,
    fontWeight: '800',
  },
  text3: {
    fontSize: 11,
    alignSelf: 'center',
    fontWeight: '500',
    lineHeight: 15,
    width: 300,
    textAlign: 'center',
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginTop: 30,
    marginBottom: 30,
  },
  button: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  buttontext: {
    fontSize: 20,
    color: '#413BD9',
    fontWeight: '700',
  },
  button2: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#413BD9',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  buttontext2: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
  },
});

