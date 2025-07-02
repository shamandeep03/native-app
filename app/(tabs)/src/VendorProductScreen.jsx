import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VendorProductScreen = ({ route }) => {
  const { vendorId, categoryId, vendorName } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVendorProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await AsyncStorage.getItem('userToken');

      if (!token || !vendorId || !categoryId) {
        setError('Missing required token or parameters.');
        return;
      }

      const url = `http://product.sash.co.in:81/api/VendorProduct/products/by-vendor-category?vendorId=${vendorId}&categoryId=${categoryId}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data;

      if (Array.isArray(data) && data.length > 0) {
        setProducts(data);
      } else {
        setError('No products found for this vendor/category.');
      }
    } catch (err) {
      setError('Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendorProducts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item?.product?.imageUrl || 'https://via.placeholder.com/150' }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.name}>{item?.product?.name}</Text>
      <Text style={styles.subText}>Price: ₹{item?.price}</Text>
      <Text style={styles.subText}>GST: {item?.gstPercentage}%</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Products by {vendorName}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  loader: {
    marginTop: 40,
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default VendorProductScreen;
