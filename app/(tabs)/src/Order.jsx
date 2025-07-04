import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { Menu, Button, Provider as PaperProvider } from 'react-native-paper';

export default function Order() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState('0');
  const [loading, setLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cartItems');
        const storedTotal = await AsyncStorage.getItem('totalAmount');
        const token = await AsyncStorage.getItem('token');

        if (!token) {
          Alert.alert('Login Required', 'Please log in again.');
          return;
        }

        if (storedCart) setCartItems(JSON.parse(storedCart));
        if (storedTotal) setTotal(storedTotal);

        const res = await axios.get('http://product.sash.co.in:81/api/Order/payment-methods', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPaymentMethods(res.data || []);
      } catch (error) {
        console.error('Failed to load:', error);
        Alert.alert('Error', 'Failed to load order data.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handlePlaceOrder = async () => {
    if (!selectedPayment) {
      Alert.alert('Payment Required', 'Please select a payment method.');
      return;
    }

    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      const fcmToken = await AsyncStorage.getItem('fcmToken');

      if (!token || !userId) {
        Alert.alert('Login Error', 'User ID or Token missing.');
        return;
      }

      const orderPayload = {
        orderNumber: `ORD-${Math.random().toString(36).substr(2, 8)}`,
        paymentMethodId: selectedPayment.id,
        amount: parseFloat(total),
        discount: 0,
        userId: parseInt(userId),
        orderStatusId: 1,
        isDeleted: false,
        fcmToken: fcmToken || '',
        orderItems: cartItems.map((item) => ({
          vendorProductId: item.vendorProductId || item.product?.id,
          count: item.qty,
          price: item.product?.price || 0,
        })),
      };

      const res = await axios.post('http://product.sash.co.in:81/api/Order', orderPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      await AsyncStorage.removeItem('cartItems');
      await AsyncStorage.removeItem('totalAmount');

      Alert.alert('✅ Order Placed', 'Your order has been successfully placed.', [
        { text: 'OK', onPress: () => router.replace('/src/Coupon') },
      ]);
    } catch (error) {
      console.error('Order Error:', error);
      Alert.alert('Error', 'Failed to place the order.');
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6A5ACD" />
      </View>
    );
  }

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🧾 Confirm Your Order</Text>

        <Text style={styles.sectionTitle}>🛒 Cart Items</Text>
        {cartItems.length === 0 ? (
          <Text style={styles.itemText}>No items in cart.</Text>
        ) : (
          cartItems.map((item, index) => (
            <Text key={index} style={styles.itemText}>
              {item.product?.name || 'Unnamed Item'} × {item.qty}
            </Text>
          ))
        )}

        <Text style={styles.total}>💰 Total: ₹{total}</Text>

        <Text style={styles.sectionTitle}>💳 Payment Method</Text>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setMenuVisible(true)}
              style={{ marginTop: 10 }}
            >
              {selectedPayment ? selectedPayment.name : 'Select Payment Method'}
            </Button>
          }
        >
          {paymentMethods.map((method) => (
            <Menu.Item
              key={method.id}
              onPress={() => {
                setSelectedPayment(method);
                setMenuVisible(false);
              }}
              title={method.name}
            />
          ))}
        </Menu>

        {cartItems.length > 0 && (
          <TouchableOpacity style={styles.button} onPress={handlePlaceOrder}>
            <Text style={styles.buttonText}>✅ Place Order</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
    color: '#444',
  },
  itemText: {
    fontSize: 16,
    marginTop: 5,
    color: '#555',
  },
  total: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    backgroundColor: '#6A5ACD',
    marginTop: 30,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
