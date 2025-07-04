import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width } = Dimensions.get('window');

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const userId = await AsyncStorage.getItem('userId');

        const response = await axios.get('http://product.sash.co.in:81/api/Order/all-orders', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userOrders = response.data.orders.filter(order => order.userId == userId);
        setOrders(userOrders);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderId}>🧾 Order Number: {item.orderNumber}</Text>
      <Text style={styles.text}>💰 Amount: ₹{item.amount.toFixed(2)}</Text>
      <Text style={styles.text}>🎁 Discount: ₹{item.discount.toFixed(2)}</Text>
      <Text style={styles.text}>📦 Status: {item.orderStatus?.name || 'N/A'}</Text>
      <Text style={styles.text}>💳 Payment: {item.paymentMethod?.name || 'N/A'}</Text>
      <Text style={styles.userInfo}>
        👤 Customer: {item.user?.firstName} {item.user?.lastName} | 📞 {item.user?.phoneNumber}
      </Text>

      <FlatList
        data={item.orderItems || []}
        keyExtractor={(orderItem, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Image source={{ uri: item.product?.imageUrl }} style={styles.image} />
            <Text style={styles.name}>{item.product?.name}</Text>
            <Text style={styles.price}>₹{item.price} x {item.count}</Text>
            <Text style={styles.gst}>GST: ₹{item.product?.gst}</Text>
          </View>
        )}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>📋 My Orders</Text>
        <FlatList
          data={orders}
          keyExtractor={item => item.id.toString()}
          renderItem={renderOrderItem}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 100 },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    color: '#333',
    textAlign: 'center',
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    padding: 14,
    elevation: 3,
    borderColor: '#eee',
    borderWidth: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#111',
  },
  text: {
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
  },
  userInfo: {
    fontSize: 13,
    marginTop: 8,
    color: '#555',
    fontStyle: 'italic',
  },
  itemCard: {
    width: width * 0.42,
    marginRight: 12,
    marginTop: 12,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },
  price: {
    fontSize: 13,
    color: '#333',
  },
  gst: {
    fontSize: 12,
    color: '#888',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
