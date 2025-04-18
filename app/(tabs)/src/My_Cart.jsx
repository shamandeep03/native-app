// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   SafeAreaView,
// } from 'react-native';
// import axios from 'axios';
// import { useFocusEffect } from '@react-navigation/native';

// const My_Cart = () => {
//   const [cartItems, setCartItems] = useState([]);

//   // Refresh cart whenever the screen is focused
//   useFocusEffect(
//     React.useCallback(() => {
//       fetchCart();
//     }, [])
//   );

//   const fetchCart = async () => {
//     try {
//       const response = await axios.get('http://product.sash.co.in/api/Cart');
//       const data = response.data;
//       const itemsWithQty = data.map(item => ({ ...item, qty: 1 }));
//       setCartItems(itemsWithQty);
//     } catch (error) {
//       console.error('Failed to fetch cart data:', error);
//     }
//   };

//   const incrementQty = (index) => {
//     const updatedItems = [...cartItems];
//     updatedItems[index].qty += 1;
//     setCartItems(updatedItems);
//   };

//   const decrementQty = (index) => {
//     const updatedItems = [...cartItems];
//     if (updatedItems[index].qty > 1) {
//       updatedItems[index].qty -= 1;
//       setCartItems(updatedItems);
//     }
//   };

//   const removeFromCart = (index) => {
//     const updatedItems = cartItems.filter((_, i) => i !== index);
//     setCartItems(updatedItems);
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <ScrollView style={styles.container}>
//         <View style={styles.topBar}>
//           <Text style={styles.delivery}>Deliver to: Amanjot Singh, 148028</Text>
//           <Text style={styles.address}>House no-78, Near boys school sunam, Sunam</Text>
//           <TouchableOpacity>
//             <Text style={styles.change}>Change</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.couponSection}>
//           <Text style={styles.couponText}>Flat ₹52 Off - Apply cashback coupon for instant savings</Text>
//           <TouchableOpacity style={styles.applyButton}>
//             <Text style={styles.applyText}>Apply</Text>
//           </TouchableOpacity>
//         </View>

//         {cartItems.map((item, index) => (
//           <View style={styles.product} key={index}>
//             <Image source={{ uri: item.title }} style={styles.image} />
//             <View style={styles.details}>
//               <Text style={styles.productTitle}>{item.Name}</Text>
//               <Text style={styles.desc}>{item.TreadingNow}</Text>
//               <View style={styles.pricing}>
//                 <Text style={styles.discount}>{item.Offer}</Text>
//                 <Text style={styles.oldPrice}>₹{parseInt(item.Price) * 2}</Text>
//                 <Text style={styles.newPrice}>₹{item.Price}</Text>
//               </View>
//               <View style={styles.qty}>
//                 <Text>Qty:</Text>
//                 <View style={styles.qtyButtons}>
//                   <TouchableOpacity onPress={() => decrementQty(index)}>
//                     <Text style={styles.qtyButton}>-</Text>
//                   </TouchableOpacity>
//                   <Text style={styles.qtyCount}>{item.qty}</Text>
//                   <TouchableOpacity onPress={() => incrementQty(index)}>
//                     <Text style={styles.qtyButton}>+</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//               <View style={styles.actions}>
//                 <TouchableOpacity>
//                   <Text style={styles.actionText}>Move to Saved Items</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => removeFromCart(index)}>
//                   <Text style={styles.actionText}>Remove</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         ))}

//         <View style={styles.totalBar}>
//           <Text style={styles.totalText}>
//             Total: ₹
//             {cartItems.reduce((sum, item) => sum + parseInt(item.Price) * item.qty, 0)}
//           </Text>
//           <TouchableOpacity style={styles.continueBtn}>
//             <Text style={styles.continueText}>Continue</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default My_Cart;


// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#f5f5f5',
//   },
//   product: {
//     backgroundColor: 'white',
//     flexDirection: 'row',
//     padding: 12,
//     marginBottom: 10,
//   },
//   image: {
//     width: 80,
//     height: 80,
//     borderRadius: 6,
//   },
//   details: {
//     flex: 1,
//     marginLeft: 12,
//   },
//   productTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   pricing: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 8,
//     gap: 6,
//   },
//   discount: {
//     color: 'green',
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
//   newPrice: {
//     fontWeight: 'bold',
//     marginLeft: 6,
//   },
//   oldPrice: {
//     textDecorationLine: 'line-through',
//     color: '#999',
//     fontSize: 14,
//   },
//   qty: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   qtyButtons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//   },
//   qtyButton: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#3f51b5',
//   },
//   qtyCount: {
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   actions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   actionText: {
//     color: '#3f51b5',
//     fontWeight: 'bold',
//     fontSize: 13,
//   },
//   totalBar: {
//     backgroundColor: 'white',
//     padding: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     borderTopWidth: 1,
//     borderColor: '#ddd',
//   },
//   totalText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   continueBtn: {
//     backgroundColor: '#6A5ACD',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 8,
//   },
//   continueText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   topBar: {
//     backgroundColor: 'white',
//     padding: 16,
//     marginBottom: 10,
//   },
//   delivery: {
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   address: {
//     marginTop: 4,
//     color: '#666',
//   },
//   change: {
//     marginTop: 6,
//     color: '#3f51b5',
//     fontWeight: 'bold',
//   },
//   couponSection: {
//     backgroundColor: 'white',
//     padding: 16,
//     marginBottom: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   couponText: {
//     flex: 1,
//     fontSize: 14,
//     color: '#333',
//   },
//   applyButton: {
//     backgroundColor: '#ff9800',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 6,
//     marginLeft: 10,
//   },
//   applyText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      // Static dummy cart data
      const dummyCartData = [
        {
          id: 1,
          Name: 'Cheesy Burger',
          Price: '99',
          Offer: '20% OFF',
          TreadingNow: 'Hot & Spicy!',
          title: 'https://i.imgur.com/5Aqgz7o.png',
          qty: 1,
        },
        {
          id: 2,
          Name: 'Veggie Wrap',
          Price: '79',
          Offer: '15% OFF',
          TreadingNow: 'Fresh & Healthy',
          title: 'https://i.imgur.com/tDnjTXf.jpg',
          qty: 1,
        },
      ];

      setCartItems(dummyCartData);
    } catch (error) {
      console.error('Failed to load static cart data:', error);
    }
  };

  const incrementQty = (index) => {
    const updatedItems = [...cartItems];
    updatedItems[index].qty += 1;
    setCartItems(updatedItems);
  };

  const decrementQty = (index) => {
    const updatedItems = [...cartItems];
    if (updatedItems[index].qty > 1) {
      updatedItems[index].qty -= 1;
      setCartItems(updatedItems);
    }
  };

  const removeFromCart = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.delivery}>Deliver to: Amanjot Singh, 148028</Text>
          <Text style={styles.address}>House no-78, Near boys school sunam, Sunam</Text>
          <TouchableOpacity>
            <Text style={styles.change}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.couponSection}>
          <Text style={styles.couponText}>Flat ₹52 Off - Apply cashback coupon for instant savings</Text>
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        </View>

        {cartItems.map((item, index) => (
          <View style={styles.product} key={index}>
            <Image source={{ uri: item.title }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.productTitle}>{item.Name}</Text>
              <Text style={styles.desc}>{item.TreadingNow}</Text>
              <View style={styles.pricing}>
                <Text style={styles.discount}>{item.Offer}</Text>
                <Text style={styles.oldPrice}>₹{parseInt(item.Price) * 2}</Text>
                <Text style={styles.newPrice}>₹{item.Price}</Text>
              </View>
              <View style={styles.qty}>
                <Text>Qty:</Text>
                <View style={styles.qtyButtons}>
                  <TouchableOpacity onPress={() => decrementQty(index)}>
                    <Text style={styles.qtyButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyCount}>{item.qty}</Text>
                  <TouchableOpacity onPress={() => incrementQty(index)}>
                    <Text style={styles.qtyButton}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity>
                  <Text style={styles.actionText}>Move to Saved Items</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeFromCart(index)}>
                  <Text style={styles.actionText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.totalBar}>
          <Text style={styles.totalText}>
            Total: ₹
            {cartItems.reduce((sum, item) => sum + parseInt(item.Price) * item.qty, 0)}
          </Text>
          <TouchableOpacity style={styles.continueBtn}>
            <Text style={styles.continueText}>Continue</Text>
            
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
  product: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 12,
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  desc: {
    color: '#666',
    fontSize: 13,
    marginTop: 2,
  },
  pricing: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  discount: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 14,
  },
  newPrice: {
    fontWeight: 'bold',
    marginLeft: 6,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#999',
    fontSize: 14,
  },
  qty: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  qtyButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft: 8,
  },
  qtyButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3f51b5',
    paddingHorizontal: 10,
  },
  qtyCount: {
    fontSize: 16,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionText: {
    color: '#3f51b5',
    fontWeight: 'bold',
    fontSize: 13,
  },
  totalBar: {
    backgroundColor: 'white',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#ddd',
 
   
    
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  continueBtn: {
    backgroundColor: '#6A5ACD',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  continueText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  topBar: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 10,
  },
  delivery: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  address: {
    marginTop: 4,
    color: '#666',
  },
  change: {
    marginTop: 6,
    color: '#3f51b5',
    fontWeight: 'bold',
  },
  couponSection: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  couponText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  applyButton: {
    backgroundColor: '#ff9800',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 10,
  },
  applyText: {
    color: 'white',
    fontWeight: 'bold',
  },
});


