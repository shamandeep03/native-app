import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
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

        if (!token) {
          console.warn('Token missing');
          return;
        }

        const response = await axios.get('http://product.sash.co.in/api/Order/all-orders', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(response.data.orders || []);
      } catch (error) {
        console.error('Failed to fetch orders:', error?.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderId}>🧾 Order Number: {item.orderNumber}</Text>
      <Text style={styles.text}>💰 Amount: ₹{item.amount?.toFixed(2) || '0.00'}</Text>
      <Text style={styles.text}>🎁 Discount: ₹{item.discount?.toFixed(2) || '0.00'}</Text>
      <Text style={styles.text}>📦 Status: {item.orderStatus?.name || 'N/A'}</Text>
      <Text style={styles.text}>💳 Payment: {item.paymentMethod?.name || 'N/A'}</Text>
      <Text style={styles.userInfo}>
        👤 Customer: {item.user?.firstName} {item.user?.lastName} | 📞 {item.user?.phoneNumber}
      </Text>

      {Array.isArray(item.orderItems) && item.orderItems.length > 0 ? (
        <FlatList
          data={item.orderItems}
          keyExtractor={(orderItem, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              <Image
                source={{ uri: item.product?.imageUrl || 'https://via.placeholder.com/100' }}
                style={styles.image}
              />
              <Text style={styles.name}>{item.product?.name || 'No Name'}</Text>
              <Text style={styles.price}>₹{item.price} × {item.count}</Text>
              <Text style={styles.gst}>GST: ₹{item.product?.gst || 0}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noItems}>No items in this order</Text>
      )}
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
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderOrderItem}
      contentContainerStyle={styles.container}
      ListHeaderComponent={<Text style={styles.title}>📋 My Orders</Text>}
      ListEmptyComponent={<Text style={styles.noItems}>You have no orders.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
  },
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
  noItems: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
