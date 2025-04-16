// Coupon.js
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Category from '../src/Category';

const Coupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const getCoupons = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'No auth token found. Please log in again.');
        return;
      }

      const response = await fetch(
        'http://product.sash.co.in/api/ProductCategory/category-list',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const text = await response.text();
      const json = text ? JSON.parse(text) : null;
      setCoupons(json?.data || []);
    } catch (err) {
      console.error('Error fetching coupons:', err);
      Alert.alert('Error', 'Could not load coupons.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCoupons();
  }, []);

  // Auto‑scroll every 3s
  useEffect(() => {
    if (!coupons.length) return;

    const interval = setInterval(() => {
      const next = (currentIndex + 1) % coupons.length;
      setCurrentIndex(next);
      flatListRef.current?.scrollToIndex({ index: next, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, coupons]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: item.productFile?.url }}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          ref={flatListRef}
          data={coupons}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => i.toString()}
          renderItem={renderItem}
          scrollEnabled={false}
          onScrollToIndexFailed={() => {}}
        />
      )}
      <Category />
    </ScrollView>
  );
};

export default Coupon;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  card: { alignItems: 'center', paddingHorizontal: 12, marginTop: 20 },
  image: { width: 380, height: 200, borderRadius: 10 },
});
