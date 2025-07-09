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
  const [selectedAddressId, setSelectedAddressId] = useState(null);

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

  useEffect(() => {
    getCategory();
    getCities();
    getSavedCity();
  }, []);

  useEffect(() => {
    if (isModalVisible) {
      setSelectedAddressId(null);
      fetchAddresses();
    }
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
      Alert.alert('Error', 'Could not load categories.');
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
      Alert.alert('Error', 'Could not load cities.');
    }
  };

  const fetchAddresses = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) return Alert.alert('Error', 'Token not found.');

      const res = await axios.get('http://product.sash.co.in:81/api/Address', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data;
      setAddresses(Array.isArray(data) ? data : []);
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
      setSelectedAddressId(addr.id);
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={styles.centerButtonWrapper}>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addLocationButton}>
            <Icon name="location-on" size={20} color="white" />
            <Text style={styles.addLocationText}>Add Location</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          {loading ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : (
            <FlatList
              data={category}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id?.toString()}
              renderItem={renderItem}
              contentContainerStyle={{ paddingVertical: 10 }}
            />
          )}
        </View>

        <Modal isVisible={isModalVisible} style={{ margin: 0, justifyContent: 'center' }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <FlatList
              ListHeaderComponent={
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>Manage Address</Text>

                  <Text style={styles.label}>City</Text>
                  <DropDownPicker
                    open={cityDropdownOpen}
                    value={form.cityId}
                    items={cities}
                    setOpen={setCityDropdownOpen}
                    setValue={(val) => {
                      const cityId = val();
                      setForm({ ...form, cityId });

                      const selectedCity = cities.find((city) => city.value === cityId);
                      if (selectedCity?.label) {
                        AsyncStorage.setItem('userCityName', selectedCity.label);
                      }
                    }}
                    setItems={setCities}
                    placeholder="Select City"
                    style={styles.input}
                    dropDownContainerStyle={{ borderColor: '#ccc', maxHeight: 200, zIndex: 10000 }}
                    listMode="SCROLLVIEW"
                  />

                  <Text style={styles.label}>Location</Text>
                  <TextInput
                    value={form.location}
                    onChangeText={(text) => setForm({ ...form, location: text })}
                    placeholder="Enter Location"
                    style={styles.input}
                  />

                  <Text style={styles.label}>Pincode</Text>
                  <TextInput
                    value={form.pincode}
                    onChangeText={(text) => setForm({ ...form, pincode: text })}
                    placeholder="Enter Pincode"
                    keyboardType="numeric"
                    style={styles.input}
                  />

                  <Text style={styles.label}>Floor</Text>
                  <TextInput
                    value={form.floor}
                    onChangeText={(text) => setForm({ ...form, floor: text })}
                    placeholder="Enter Floor"
                    style={styles.input}
                  />

                  <TouchableOpacity onPress={submitAddress} style={styles.saveButton}>
                    <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>Save Address</Text>
                  </TouchableOpacity>

                  <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: 15 }} />

                  <Text style={[styles.label, { fontSize: 16, fontWeight: 'bold' }]}>Select Address</Text>
                </View>
              }
              data={addresses}
              keyExtractor={(item) => item.id?.toString()}
              renderItem={({ item }) => {
                const isSelected = selectedAddressId === item.id;
                return (
                  <TouchableOpacity
                    onPress={() => handleAddressSelect(item)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: isSelected ? '#007bff' : '#ccc',
                      borderRadius: 8,
                      padding: 12,
                      marginHorizontal: 12,
                      marginVertical: 6,
                      backgroundColor: isSelected ? '#e6f0ff' : '#f9f9f9',
                    }}
                  >
                    <Icon
                      name={isSelected ? 'radio-button-checked' : 'radio-button-unchecked'}
                      size={24}
                      color={isSelected ? '#007bff' : 'gray'}
                      style={{ marginRight: 12 }}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontWeight: '600', fontSize: 15 }}>{item.location}</Text>
                      <Text style={{ color: '#333' }}>{item.floor}, Pincode: {item.pincode}</Text>
                      <Text style={{ fontSize: 12, color: 'gray' }}>City ID: {item.cityId} | ID: {item.id}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={<Text style={{ color: 'gray', textAlign: 'center' }}>No addresses found.</Text>}
              ListFooterComponent={
                <View style={styles.modalButtons}>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text style={styles.cancelBtn}>Close</Text>
                  </TouchableOpacity>
                </View>
              }
              contentContainerStyle={{ paddingBottom: 40, backgroundColor: 'white', borderRadius: 10 }}
            />
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  centerButtonWrapper: { alignItems: 'center', marginTop: 16 },
  addLocationButton: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    alignItems: 'center',
    gap: 6,
  },
  addLocationText: { color: 'white', fontWeight: '600', fontSize: 15 },
  container: { paddingTop: 16, paddingHorizontal: 12 },
  card: { alignItems: 'center', marginRight: 10, padding: 5, marginTop: 10 },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 6,
    backgroundColor: '#eee',
  },
  text: { fontSize: 14, textAlign: 'center', fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 45,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
  modalButtons: { marginTop: 10, alignItems: 'center' },
  cancelBtn: { color: 'red', fontWeight: '600' },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  label: { fontWeight: '600', marginBottom: 4, marginTop: 8 },
});

export default Category;
