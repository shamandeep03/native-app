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
import { getCurrentCity } from './LocationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Category = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cityName, setCityName] = useState(null);

  const { width } = useWindowDimensions();
  const imageSize = width / 4.2;

  const getCategory = async () => {
    debugger
    try {
      const response = await fetch('http://product.sash.co.in/api/ProductCategory/category-list');
      const text = await response.text();
      if (text) {
        const data = JSON.parse(text);
        const categoryData = data.data || [];
        setCategory(categoryData);
      }
    } catch (error) {
      console.error('Error fetching category:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    debugger
    getCategory();
  }, []);

  const handleCategoryPress = async (categoryItem) => {
    debugger
    try {
      setSelectedCategory(categoryItem);

      const city = await getCurrentCity();

      if (!city) {
        Alert.alert('Location Error', 'Unable to get your city. Please allow location permission.');
        return;
      }

    
      await AsyncStorage.setItem('cityName', city);
      await AsyncStorage.setItem('categoryId', categoryItem.id.toString());
      await AsyncStorage.setItem('categoryName', categoryItem.name);

      setCityName(city);
    } catch (error) {
      console.error('Location error:', error);
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
          source={{ uri: item?.productFile?.url }}
          style={{ width: 100, height: 100, borderRadius: 100, marginBottom: 6 }}
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

      {selectedCategory && cityName && (
        <Vendor
          categoryId={selectedCategory.id}
          categoryName={selectedCategory.name}
          cityName={cityName}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { flex: 1, backgroundColor: 'white' },
  container: { paddingTop: 16, paddingHorizontal: 12 },
  card: {
    alignItems: 'center',
    marginRight: 10,
    padding: 5,
    marginTop: 10,
  },
  text: { fontSize: 14, textAlign: 'center', fontWeight: '600' },
  selectedCard: { borderBottomWidth: 2, borderColor: 'blue' },
});

export default Category;
