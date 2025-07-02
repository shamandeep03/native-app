import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VendorProductScreen = ({ route, navigation }) => {
  const { vendorId, categoryId, vendorName } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVendorProducts();
  }, []);

  const fetchVendorProducts = async () => {
    try {
      setLoading(true);
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
        setError(null);
      } else {
        setError('No products found for this vendor/category.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (item) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('userToken');

      if (!userId || !token) {
        Alert.alert('Error', 'User not logged in or token missing.');
        return;
      }

      const now = new Date().toISOString();

      // ✅ Final Payload (addressId removed or set to 0 if required)
      const cartPayload = {
        id: 0,
        vendorProductId: item.id,
        createdBy: Number(userId),
        addressId: 0, // Optional: if backend requires, use default ID
        count: 1,
        createdDateTime: now,
        modifiedBy: Number(userId),
        modifiedDateTime: now,
      };

      const res = await axios.post(
        'http://product.sash.co.in:81/api/Cart',
        cartPayload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        Alert.alert('Success', `${item.name} added to cart`, [
          {
            text: 'Go to Cart',
            onPress: () => navigation.navigate('My_Cart'),
          },
          { text: 'OK' },
        ]);
      } else {
        Alert.alert('Error', 'Failed to add item to cart');
      }
    } catch (error) {
      console.error('Add to Cart Error:', error);
      Alert.alert('Error', 'Something went wrong while adding to cart');
    }
  };

  const renderItem = ({ item }) => {
    const imageUrl =
      item?.imageUrl?.startsWith('http')
        ? item.imageUrl
        : `http://product.sash.co.in:81${item?.imageUrl || ''}`;

    return (
      <View style={styles.card}>
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        <Text style={styles.name}>{item?.name || 'Unnamed Product'}</Text>
        <Text style={styles.subText}>Price: ₹{item?.price ?? '--'}</Text>
        <Text style={styles.subText}>GST: {item?.gst ?? '--'}%</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAddToCart(item)}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    );
  };

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
  button: {
    marginTop: 10,
    backgroundColor: '#413BD9',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default VendorProductScreen;
