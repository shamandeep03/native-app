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
  Dimensions,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const VendorProductScreen = ({ route, navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  const { vendorId, categoryId, vendorName = 'Vendor' } = route.params || {};

  useEffect(() => {
    console.log('📦 Params:', { vendorId, categoryId });
    loadVendorProducts();
  }, []);

  const loadVendorProducts = async () => {
    try {
      const storedCategoryId = await AsyncStorage.getItem('selectedCategoryId');
      const selectedCategoryId = categoryId || Number(storedCategoryId);

      if (!vendorId || !selectedCategoryId) {
        console.warn('⚠️ Missing vendorId or categoryId');
        Alert.alert('⚠️ Missing Info', 'Vendor ID ya Category ID missing aa.');
        setLoading(false);
        return;
      }

      const token = await AsyncStorage.getItem('userToken');
      const cityName = await AsyncStorage.getItem('cityName') || 'Ludhiana';

      console.log('🔑 Token:', token);
      console.log('🏙️ City Name:', cityName);

      if (!token) {
        Alert.alert('🔒 Unauthorized', 'Login token missing aa.');
        setLoading(false);
        return;
      }

      const url = `http://product.sash.co.in/api/VendorProduct/products/by-vendor-category?vendorId=${vendorId}&categoryId=${selectedCategoryId}`;
      console.log('🌐 API URL:', url);

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          CityName: cityName,
        },
      });

      console.log('📋 API Full Response:', res.data);

      const apiData = Array.isArray(res.data) ? res.data : res.data?.data || [];
      console.log('📦 Parsed Products:', apiData);

      setProducts(apiData);
    } catch (error) {
      console.error('❌ Vendor Product Fetch Error:', error.message);
      Alert.alert('Error', 'Products load karan ch error aa gyi.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (item) => {
    try {
      setPosting(true);

      const token = await AsyncStorage.getItem('userToken');
      const userId = await AsyncStorage.getItem('userId');
      const addressId = await AsyncStorage.getItem('userAddressId');
      const cityName = await AsyncStorage.getItem('cityName') || 'Ludhiana';

      console.log('🔐 Token:', token);
      console.log('👤 userId:', userId);
      console.log('🏠 addressId:', addressId);
      console.log('📦 item:', item);

      if (!token || !userId || !addressId) {
        Alert.alert('⚠️ Missing Info', 'Login ya address details nahi mile.');
        setPosting(false);
        return;
      }

      if (!item?.id) {
        Alert.alert('🛑 Missing Product ID', 'item.id null aa. Product invalid ho sakda.');
        console.warn('🛑 item.id missing:', item);
        setPosting(false);
        return;
      }

      const now = new Date().toISOString();
      const payload = {
        id: 0,
        vendorProductId: Number(item.id),
        createdBy: Number(userId),
        addressId: Number(addressId),
        count: 1,
        createdDateTime: now,
        modifiedBy: Number(userId),
        modifiedDateTime: now,
      };

      console.log('📤 Payload to POST:', payload);

      const res = await axios.post('http://product.sash.co.in:81/api/Cart', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          CityName: cityName,
        },
      });

      console.log('✅ POST Response:', res.status, res.data);

      if (res.status === 200 || res.status === 201) {
        Alert.alert('✅ Success', 'Product cart ch add ho gya.', [
          { text: 'My Cart', onPress: () => navigation.navigate('My_Cart') },
          { text: 'OK' },
        ]);
      } else {
        Alert.alert('❌ Error', 'Product cart ch add nahi ho paya.');
      }
    } catch (err) {
      console.error('❌ Add to Cart Error:', err.message);
      Alert.alert('Error', 'Cart ch add karde hoye kujh error aa gyi.');
    } finally {
      setPosting(false);
    }
  };

  const renderItem = ({ item }) => {
    const imageUrl = item?.imageUrl?.startsWith('http')
      ? item.imageUrl
      : `http://product.sash.co.in:81${item.imageUrl || ''}`;

    return (
      <View style={styles.card}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.name} numberOfLines={1}>{item?.name || 'Unnamed'}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.originalPrice}>₹{item?.originalPrice}</Text>
          {item.promoDiscountPercent > 0 && (
            <>
              <Text style={styles.discountPercent}>-{item.promoDiscountPercent}%</Text>
              <Text style={styles.discountedPrice}>₹{item.discountedPrice?.toFixed(2)}</Text>
            </>
          )}
        </View>

        <Text style={styles.gst}>GST: {item?.gst ?? '--'}%</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAddToCart(item)}
          disabled={posting}
        >
          <Text style={styles.buttonText}>{posting ? 'Adding...' : 'Add to Cart'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Products by {vendorName}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      ) : products.length > 0 ? (
        <FlatList
          data={products}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={styles.noData}>📭 No Products Found{'\n'}Vendor ID: {vendorId}{'\n'}Category ID: {categoryId}</Text>
      )}
    </View>
  );
};

export default VendorProductScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', paddingHorizontal: 10, paddingTop: 16 },
  heading: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 10, color: '#212529' },
  loader: { marginTop: 40 },
  noData: { fontSize: 16, textAlign: 'center', color: '#dc3545', marginTop: 40 },
  row: { justifyContent: 'space-between', marginBottom: 16 },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    width: width / 2 - 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#dee2e6',
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#343a40',
    marginBottom: 4,
    textAlign: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  originalPrice: {
    fontSize: 13,
    color: '#6c757d',
    textDecorationLine: 'line-through',
  },
  discountedPrice: {
    fontSize: 14,
    color: '#dc3545',
    fontWeight: 'bold',
  },
  discountPercent: {
    fontSize: 13,
    color: 'green',
    fontWeight: '600',
  },
  gst: {
    fontSize: 12,
    color: '#495057',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 30,
  },
});
