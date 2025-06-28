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
import { useNavigation } from '@react-navigation/native';

const Vendor = ({ cityName, categoryId, categoryName }) => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  const getVendors = async () => {
    try {
      setLoading(true);
      setError(null);
      setVendors([]);

      console.log('📍 City Name:', cityName);
      console.log('📦 Category ID:', categoryId);

      const token = await AsyncStorage.getItem('userToken');
      console.log('🔐 Token:', token);

      if (!token || !cityName || !categoryId) {
        setError('Token, city name, or category ID is missing');
        return;
      }

      const url = `http://product.sash.co.in/api/Vendor/vendors/by-city-category?cityName=${cityName}&categoryId=${categoryId}`;
      console.log('📡 API URL:', url);

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('📥 Full API Response:', response.data);

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.data;

      if (Array.isArray(data) && data.length > 0) {
        setVendors(data);
      } else {
        setError('No vendors found for this city/category.');
        setVendors([]);
      }
    } catch (err) {
      console.error('❌ Vendor API Error:', err?.response?.data || err.message);
      console.log('❌ Full Error Object:', err);
      setError('Failed to load vendors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cityName && categoryId) {
      getVendors();
    }
  }, [cityName, categoryId]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item?.profileImageUrl || 'https://via.placeholder.com/180' }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
      <Text style={styles.subText}>📍 {item.location}</Text>
      <Text style={styles.subText}>Pincode: {item.pincode}</Text>
      <Text style={styles.subText}>📞 {item.phoneNumber}</Text>
      <Text style={styles.subText}>✉️ {item.email}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>
          Vendors in <Text style={styles.city}>{cityName}</Text>
        </Text>
        <Text style={styles.subHeading}>Category: {categoryName}</Text>
      </View>

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
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
  },
  city: {
    color: '#007bff',
  },
  subHeading: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  loader: {
    marginTop: 40,
  },
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
s