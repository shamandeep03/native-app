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
  ScrollView,
  Alert,
} from 'react-native';
import Vendor from '../src/Vendor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const Category = () => {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  const { width } = useWindowDimensions();
  const imageSize = width / 4.2;

  useEffect(() => {
    getCategory();
    getCities();
  }, []);

  const getCategory = async () => {
    try {
      const response = await fetch('http://product.sash.co.in/api/ProductCategory/category-list');
      const text = await response.text();
      if (text) {
        const data = JSON.parse(text);
        const categoryData = data?.data ?? [];
        setCategory(Array.isArray(categoryData) ? categoryData : []);
      }
    } catch (error) {
      console.error('Error fetching category:', error.message);
      Alert.alert('Error', 'Could not load categories.');
    } finally {
      setLoading(false);
    }
  };

  const getCities = async () => {
    try {
      const res = await axios.get('http://product.sash.co.in/api/City/city-list');
      const cityArray = Array.isArray(res.data?.data) ? res.data.data : [];

      const formatted = cityArray
        .filter((c) => c?.name)
        .map((c) => ({
          label: c.name,
          value: c.name,
        }));

      setCities(formatted);
    } catch (err) {
      console.error('City fetch error:', err.message);
      Alert.alert('Error', 'Could not load cities.');
      setCities([]);
    }
  };

  const handleCategoryPress = async (categoryItem) => {
    if (!selectedCity) {
      Alert.alert('Select City', 'Please select a city before choosing a category.');
      return;
    }

    try {
      setSelectedCategory(categoryItem);
      await AsyncStorage.setItem('cityName', selectedCity);
      await AsyncStorage.setItem('categoryId', categoryItem.id.toString());
      await AsyncStorage.setItem('categoryName', categoryItem.name);
    } catch (error) {
      console.error('Storage error:', error.message);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCategoryPress(item)} activeOpacity={0.7}>
      <View
        style={[
          styles.card,
          { width: imageSize + 10 },
          selectedCategory?.id === item.id && styles.selectedCard,
        ]}
      >
        <Image
          source={{ uri: item?.productFile?.url || 'https://via.placeholder.com/100' }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            marginBottom: 6,
            backgroundColor: '#eee',
          }}
          resizeMode="cover"
        />
        <Text style={[styles.text, { maxWidth: imageSize + 10 }]} numberOfLines={1}>
          {item.name || 'N/A'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.dropdownContainer}>
        <Text style={styles.heading}>Select City</Text>

        {cities.length > 0 ? (
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedCity}
              onValueChange={(itemValue) => setSelectedCity(itemValue)}
              mode="dropdown"
              style={{ height: 50 }}
            >
              <Picker.Item label="-- Select City --" value="" />
              {cities.map((city, index) => (
                <Picker.Item label={city.label} value={city.value} key={index} />
              ))}
            </Picker>
          </View>
        ) : (
          <ActivityIndicator size="small" color="#007bff" />
        )}
      </View>

      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : (
          <FlatList
            data={category}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
        )}
      </View>

      {selectedCategory && selectedCity && (
        <Vendor
          categoryId={selectedCategory.id}
          categoryName={selectedCategory.name}
          cityName={selectedCity}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  dropdownContainer: {
    marginTop: 16,
    paddingHorizontal: 12,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  container: {
    paddingTop: 16,
    paddingHorizontal: 12,
  },
  card: {
    alignItems: 'center',
    marginRight: 10,
    padding: 5,
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
  selectedCard: {
    borderBottomWidth: 2,
    borderColor: 'blue',
  },
});

export default Category;
