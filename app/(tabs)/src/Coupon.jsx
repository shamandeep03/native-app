import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

const Coupon = () => {
  const [coupon, setCoupon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const { width } = useWindowDimensions();

  const getCoupon = async () => {
    try {
      const response = await fetch('http://product.sash.co.in/api/ProductCategory/category-list');
      const text = await response.text();
      if (text) {
        const data = JSON.parse(text);
        setCoupon(data.data || []);
      } else {
        console.warn('Empty response from API');
      }
    } catch (error) {
      console.error('Error fetching coupon:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCoupon();
  }, []);

  // Auto-scroll every 3 seconds
  useEffect(() => {
    if (!coupon.length) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % coupon.length;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, coupon]);

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.card}>
        <Image
          source={{ uri: item?.productFile?.url }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          ref={flatListRef}
          data={coupon}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          onScrollToIndexFailed={() => {}}
        />
      )}
    </View>
  );
};

export default Coupon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    backgroundColor: 'white',
  },
  card: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  image: {
    width: 380,
    height: 200,
    borderRadius: 10,
    
  },
});
