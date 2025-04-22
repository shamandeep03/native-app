import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const My_Cart = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const item = route.params?.item;

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      fetchCart();
    }, [])
  );

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://product.sash.co.in/api/Cart');
      const data = response.data;

      if (Array.isArray(data)) {
        const itemsWithQty = data.map(item => ({
          ...item,
          qty: item.count || 1, // use count if available
        }));
        setCartItems(itemsWithQty);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Failed to fetch cart data:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const incrementQty = index => {
    const updatedItems = [...cartItems];
    updatedItems[index].qty += 1;
    setCartItems(updatedItems);
  };

  const decrementQty = index => {
    const updatedItems = [...cartItems];
    if (updatedItems[index].qty > 1) {
      updatedItems[index].qty -= 1;
      setCartItems(updatedItems);
    }
  };

  const removeFromCart = index => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          onPress: async () => {
            const updatedItems = cartItems.filter((_, i) => i !== index);
            setCartItems(updatedItems); // Update the cartItems state

            // Remove from backend API
            try {
              await axios.delete(`http://product.sash.co.in/api/Cart/${cartItems[index].id}`);
              console.log('Item removed from cart on the backend');
            } catch (error) {
              console.error('Failed to remove item from backend:', error);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = parseInt(item.id || '0');
      return sum + price * item.qty;
    }, 0);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Delivery Address */}
          <View style={styles.topBar}>
            <Text style={styles.delivery}>Deliver to: Preet Nager, 148028</Text>
            <Text style={styles.address}>
              House no-78, Near boys school sunam, Sunam
            </Text>
            <TouchableOpacity onPress={() => Alert.alert('Change address')}>
              <Text style={styles.change}>Change</Text>
            </TouchableOpacity>
          </View>

          {/* Coupon */}
          <View style={styles.couponSection}>
            <Text style={styles.couponText}>
              Flat ₹52 Off - Apply cashback coupon for instant savings
            </Text>
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>

          {/* Cart Items */}
          {loading ? (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading cart...</Text>
          ) : cartItems.length === 0 ? (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>
              Your cart is empty.
            </Text>
          ) : (
            cartItems.map((item, index) => (
              <View style={styles.product} key={index}>
                <Image
                  source={{
                    uri: item?.Image || 'https://res.cloudinary.com/duxekwjna/image/upload/v1744278555/r20zfkdqdcshzdjwabtm.jpg',
                  }}
                  style={styles.image}
                />
                <View style={styles.details}>
                  <Text style={styles.productTitle}>{item.Name || 'Food Product'}</Text>
                  

                  <View style={styles.id}>
                    <Text style={styles.discount}>{item.Offer || ''}</Text>
                    <Text style={styles.oldPrice}>₹{parseInt(item.id || 0)}</Text>
                    <Text style={styles.newPrice}>₹{item.id || '0'}</Text>
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
            ))
          )}
        </ScrollView>

        {/* Bottom Bar */}
        {cartItems.length > 0 && (
          <View style={styles.bottomBar}>
            <Text style={styles.totalText}>Total: ₹{calculateTotal()}</Text>
            <TouchableOpacity style={styles.continueBtn}>
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default My_Cart;

const styles = StyleSheet.create({
  container: { backgroundColor: '#f5f5f5' },
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
    color: '#777',
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
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
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
  countText: {
    marginTop: 6,
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
});
