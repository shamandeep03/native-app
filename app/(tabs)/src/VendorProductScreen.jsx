/**
 * Category Screen (English Version)
 */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';

const Category = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCityName, setSelectedCityName] = useState('');
  const [form, setForm] = useState({
    location: '',
    pincode: '',
    floor: '',
    cityId: null,
    isActive: true,
  });
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const imageSize = width / 4.2;
  const [expandedAddressId, setExpandedAddressId] = useState(null);

  useEffect(() => {
    getCategory();
    getCities();
    getSavedCity();
  }, []);

  useEffect(() => {
    if (isModalVisible) fetchAddresses();
  }, [isModalVisible]);

  const getSavedCity = async () => {
    const city = await AsyncStorage.getItem('userCityName');
    if (city) setSelectedCityName(city);
  };

  const getCategory = async () => {
    try {
      const response = await fetch('http://product.sash.co.in:81/api/ProductCategory/category-list');
      const text = await response.text();
      const data = JSON.parse(text);
      setCategory(Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      console.error('Category Error:', error.message);
      Alert.alert('Error', 'Failed to load categories.');
    } finally {
      setLoading(false);
    }
  };

  const getCities = async () => {
    try {
      const res = await axios.get('http://product.sash.co.in:81/api/City/city-list');
      const formatted = res.data?.data?.map((c) => ({ label: c.name, value: c.id })) || [];
      setCities(formatted);
    } catch (err) {
      Alert.alert('Error', 'Failed to load cities.');
    }
  };

  const fetchAddresses = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) return Alert.alert('Error', 'Token not found.');

      const res = await axios.get('http://product.sash.co.in:81/api/Address', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAddresses(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      console.error('Address fetch error', e.message);
      Alert.alert('Error', 'Failed to fetch addresses.');
    }
  };

  const submitAddress = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('userToken');
      if (!userId || !token) return Alert.alert('Error', 'User not logged in.');

      const payload = {
        location: form.location.trim(),
        pincode: form.pincode.trim(),
        floor: form.floor.trim(),
        isActive: true,
        userId: Number(userId),
        isDeleted: false,
        isPrimary: true,
        cityId: Number(form.cityId),
      };

      const res = await axios.post('http://product.sash.co.in:81/api/Address', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const savedId = res.data?.id ?? res.data?.data?.id;
      if (savedId) {
        await AsyncStorage.setItem('userAddressId', String(savedId));
        setForm({ location: '', pincode: '', floor: '', cityId: null, isActive: true });
        fetchAddresses();
        Alert.alert('Success', 'Address saved successfully.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save address.');
    }
  };

  const handleAddressSelect = async (addr) => {
    try {
      await AsyncStorage.setItem('userAddressId', String(addr.id));
      Alert.alert('Selected', `Address ID ${addr.id} saved.`);
      setModalVisible(false);
    } catch (err) {
      console.error('AsyncStorage error:', err);
    }
  };

  const handleCategoryPress = async (categoryItem) => {
    try {
      let cityName = selectedCityName;
      if (!cityName) {
        cityName = await AsyncStorage.getItem('userCityName');
      }
      navigation.navigate('Vendor', {
        categoryId: categoryItem.id,
        categoryName: categoryItem.name,
        cityName: cityName || 'Unknown',
      });
    } catch (err) {
      console.log('Navigation Error:', err);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCategoryPress(item)} activeOpacity={0.7}>
      <View style={[styles.card, { width: imageSize + 10 }]}>
        <Image
          source={{ uri: item?.productFile?.imageUrl || 'https://via.placeholder.com/100' }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={[styles.text, { maxWidth: imageSize + 10 }]} numberOfLines={1}>
          {item.name || 'N/A'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderAddress = ({ item }) => (
    <View style={styles.addressCard}>
      <View style={styles.addressHeader}>
        <View>
          <Text style={styles.addressTitle}>{item.location}</Text>
          <Text style={styles.addressSubtitle}>Pincode: {item.pincode}</Text>
        </View>
        <TouchableOpacity onPress={() => setExpandedAddressId(expandedAddressId === item.id ? null : item.id)}>
          <Icon name={expandedAddressId === item.id ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={26} color="#007bff" />
        </TouchableOpacity>
      </View>
      {expandedAddressId === item.id && (
        <View style={styles.addressDetails}>
          <Text>🏢 Floor: {item.floor || 'N/A'}</Text>
          <Text>🏙️ City ID: {item.cityId}</Text>
          <Text>🆔 Address ID: {item.id}</Text>
          <Text>📌 Primary: {item.isPrimary ? 'Yes' : 'No'}</Text>
        </View>
      )}
      <TouchableOpacity onPress={() => handleAddressSelect(item)} style={styles.selectBtn}>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>Use this Address</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <FlatList
          data={category}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderItem}
        />

        <Modal isVisible={isModalVisible}>
          <FlatList
            data={addresses}
            keyExtractor={(item) => item.id?.toString()}
            renderItem={renderAddress}
          />
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  card: { alignItems: 'center', marginRight: 10, padding: 5, marginTop: 10 },
  image: { width: 100, height: 100, borderRadius: 100, marginBottom: 6, backgroundColor: '#eee' },
  text: { fontSize: 14, textAlign: 'center', fontWeight: '600' },
  addressCard: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, margin: 10, backgroundColor: '#f9f9f9' },
  addressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  addressTitle: { fontSize: 16, fontWeight: '600' },
  addressSubtitle: { fontSize: 13, color: 'gray' },
  addressDetails: { marginTop: 10, backgroundColor: '#eef1f5', padding: 10, borderRadius: 6 },
  selectBtn: { marginTop: 10, backgroundColor: '#007bff', paddingVertical: 10, borderRadius: 6 },
});

export default Category;
