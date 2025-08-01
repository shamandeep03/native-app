import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, Image, ActivityIndicator,
  StyleSheet, TouchableOpacity, Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

const Vendor = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();

  const { categoryId, categoryName, cityName } = route.params || {};

  useEffect(() => {
    if (categoryId && cityName) {
      fetchVendors();
    }
  }, [categoryId, cityName]);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      setError(null);
      setVendors([]);

      const token = await AsyncStorage.getItem('userToken');
      if (!token || !cityName || !categoryId) {
        setError('Token, city name, or category ID is missing');
        return;
      }

      const url = `http://product.sash.co.in:81/api/Vendor/vendors/by-city-category?cityName=${cityName}&categoryId=${categoryId}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = Array.isArray(response.data) ? response.data : response.data?.data;
      if (Array.isArray(data) && data.length > 0) {
        setVendors(data);
      } else {
        setError('No vendors found for this city/category.');
      }
    } catch (err) {
      console.error('Vendor fetch error:', err);
      setError('Failed to load vendors');
    } finally {
      setLoading(false);
    }
  };

  const handleVendorPress = async (item) => {
    try {
      await AsyncStorage.setItem('selectedCategoryId', categoryId.toString()); // ✅ Save categoryId

      navigation.navigate('VendorProductScreen', {
        vendorId: item.id,
        categoryId,
        vendorName: `${item.firstName} ${item.lastName}`,
      });
    } catch (e) {
      console.error('Error saving categoryId:', e);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleVendorPress(item)}>
      <Image
        source={{ uri: item?.profileImageUrl || 'https://via.placeholder.com/180' }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
      <Text style={styles.subText}>{item.location}</Text>
      <Text style={styles.subText}>Pincode: {item.pincode}</Text>
      <Text style={styles.subText}>{item.phoneNumber}</Text>
      <Text style={styles.subText}>{item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.subHeading}>City: {cityName} | Category: {categoryName}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          <Text style={styles.countText}>Total Vendors: {vendors.length}</Text>
          <FlatList
            data={vendors}
            keyExtractor={(item) => item.id?.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, backgroundColor: '#fff' },
  subHeading: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
    textAlign: 'center',
  },
  loader: { marginTop: 40 },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
    color: '#333',
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  countText: {
    textAlign: 'center',
    color: '#007bff',
    marginBottom: 8,
    fontWeight: '600',
  },
});

export default Vendor;
